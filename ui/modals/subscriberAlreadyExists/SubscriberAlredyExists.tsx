import { FaTasks } from "react-icons/fa";
import ResendTokenBtn from "../../buttons/resendTokenBtn";

export const SubscriberAlreadyExists = ({ email, subscriberExistsModalOpen, setSubscriberExistsModalOpen, subscriberVerified }:
    {
        email: string,
        subscriberExistsModalOpen: boolean,
        setSubscriberExistsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
        subscriberVerified: boolean
    }) => {
    return (
        <div className="w-72 mx-auto flex items-center justify-center">
            <div onClick={() => setSubscriberExistsModalOpen(false)} className={`fixed flex justify-center items-center z-[100] ${subscriberExistsModalOpen ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 backdrop-blur-sm bg-black/20 duration-100`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-80 p-6 text-center bg-white drop-shadow-2xl rounded-lg ${subscriberExistsModalOpen ? 'translate-y-0 opacity-1 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}>
                    <div className="space-y-3 flex flex-col justify-center items-center gap-2">
                        <div className='text-5xl text-yellow-600'>
                            <FaTasks></FaTasks>
                        </div>
                        <h6 className="font-semibold text-xl text-center text-slate-700 mb-1">Subscriber Already Exists</h6>
                        {
                            subscriberVerified ?
                                <p>Subscriber Verified</p>
                                :
                                <ResendTokenBtn email={email}></ResendTokenBtn>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}


export default SubscriberAlreadyExists;