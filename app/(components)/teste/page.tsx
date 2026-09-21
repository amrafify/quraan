import Image from "next/image"

import { AspectRatio } from "../../../components/ui/aspect-ratio"

export default function AspectRatioDemo() {
    return (
        <AspectRatio ratio={16 / 9} className="w-full max-w-sm rounded-lg bg-muted">

        </AspectRatio>
    )
}
