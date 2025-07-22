import React, { FormEvent, useState } from 'react';

const AddRegionName = ({ name, setName, nameSubmitted, setNameSubmitted, setError }: {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    nameSubmitted: boolean,
    setNameSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
}) => {

    const [nameSubmitting, setNameSubmitting] = useState<boolean>(false);

    const handleNameSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setNameSubmitting(true);

        try {
            const res = await fetch('/api/check-region-exist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ regionName: name })
            });

            const data = await res.json();

            if (data.data.regionExists) {
                setError('Region Already Exists');
            } else {
                setNameSubmitted(true);
            }

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Something Went Wrong while Checking Region Name');
            }
        } finally {
            setNameSubmitting(false);
        }
    };

    return (
        <div>
            <label className="label text-sm font-semibold text-primary">1. Region Name</label>
            <input
                onChange={(e) => setName(e.target.value)}
                name='name'
                type="text"
                placeholder='region name'
                className="input w-64 border-base-200"
            />

            {!nameSubmitted ? (
                name ? (
                    nameSubmitting ? (
                        <button
                            disabled
                            className="btn bg-neutral/80 text-white mt-4 block w-64"
                        >
                            Loading ...
                        </button>
                    ) : (
                        <button
                            onClick={handleNameSubmit}
                            className="btn bg-neutral/90 text-white hover:bg-neutral/95 mt-4 block w-64"
                        >
                            Submit
                        </button>
                    )
                ) : (
                    <button
                        disabled
                        className="btn bg-neutral/80 text-white mt-4 block w-64"
                    >
                        Submit
                    </button>
                )
            ) : null}
        </div>
    );
};

export default AddRegionName;