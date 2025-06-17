'use client'

import React, { useEffect, useState } from 'react';
import { Contact } from '../../../../lib/types';
import SuccessAlert from '../../../../ui/modals/success-alert/SuccessAlert';
import ErrorAlert from '../../../../ui/modals/error-alert/ErrorAlert';

const Page = () => {

    const [originalContact, setOriginalContact] = useState<null | Contact>(null)

    const [changed, setChanged] = useState(false);
    const [newHotline, setNewHotline] = useState('');
    const [newWhatsapp, setNewWhatsapp] = useState('');
    const [newAddress, setNewAddress] = useState('');

    const [dataLoading, setDataLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {

        const getContact = async () => {
            try {
                const res = await fetch('/api/contacts');
                const data = await res.json();
                setOriginalContact(data.data);
            } catch (error) {
                console.error(error)
            } finally {
                setDataLoading(false)
            }
        }

        getContact();
    }, [])

    const handleHotlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewHotline(e.target.value);
        setChanged(true);
    }

    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewWhatsapp(e.target.value);
        setChanged(true);
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress(e.target.value);
        setChanged(true);
    }

    const handleUpdateContact = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setUpdating(true);

        try {
            const res = await fetch('/api/contacts', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: originalContact?._id,
                    hotline: newHotline,
                    whatsapp: newWhatsapp,
                    address: newAddress
                })
            });

            if (res.ok) {
                setSuccess('Update Successful');
                setChanged(false);
            } else {
                setError('Update Failed');
            }

        } catch (error) {
            console.error(error);
            setError('Update Failed');
        } finally {
            setUpdating(false);
        }
    }

    if (dataLoading) {
        return <div className='text-center'>
            <p>Loading original contact ...</p>
        </div>
    }

    return (
        <div className='text-neutral flex flex-col items-center gap-4'>
            <p className='text-xl font-semibold text-neutral/90'>Update Your Contact</p>

            <form onSubmit={handleUpdateContact} className="mt-8 text-neutral">
                <label className="label text-sm">Hotline</label>
                <input onChange={handleHotlineChange} name='hotline' type="text" defaultValue={originalContact?.hotline} className="input w-64 border-base-200" />

                <label className="label text-sm">Whatsapp</label>
                <input onChange={handleWhatsappChange} name='whatsapp' type="text" defaultValue={originalContact?.whatsAppNumber} className="input w-64 border-base-200" />

                <label className="label text-sm">Address</label>
                <input onChange={handleAddressChange} name='address' type="text" defaultValue={originalContact?.address} className="input w-64 border-base-200" />

                {
                    updating ?
                        <button disabled className="btn bg-neutral/80 text-white mt-4 block w-64">Updating ...</button>
                        :
                        <>
                            {
                                changed ?
                                    <button type="submit" className="btn bg-neutral/90 text-white hover:bg-neutral/95 mt-4 block w-64">Update</button>
                                    :
                                    <button disabled className="btn bg-neutral/80 text-white mt-4 block w-64">Update</button>
                            }
                        </>

                }

            </form>

            {
                success ?
                    <SuccessAlert
                        success={success}
                        setSuccess={setSuccess}
                    ></SuccessAlert>
                    :
                    <></>
            }

            {
                error ?
                    <ErrorAlert
                        error={error}
                        setError={setError}
                    ></ErrorAlert>
                    :
                    <></>
            }

        </div>
    );
};

export default Page;