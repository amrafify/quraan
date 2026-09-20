'use client'
import { recitationsList } from '@app/app/utils/api'
import React, { useEffect, useState } from 'react'
import { useMarkRecitationStore } from '../../store/uesMarkSurah'
import RecitationItem from './RecitationItem'

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
export default function Listrecitations() {
    const [recitation, setRecitation] = useState<recitationsData | null>(null);
    const { setrecitationId, recitationId } = useMarkRecitationStore()
    useEffect(() => {
        async function fetchData() {
            const data = await recitationsList();
            setRecitation(data);
        }
        fetchData();
    }, []);
    if (!recitation) return <p>جاري التحميل...</p>;
    console.log(recitation, 'ddd');
    const handleSelectRecitation = (e: string) => {
        const RecitationItem = e;
        setrecitationId(Number(RecitationItem))
    };

    return (
        <div>
            <select name="recitationsitem" value={recitationId} id="" onChange={(e) => handleSelectRecitation(e.target.value)} >
                {
                    recitation.recitations.map((rec, i) => <RecitationItem key={i} rec={rec} setRecitation={setRecitation} />)
                }
            </select>
        </div>
    )
}
