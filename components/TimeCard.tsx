'use client'
import { useState, useEffect } from 'react'

function formatDate(date: Date): string {
    const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day: string = daysOfWeek[date.getDay()].toUpperCase();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();
    const ampm: string = hours >= 12 ? 'PM' : 'AM';

    const formattedHours: number = ((hours + 11) % 12 + 1);
    const formattedMinutes: string = minutes.toString().padStart(2, '0');
    const formattedSeconds: string = seconds.toString().padStart(2, '0');

    const formattedDate: string = `${day} ${formattedHours}:${formattedMinutes}:${formattedSeconds}${ampm}`;

    return formattedDate;
}

export default function TimeCard() {
    const [time, setTime] = useState("Now loading...")

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatDate(new Date()))
        }, 1000)

        return () => {
            clearInterval(interval)
        }

    }, [])

    return (
        <>
            <div className="nes-container is-rounded text-center">
                <p className="text-2xl">{time}</p>
            </div>
        </>
    )
}