'use client';

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error, reset: () => void }) {
    useEffect(() => {
        console.error("Unexpected error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center bg-base-100">
            <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
            <p className="text-gray-700 mt-2">Please try again later.</p>
            <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    );
}
