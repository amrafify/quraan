import React, { SetStateAction } from 'react'
import { useMarkRecitationStore } from '../../store/uesMarkSurah'
import { NativeSelectOption } from '@app/components/ui/native-select'

interface recitationsitem {
    id: string,
    style?: string,
    translated_name: {
        name: string
    }
}
interface recitationsData {
    recitations: recitationsitem[]
}

export default function RecitationItem({ rec }: { rec: recitationsitem }) {

    return (
        <NativeSelectOption id={rec.id} value={rec.id}>{rec.translated_name.name} {rec.style ? `(${rec.style})` : null}</NativeSelectOption>
    )
}
