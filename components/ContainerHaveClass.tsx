'use client'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { schedule } from '@prisma/client'

type ClassProps = {
    classDetails: schedule
}

export default function ContainerHaveClass({ classDetails }: ClassProps) {
    const [timeLeft, setTimeLeft] = useState("loading...")

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(moment(classDetails.to_date).from(moment().add(8, 'h').toISOString()))
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <div className="nes-container with-title bg-white dark:is-dark">
                <p className="title">BSBA-HRM 3-4N</p>
                <p className="text-center"><span className="nes-text is-error font-bold">YOU HAVE A CLASS!!!</span></p>
                <p>Your subject is: <span className="nes-text is-error">{classDetails.subject_name}</span></p>
                <p>Your room number is: <span className="nes-text is-error">{classDetails.room_number}</span></p>
                <p>Class will end: <span className="nes-text is-error">{timeLeft}</span></p>
            </div>
        </>
    )
}