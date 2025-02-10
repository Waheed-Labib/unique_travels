import { cn } from "../lib/utils"

export default function Header({ smallText, largeText, underlineColor }: {
    smallText: string,
    largeText: string,
    underlineColor: string
}) {
    return (
        <div>
            <h1 className="text-neutral text-center font-medium text-lg lg:text-xl mb-12">
                {smallText}&nbsp;
                <span className={cn(`text-2xl lg:text-4xl font-semibold underline decoration-wavy`,
                    underlineColor === 'primary' ? 'decoration-primary' : '',
                    underlineColor === 'accent' ? 'decoration-accent' : '',
                    underlineColor === 'secondary' ? 'decoration-secondary' : '',
                )}>
                    {largeText}
                </span>
            </h1>
        </div >
    )
}