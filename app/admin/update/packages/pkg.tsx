import React from 'react';
import { pkg } from '../../../../lib/types';
import PackageCard from '../../../../ui/packages/packageCard';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const Pkg = ({ pkg }: {
    pkg: pkg
}) => {
    return (
        <div>
            <div className="flex items-center justify-end gap-4 text-2xl pb-2">
                <Link
                    href={`/admin/update/packages/edit/${pkg.code}`}
                    className="text-secondary relative group">
                    <FaRegEdit></FaRegEdit>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        Edit
                    </span>
                </Link>

                <Link
                    href={`/admin/update/packages/delete/${pkg.code}`}
                    className="text-accent relative group"
                >
                    <MdDeleteForever></MdDeleteForever>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition transform bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        Delete
                    </span>
                </Link>

            </div>

            <PackageCard
                pkg={pkg}
                className=''
                isHome={false}
            ></PackageCard>
        </div>
    );
};

export default Pkg;