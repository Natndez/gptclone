import Image from "next/image"

// Creating interface for Empty component
interface EmptyProps {
    label: string,

}

export const Empty = ({
    label
}: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-64 w-64">
                <Image 
                    alt="Empty"
                    fill
                    src="/lampLogo2.png"
                />
            </div>
            <p className="text-muted-foreground text-md text-center">
                {label}
            </p>
        </div>
    )
}