'use client'

import React, { useState } from "react";
import SuccessAlert from "../../ui/modals/success-alert/SuccessAlert";
import ErrorAlert from "../../ui/modals/error-alert/ErrorAlert";

export default function Page() {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.currentTarget;

        const emailField = form.elements.namedItem('email') as HTMLInputElement;
        const passwordField = form.elements.namedItem('password') as HTMLInputElement;

        const email = emailField.value;
        const password = passwordField.value;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.message || 'Login Request failed');
                }
                return res.json();
            })
            .then(() => {
                setSuccess('Login Successful');
                emailField.value = '';
                passwordField.value = '';
            })
            .catch((error) => {
                setError(`Login Failed: ${error.message}`);
            });

    }

    return (
        <div className="">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 my-8 flex flex-col items-center">
                <legend className="fieldset-legend text-neutral text-3xl font-semibold">Admin Login</legend>

                <form onSubmit={handleLogin} className="mt-8 text-neutral">
                    <label className="label text-sm">Email</label>
                    <input name='email' type="email" className="input w-64" placeholder="Email" />

                    <label className="label text-sm">Password</label>
                    <input name='password' type="password" className="input w-64" placeholder="Password" />

                    <button type="submit" className="btn btn-neutral mt-4 block w-64">Login</button>

                    <p className="text-neutral text-sm mt-4 cursor-pointer underline hover:font-semibold transition-all text-center">Forgot Password?</p>
                </form>

                {
                    success && <SuccessAlert
                        success={success}
                        setSuccess={setSuccess}
                    ></SuccessAlert>
                }

                {
                    error && <ErrorAlert
                        error={error}
                        setError={setError}
                    ></ErrorAlert>
                }

            </fieldset>
        </div >
    )
}
