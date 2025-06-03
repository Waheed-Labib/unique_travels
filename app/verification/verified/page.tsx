import { FaCheckCircle } from "react-icons/fa";

export default function Page({ searchParams }: { searchParams: { email: string } }) {

    const { email } = searchParams;

    return (
        <div className='text-neutral flex flex-col items-center justify-center mt-24'>
            <p className="font-semibold text-gray-500">{email}</p>
            <p className="text-xs mb-8">This Email is</p>
            <p className="text-2xl font-bold text-primary-content">Successfully Verified</p>
            <div className="text-primary-content text-2xl mt-3">
                <FaCheckCircle></FaCheckCircle>
            </div>
        </div>
    )
}