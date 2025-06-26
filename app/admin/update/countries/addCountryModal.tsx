import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";

export const AddCountryModal = ({ addCountryModalOpen, setAddCountryModalOpen }: {
    addCountryModalOpen: boolean,
    setAddCountryModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

    useEffect(() => {
        if (name && image) {
            setSubmitBtnDisabled(false);
        }
    }, [name, image])

    const handleAddCountry = () => {

    }

    return (
        <div className="w-72 mx-auto flex items-center justify-center">
            <div onClick={() => setAddCountryModalOpen(false)} className={`fixed flex justify-center items-center z-[100] ${addCountryModalOpen ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 backdrop-blur-sm bg-black/20 duration-100`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-80 p-6 text-center bg-white drop-shadow-2xl rounded-lg ${addCountryModalOpen ? 'translate-y-0 opacity-1 duration-300' : 'translate-y-20 opacity-0 duration-150'}`}>

                    <p className="text-xl font-semibold mb-4">Add New Country</p>

                    <form onSubmit={handleAddCountry} className="space-y-3 flex flex-col justify-center items-center">

                        <label className="label text-sm font-semibold text-primary">
                            Country Name
                        </label>

                        <input onChange={(e) => setName(e.target.value)} name='name' type="text" placeholder="Country Name" className="input w-64 border-base-200" />

                        <label className="label text-sm font-semibold text-primary">
                            Country Image
                        </label>

                        {
                            submitBtnDisabled ?
                                <button disabled className="text-white bg-neutral/20 px-4 py-2 text-sm rounded">Add</button>
                                :
                                <button type="submit" className="text-white bg-primary px-4 py-2 text-sm rounded hover:bg-primary-content">Add</button>

                        }

                    </form>
                </div>
            </div>
        </div>
    )
}


export default AddCountryModal;