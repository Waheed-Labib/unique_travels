import { AdminProvider } from "../../contexts/AdminContext";
import GoToHomeBtn from "../../ui/buttons/goToHomeBtn";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-base-100 min-h-[100vh] text-neutral flex flex-col items-center gap-12">
            <AdminProvider>
                {children}
            </AdminProvider>

            <div className="mb-8">
                <GoToHomeBtn></GoToHomeBtn>
            </div>

        </div>
    );
}