'use client'

import { FaRegCheckSquare } from "react-icons/fa";
import Header from "../header";
import Section from "../Section";
import PrimaryBtn from "../buttons/primaryBtn";
import * as motion from "motion/react-client"
import { useState } from "react";
import ErrorAlert from "../modals/error-alert/ErrorAlert";
import TaskAlert from "../modals/task-alert/TaskAlert";
import SubscriberAlreadyExists from "../modals/subscriberAlreadyExists/SubscriberAlredyExists";

export default function Subscribe() {

    const [task, setTask] = useState('');
    const [error, setError] = useState('');
    const [subscriberExists, setSubscriberExists] = useState(false);
    const [subscriberVerified, setSubscriberVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setLoading(true);
        setError('');
        setTask('');

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
                if (data.message === 'Subscriber already exists, but not Verified') {
                    setSubscriberExists(true)
                    return
                }
                if (data.message === 'Subscriber already exists and Verified') {
                    setSubscriberExists(true)
                    setSubscriberVerified(true)
                    return
                }
                setError(data.message || "Subscription failed");
                return
            }

            setTask("Please check your email for verification");
            emailInput.value = "";

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(`❌ ${error.message}`);

            } else {
                setError("❌ An unknown error occurred.");

            }
        } finally {
            setLoading(false);
            emailInput.value = "";
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
                        <input onChange={(e) => setEmail(e.target.value)} name='email' type="email" placeholder="Email" className="input input-bordered w-full" />
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
                task ?
                    <TaskAlert
                        task={task}
                        setTask={setTask}></TaskAlert>
                    :
                    <></>
            }
            {
                subscriberExists ?
                    <SubscriberAlreadyExists
                        email={email}
                        subscriberExistsModalOpen={subscriberExists}
                        setSubscriberExistsModalOpen={setSubscriberExists}
                        subscriberVerified={subscriberVerified}
                    ></SubscriberAlreadyExists>
                    :
                    <></>
            }
        </Section>
    )
}