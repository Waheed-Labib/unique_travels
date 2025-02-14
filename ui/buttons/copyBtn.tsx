'use client';

import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { MdDone } from "react-icons/md";

export default function CopyBtn({ copyText, className }: {
    copyText: string,
    className?: string
}) {

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(copyText);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000); // Reset after 2 seconds
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div>
            <button onClick={handleCopy} className={className}>
                {
                    copied ?
                        <>
                            <div className=""><MdDone /></div>
                            {/* <p>Copied</p> */}
                        </>
                        :
                        <>
                            <div className=""><FaRegCopy /></div>
                            {/* <p>Copy</p> */}
                        </>
                }
            </button>
        </div>
    )
}