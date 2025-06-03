import ResendTokenBtn from "../../../ui/buttons/resendTokenBtn";

export default async function Page({ searchParams }: { searchParams: { email: string } }) {

    const { email } = await searchParams;

    return (
        <div className='text-neutral flex flex-col items-center justify-center mt-24'>
            <p className="font-semibold text-gray-500">{email}</p>
            <p className="text-2xl font-bold text-red-800 mb-8">Verification Token Expired.</p>
            <ResendTokenBtn
                email={email}
            ></ResendTokenBtn>
        </div>
    )
}