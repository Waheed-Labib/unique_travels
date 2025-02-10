export default function Header({ smallText, largeText, underlineColor }: {
    smallText: string,
    largeText: string,
    underlineColor: string
}) {
    return (
        <div>
            <h1 className="text-neutral text-center font-medium text-lg lg:text-xl mb-12">
                {smallText}&nbsp;
                <span className={`text-2xl lg:text-4xl font-semibold underline decoration-wavy decoration-${underlineColor}`}>
                    {largeText}
                </span>
            </h1>
        </div>
    )
}