

export default function Page() {
    return (
        <div className="">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 my-8 flex flex-col items-center">
                <legend className="fieldset-legend text-neutral text-3xl font-semibold">Admin Login</legend>

                <div className="mt-8">
                    <label className="label text-neutral text-sm">Email</label>
                    <input type="email" className="input w-64" placeholder="Email" />

                    <label className="label text-neutral text-sm">Password</label>
                    <input type="password" className="input w-64" placeholder="Password" />

                    <button className="btn btn-neutral mt-4 block w-64">Login</button>

                    <p className="text-neutral text-sm mt-4 cursor-pointer underline hover:font-semibold transition-all text-center">Forgot Password?</p>
                </div>

            </fieldset>
        </div >
    )
}
