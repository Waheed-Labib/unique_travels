import GoToHomeBtn from "../../ui/buttons/goToHomeBtn";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="bg-base-100 min-h-[100vh] text-neutral flex flex-col items-center gap-32 pb-12">
                    {children}
                    <GoToHomeBtn></GoToHomeBtn>
                </div>
            </body>
        </html >
    );
}