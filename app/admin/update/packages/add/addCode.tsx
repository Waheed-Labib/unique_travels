import React from 'react';

const AddCode = ({ code, setCode }: {
    code: number | '',
    setCode: React.Dispatch<React.SetStateAction<number | ''>>
}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Allow only digits and limit to 3 characters
        if (/^\d{0,3}$/.test(value)) {
            // Convert to number or '' based on input
            setCode(value === '' ? '' : Number(value));
        }
    }

    return (
        <div className='mt-4'>
            <label className="label font-semibold text-primary">3. Provide a code</label>

            <input
                type='number'
                value={code}
                onChange={handleInputChange}
                placeholder='Enter 3-digit code'
                className='text-sm w-64 border border-secondary rounded px-2 py-1 mt-2 block'
            />
        </div>
    );
};

export default AddCode;
