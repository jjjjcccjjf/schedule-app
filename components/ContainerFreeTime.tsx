import 'server-only'
import moment from 'moment';
import { schedule } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getNextClass(): Promise<schedule> {
    const dateNow = moment().add(8, 'h').toISOString()

    const nextClass = await prisma.schedule.findFirst({
        where: {
            from_date: {
                gte: dateNow
            }
        },
        orderBy: [
            {
                from_date: 'asc'
            }
        ]
    })

    return nextClass
}

export default async function ContainerFreeTime() {

    let nextClass: schedule | boolean = false
    try {
        nextClass = await getNextClass()
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }

    let nextClassInfo = moment(nextClass.from_date).from(moment().add(8, 'h').toISOString())

    return (
        <>
            <div className="nes-container with-title  ">
                <p className="title">BSBA-HRM 3-4N</p>
                <p className="text-center"><span className="nes-text uppercase is-primary font-bold">Free Time </span> <span className="nes-text italic font-bold is-primary">「 GET! 」</span></p>
                {
                    nextClass ?
                        <p>Your next class is <span className="nes-text is-error">{nextClassInfo}</span></p> :
                        <p>Hooray! No more classes! (for now... probably)</p>
                }
            </div>
        </>
    )
}