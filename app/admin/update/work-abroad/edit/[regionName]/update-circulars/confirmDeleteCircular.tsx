import { useState } from "react";
import ErrorAlert from "../../../../../../../ui/modals/error-alert/ErrorAlert";
import SuccessAlert from "../../../../../../../ui/modals/success-alert/SuccessAlert";
import { circular } from "../../../../../../../lib/types";

export const ConfirmDeleteCircular = ({ circularId, confirmDeleteCircularOpen, setConfirmDeleteCircularOpen, setCirculars }: {
    circularId: string,
    confirmDeleteCircularOpen: boolean,
    setConfirmDeleteCircularOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setCirculars: React.Dispatch<React.SetStateAction<circular[]>>
}) => {

    const [deleting, setDeleting] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleDeleteCircular = async (circularId: string) => {

        setDeleting(true);

        try {
            const response = await fetch(`/api/circulars`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: circularId })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Circular deleted successfully');
                setCirculars(prevCirculars => prevCirculars.filter(item => item._id !== circularId));
            } else {
                setError('Failed to delete circular');
            }

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Failed to delete circular');
            }
        } finally {
            setDeleting(false)
            setConfirmDeleteCircularOpen(false);
        }
    };

    return (
        <div className="w-72 mx-auto flex items-center justify-center">
            <div className={`fixed flex justify-center items-center z-[100] ${confirmDeleteCircularOpen ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 backdrop-blur-sm bg-black/20 duration-100`}>
                <div className={`absolute w-80 p-6 text-center bg-white drop-shadow-2xl rounded-lg ${confirmDeleteCircularOpen ? 'translate-y-0 opacity-1 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}>
                    <div className="space-y-3 flex flex-col justify-center items-center gap-2">
                        <svg className={`${confirmDeleteCircularOpen ? 'scale-100 rotate-0 duration-200' : 'scale-0 rotate-90'} delay-100`} width={75} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#540101" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"></path></g></svg>
                        <h6 className="font-semibold text-xl text-center text-slate-700 mb-1">Are you sure you want to delete this circular?</h6>
                        <div className="flex items-center justify-center gap-4">
                            {
                                deleting ?
                                    <button disabled className="text-white bg-[#540101] px-4 py-2 text-sm rounded loading">Loading ...</button>
                                    :
                                    <button onClick={() => handleDeleteCircular(circularId)} className="text-white bg-[#540101] px-4 py-2 text-sm rounded hover:bg-[#3c0101]">Delete</button>
                            }

                            <button
                                onClick={() => setConfirmDeleteCircularOpen(false)}
                                className="text-white bg-gray-500 px-4 py-2 text-sm rounded hover:bg-gray-600"
                            >Cancel</button>
                        </div>
                    </div>

                    {
                        error && <ErrorAlert error={error} setError={setError}></ErrorAlert>
                    }

                    {
                        success && <SuccessAlert success={success} setSuccess={setSuccess}></SuccessAlert>
                    }
                </div>
            </div>
        </div>
    )
}


export default ConfirmDeleteCircular;