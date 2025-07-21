import React from 'react';
import { Region } from '../../lib/types';
import Link from 'next/link';
import * as motion from "motion/react-client";
import Image from 'next/image';
import SimpleBtn from '../buttons/simpleBtn';
import { FaArrowRight } from 'react-icons/fa';
import { outfit } from '../../app/layout';

const RegionCard = ({ region, isAdminDashboard }: {
    region: Region
    isAdminDashboard?: boolean
}) => {
    if (isAdminDashboard)
        return (<div
            className="card glass w-full group max-h-64 bg-neutral text-base-200">
            <figure>
                <Image
                    src={region.image}
                    alt="region ladscape image"
                    width={1600}
                    height={900}
                ></Image>
            </figure>
            <div className="card-body">
                <h2 className={`card-title text-2xl ${outfit.className} text-base-100`}>{region.name}</h2>

            </div>

        </div>)

    return (
        <Link
            href={`/work-abroad/${region.name.toLowerCase()}`}
        >
            <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="card glass w-full group hover:shadow-lg max-h-64 bg-neutral text-base-200">
                <figure>
                    <Image
                        src={region.image}
                        alt="region ladscape image"
                        width={1600}
                        height={900}
                    ></Image>
                </figure>
                <div className="card-body">
                    <h2 className={`card-title text-2xl ${outfit.className} text-base-100`}>{region.name}</h2>
                    <div className="card-actions justify-end">
                        <SimpleBtn
                            addOutline={true}
                            className="hover:border-base-200"
                        >
                            <p>Job Circulars</p>
                            <FaArrowRight></FaArrowRight>
                        </SimpleBtn>
                    </div>
                </div>
            </motion.div>
        </Link>
    );


};

export default RegionCard;