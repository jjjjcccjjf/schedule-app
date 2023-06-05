import 'server-only'
import moment from 'moment';
import TimeCard from '@/components/TimeCard';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import ContainerHaveClass from '@/components/ContainerHaveClass';
import ContainerFreeTime from '@/components/ContainerFreeTime';
import Baloons from '@/components/Baloons';
import { schedule } from '@prisma/client'
import Link from 'next/link'

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkHaveClass() {
  const dateNow = moment().add(8, 'h').toISOString()

  console.log(dateNow);

  const haveClass = await prisma.schedule.findFirst({
    where: {
      from_date: {
        lte: dateNow
      },
      to_date: {
        gte: dateNow
      }
    }
  })

  return haveClass
}

export default async function Page() {

  let haveClass: schedule | boolean = false;
  try {
    haveClass = await checkHaveClass()
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }

  console.log(haveClass)

  return (
    <div className="container border border-red-300 max-w-xl h-screen mx-auto bg-slate-50 px-6 py-12">
      <main className="grid grid-flow-row gap-6">
        <TimeCard></TimeCard>
        {
          haveClass ?
            <ContainerHaveClass classDetails={haveClass}></ContainerHaveClass> :
            <ContainerFreeTime></ContainerFreeTime>
        }
        <Link className="nes-btn" href="/full-schedule">View Full Schedule</Link>
        {/* <Baloons></Baloons> */}
      </main>
    </div>
  )
}
