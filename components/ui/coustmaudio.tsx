"use client"
import React, { useRef, useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa'; // أو أي مكتبة أيكونز لديك

export default function CustomAudioPlayer({ audioUrl }: { audioUrl: string }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // تشغيل وإيقاف الصوت
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-amber-100">
            {/* عنصر الصوت المخفي */}
            <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                onEnded={() => setIsPlaying(false)}
            />

            {/* زر التشغيل/الإيقاف المخصص */}
            <button
                onClick={togglePlay}
                className="w-9 h-9 flex items-center justify-center bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all shadow"
            >
                {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-0.5" />}
            </button>

            {/* مؤشر الوقت */}
            {/* مؤشر الوقت المحسّن */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 direction-ltr bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                <span>
                    {Math.floor(currentTime / 3600) > 0 ? `${Math.floor(currentTime / 3600)}:` : ''}
                    {Math.floor((currentTime % 3600) / 60).toString().padStart(2, '0')}:
                    {Math.floor(currentTime % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-gray-400">/</span>
                <span>
                    {Math.floor(duration / 3600) > 0 ? `${Math.floor(duration / 3600)}:` : ''}
                    {Math.floor((duration % 3600) / 60).toString().padStart(2, '0')}:
                    {Math.floor(duration % 60).toString().padStart(2, '0')}
                </span>
            </div>

            {/* أيقونة الصوت */}
            <FaVolumeUp className="text-gray-500" size={16} />
        </div>
    );
}