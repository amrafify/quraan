import React, { SetStateAction } from 'react'
import { useMarkRecitationStore } from '../../store/uesMarkSurah'
interface recitationsitem {
    id: number,
    style?: string,
    translated_name: {
        name: string
    }
}
interface recitationsData {
    recitations: recitationsitem[]
}

export default function RecitationItem({ rec, setRecitation }: { rec: recitationsitem, setRecitation: React.Dispatch<React.SetStateAction<recitationsData | null>> }) {
    const { setrecitationId } = useMarkRecitationStore()
    return (
        <option id={rec.id} onClick={() => setRecitation(rec.id)} value={rec.id}>{rec.translated_name.name} {rec.style ? `(${rec.style})` : null}</option>
    )
}
