import 'server-only'
import moment from 'moment';
import TimeCard from '@/components/TimeCard';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import ContainerHaveClass from '@/components/ContainerHaveClass';
import ContainerFreeTime from '@/components/ContainerFreeTime';
import Baloons from '@/components/Baloons';
import { schedule } from '@prisma/client'
import Link from 'next/link'
import Nav from '@/components/Nav';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const revalidate = 60

async function getClassNow(): Promise<schedule> {
  const dateNow = moment().add(8, 'h').toISOString()

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


async function checKHaveClass(): Promise<boolean> {
  const dateNow = moment().add(8, 'h').toISOString()

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

  return haveClass !== null
}

export default async function Page() {

  const haveClass = await checKHaveClass()
    .then(res => res)
    .catch((error) => console.error(error))
    .finally(async () => await prisma.$disconnect())

  const classNow = await getClassNow()
    .then(res => res)
    .catch((error) => console.error(error))
    .finally(async () => await prisma.$disconnect())

  return (
    <div className="container bg-gray-200 max-w-xl mx-auto px-6 py-6">
      <Nav></Nav>
      <main className="grid grid-flow-row gap-6">
        {
          haveClass ?
            <ContainerHaveClass classDetails={classNow as schedule}></ContainerHaveClass> :
            <ContainerFreeTime></ContainerFreeTime>
        }
        <Link className="nes-btn bg-white" href="/full-schedule">View Full Schedule</Link>
        <Baloons></Baloons>
      </main>
    </div>
  )
}
