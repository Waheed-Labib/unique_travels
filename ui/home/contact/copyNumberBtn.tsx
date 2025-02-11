'use client';

import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { hotline } from "../../../lib/fakeData";
import { MdDone } from "react-icons/md";

export default function CopyNumberBtn() {

    const [copied, setCopied] = useState(false);
    const number = hotline;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(number);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000); // Reset after 2 seconds
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div>
            <button onClick={handleCopy} className={`btn btn-sm btn-outline btn-accent`}>
                {
                    copied ?
                        <>
                            <div className="text-xl"><MdDone /></div>
                            <p>Copied</p>
                        </>
                        :
                        <>
                            <div className="text-lg"><FaRegCopy /></div>
                            <p>Copy</p>
                        </>
                }
            </button>
        </div>
    )
}