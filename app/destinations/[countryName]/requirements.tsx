import React from 'react';
import Section from '../../../ui/Section';
import Header from '../../../ui/header';
import * as motion from "motion/react-client";

const Requirements = ({ countryName, requirements }: {
    countryName: string | undefined,
    requirements: string[] | undefined
}) => {
    return (
        <Section isMarginShort={true}>
            <Header
                largeText='Visa Checklist'
                smallText={`for ${countryName}`}
                sequence='large, small'
                isHome={false}
            >
            </Header>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.2,
                    scale: {
                        type: "spring",
                        stiffness: 40,
                        damping: 12,
                        bounce: 0.2,
                    },
                    opacity: { duration: 0.2 },
                }}
                className='w-full glass bg-neutral text-base-100 pt-12 pb-8 px-12 lg:px-20 rounded-lg mb-8' >
                <ol>
                    {
                        requirements?.map(rqr => <li className='list-decimal mb-4 pl-4' key={rqr}>{rqr}</li>)
                    }
                </ol>
            </motion.div>
        </Section >
    );
};

export default Requirements;