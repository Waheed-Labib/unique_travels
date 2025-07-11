'use client'

import { useContext, useState } from "react";
import ErrorAlert from "../../ui/modals/error-alert/ErrorAlert";
import SuccessAlert from "../../ui/modals/success-alert/SuccessAlert";
import { AdminContext } from "../../contexts/AdminContext";

const AdminLogin = () => {

    const { setAdmin } = useContext(AdminContext);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setLoading(true);

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
                    console.error(error);

                    setError('Login Request failed');
                }

                setLoading(false);
                return res.json();
            })
            .then((data) => {
                setSuccess('Login Successful');
                setAdmin(data.data);
                emailField.value = '';
                passwordField.value = '';
            })
            .catch((error) => {
                setError(`Login Failed: ${error.message}`);
            });

    }

    return (
        <div>
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box border p-4 mt-8 mb-4 flex flex-col items-center">
                <legend className="fieldset-legend text-neutral/90 text-3xl font-semibold">Admin Login</legend>

                <form onSubmit={handleLogin} className="mt-8 text-neutral">
                    <label className="label text-sm">Email</label>
                    <input name='email' type="email" className="input w-64 border-base-200" placeholder="Email" />

                    <label className="label text-sm">Password</label>
                    <input name='password' type="password" className="input w-64 border-base-200" placeholder="Password" />

                    {
                        loading ?
                            <button disabled className="btn bg-neutral/80 text-white mt-4 block w-64">Loading ...</button>
                            :
                            <button type="submit" className="btn bg-neutral/90 text-white hover:bg-neutral/95 mt-4 block w-64">Login</button>
                    }


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
        </div>
    );
};

export default AdminLogin;