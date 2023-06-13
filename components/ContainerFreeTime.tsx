import 'server-only'
import moment from 'moment';
import { schedule } from '@prisma/client';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// export const dynamic = 'force-dynamic'
export const revalidate = 60

async function getNextClass(): Promise<schedule | null> {
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

    let nextClass = await getNextClass()
        .then(res => res)
        .catch(error => console.error(error))
        .finally(async () => await prisma.$disconnect)

    let nextClassInfo = nextClass?.from_date ? moment(nextClass?.from_date).from(moment().add(8, 'h').toISOString()) : ''

    return (
        <>
            <div className="nes-container with-title is-dark">
                <p className="title">BSBA-HRM 3-4N</p>
                <p className="text-center"><span className="nes-text uppercase is-primary font-bold italic">Free Time!</span></p>
                {
                    nextClass !== null ?
                        <p>Your next class is <span className="nes-text is-error">{nextClassInfo}.</span></p> :
                        <p>Hooray! No more classes! (for now... probably)</p>
                }
            </div>
        </>
    )
}