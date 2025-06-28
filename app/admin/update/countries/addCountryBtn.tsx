import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

const AddCountryBtn = () => {


    return (
        <Link className='w-full lg:w-1/4' href={'/admin/update/countries/add'}>
            <button className='btn btn-primary glass bg-primary w-full'>
                <FaPlus></FaPlus>
                <p className=''>Add New Country</p>
            </button>
        </Link>
    );
};

export default AddCountryBtn;