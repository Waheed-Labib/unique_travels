'use client'

import React, { useEffect, useState } from 'react';
import { Contact } from '../../../../lib/types';

const Page = () => {

    const [originalContact, setOriginalContact] = useState<null | Contact>(null)

    const [changed, setChanged] = useState(false);
    const [newHotline, setNewHotline] = useState('');
    const [newWhatsapp, setNewWhatsapp] = useState('');
    const [newAddress, setNewAddress] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getContact = async () => {
            try {
                const res = await fetch('/api/contacts');
                const data = await res.json();
                setOriginalContact(data.data);
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
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

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) {
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
                    changed ?
                        <button type="submit" className="btn bg-neutral/90 text-white hover:bg-neutral/95 mt-4 block w-64">Update</button>
                        :
                        <button disabled className="btn bg-neutral/80 text-white mt-4 block w-64">Update</button>
                }

            </form>
        </div>
    );
};

export default Page;