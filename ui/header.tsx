export default function Header({ smallText, largeText }: {
    smallText: string,
    largeText: string
}) {
    return (
        <div>
            <h1 className="text-neutral text-center font-medium text-lg lg:text-xl mb-12">
                {smallText}&nbsp;
                <span className="text-2xl lg:text-3xl font-semibold underline decoration-wavy decoration-primary">
                    {largeText}
                </span>
            </h1>
        </div>
    )
}