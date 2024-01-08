import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const page = async () => {

    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;


    const orgnizedEvents = await getEventsByUser({ userId , page :1})


  return (
    <>
      {/*  my tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size={'lg'}>
            <Link href={"/#events"} className="button hidden sm:flex">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>
      {/* 
      <section className="wrapper my-8 ">
      <Collection
          data={[]}
          emptyTitle="No tickets purchased yet"
          emptyStateSubtext="No worries -plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section> */}
      {/* events orgnized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size={'lg'}>
            <Link href={"/events/create"} className="button hidden sm:flex">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8 ">
      <Collection
          data={orgnizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          urlParamName="eventsPage"
          totalPages={2}
        />
      </section> 
    </>
  );
}

export default page;
