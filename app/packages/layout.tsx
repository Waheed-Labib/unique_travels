import Accessories from "../../ui/accessories";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
            <Accessories></Accessories>
        </div>
    );
}