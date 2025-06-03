import Accessories from "../../ui/accessories";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
                <Accessories></Accessories>
            </body>
        </html >
    );
}