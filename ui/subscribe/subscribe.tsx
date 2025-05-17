'use client'

import { FaRegCheckSquare } from "react-icons/fa";
import Header from "../header";
import Section from "../Section";
import PrimaryBtn from "../buttons/primaryBtn";
import * as motion from "motion/react-client"
import { useState } from "react";
import ErrorAlert from "../error-alert/ErrorAlert";
import SuccessAlert from "../success-alert/SuccessAlert";

export default function Subscribe() {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    console.log('success', success);
    console.log('error', error);

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setLoading(true);
        setError('');
        setSuccess('');

        const form = e.target as HTMLFormElement;
        const emailInput = form.email as HTMLInputElement;
        const email = emailInput.value;

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !regex.test(email)) {
            setError("Please enter a valid email address.");
            setLoading(false);
            emailInput.value = "";
            return;
        }

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Subscription failed");
                return
            }

            setSuccess("Subscribed successfully!");
            emailInput.value = "";

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(`❌ ${error.message}`);

            } else {
                setError("❌ An unknown error occurred.");

            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Section>
            <Header
                largeText="Subscribe"
                smallText="for updates"
                sequence="large, small"
            ></Header>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                viewport={{ once: true }}
                className="card items-center glass bg-neutral text-neutral w-full py-8 cursor-pointer">
                <form onSubmit={handleSubscribe} className="card-body w-full max-w-md">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg text-base-200">Your Email</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input name='email' type="email" placeholder="Email" className="input input-bordered w-full" />
                        <div className="label">
                            <div className="label-text-alt mt-1 text-sm w-full text-base-200 flex items-start gap-2">
                                <div className="text-lg pt-1">
                                    <FaRegCheckSquare />
                                </div>

                                <p>Update me with latest tour package and Job Circulars</p>
                            </div>
                            {/* <span className="label-text-alt">Bottom Right label</span> */}
                        </div>
                    </label>
                    {
                        loading ?
                            <div>
                                <PrimaryBtn>
                                    Loading ...
                                </PrimaryBtn>
                            </div>
                            :
                            <div>
                                <PrimaryBtn type='submit'>
                                    Subscribe
                                </PrimaryBtn>
                            </div>
                    }

                </form>
            </motion.div>
            {
                error ?
                    <ErrorAlert
                        error={error}
                        setError={setError}
                    ></ErrorAlert>
                    :
                    <></>
            }
            {
                success ?
                    <SuccessAlert
                        success={success}
                        setSuccess={setSuccess}></SuccessAlert>
                    :
                    <></>
            }
        </Section>
    )
}