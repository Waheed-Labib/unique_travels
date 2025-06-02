import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: string[]) {
    return twMerge(clsx(inputs));
}

export const handleResendToken = async (email: string) => {
    const res = await fetch("/api/resend-verification-token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
        console.error(data.message || "Sending Verification Token Failed");
        return
    }

    console.log("Sent Verification Token Successfully!");
}