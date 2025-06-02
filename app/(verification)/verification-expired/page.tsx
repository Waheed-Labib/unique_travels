'use client'

import { handleResendToken } from "../../../lib/utils";
import PrimaryBtn from "../../../ui/buttons/primaryBtn";

export default function Page({ searchParams }: { searchParams: { email: string } }) {

    const { email } = searchParams;

    return (
        <div className='text-neutral flex flex-col items-center justify-center mt-24'>
            <p className="font-semibold text-gray-500">{email}</p>
            <p className="text-2xl font-bold text-red-800 mb-8">Verification Expired.</p>
            <PrimaryBtn handler={() => handleResendToken(email)}>
                Send me another token
            </PrimaryBtn>
        </div>
    )
}