import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

const AddRegionBtn = () => {


    return (
        <Link className='w-full lg:w-1/4' href={'/admin/update/packages/add'}>
            <button className='btn btn-primary glass bg-primary w-full'>
                <FaPlus></FaPlus>
                <p className=''>Add New Region</p>
            </button>
        </Link>
    );
};

export default AddRegionBtn;