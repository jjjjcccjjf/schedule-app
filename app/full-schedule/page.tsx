import 'server-only'

import Link from 'next/link';
import moment from 'moment';
import { schedule } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getFullSchedule() {

    const result = await prisma.schedule.findMany({
        orderBy: [{
            from_date: 'asc'
        }]
    })

    return result
}

export default async function Page() {

    const fullSchedule = await getFullSchedule()

    return (
        <div className="container border border-red-300 max-w-xl h-screen mx-auto bg-slate-50 px-6 py-12">
            <main className="grid grid-flow-row gap-6">
                <div className="nes-table-responsive">
                    <table className="nes-table is-bordered is-centered">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Dates Assigned</th>
                                <th>Schedule</th>
                                <th>Room Assigned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fullSchedule.map((item: schedule) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.subject_name}</td>
                                            <td>{moment(item.from_date).add(-8, 'h').format("MMMM D, YYYY")}</td>
                                            <td>{moment(item.from_date).add(-8, 'h').format("dd")}<br></br>{moment(item.from_date).add(-8, 'h').format("hh:mmA")} - {moment(item.to_date).add(-8, 'h').format("hh:mmA")}</td>
                                            <td>{item.room_number}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Link className="nes-btn" href="/">Back</Link>

            </main>
        </div>
    )
}
