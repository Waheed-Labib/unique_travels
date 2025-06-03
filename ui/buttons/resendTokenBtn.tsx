'use client'

import * as motion from "motion/react-client"
import { useState } from "react";
import ErrorAlert from "../modals/error-alert/ErrorAlert";

export default function ResendTokenBtn({ email }: { email: string }) {

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResendToken = async (email: string) => {

        setLoading(true)

        const res = await fetch("/api/resend-verification-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message || "Sending Verification Token Failed");
            setLoading(false)
            return
        }

        setMessage("Please check your Email.");
        setLoading(false)
    }

    return (
        <div>
            {
                loading ?
                    <button className={`btn btn-primary glass bg-primary`}>
                        Please Wait ...
                    </button>
                    :
                    <>
                        {
                            message ?
                                <p className="text-green-700 font-bold">{message}</p>
                                :
                                <motion.button
                                    onClick={() => handleResendToken(email)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`btn btn-primary glass bg-primary`}>
                                    Send me verification email
                                </motion.button>
                        }
                    </>
            }
            {
                error &&
                <ErrorAlert
                    error={error}
                    setError={setError}
                ></ErrorAlert>
            }
        </div>
    )
}