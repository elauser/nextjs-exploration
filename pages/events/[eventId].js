import React from 'react'
import Head from 'next/head'
import { getEventById } from '../../dummy-data'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'
import { getAllEvents, getFeaturedEvents } from '../../dummy-data'

const EventDetailPage =  ({ event }) => {
  if (!event){
    return <div className='center'><p>No event found!</p></div>
  }

  return (
    <React.Fragment>
      <Head>
        <title>{event.title}</title>
        <meta 
          name='description'
          content='Find all events in your area!'
        />
      </Head>
      <EventSummary title={event.title}/>
      <EventLogistics 
        date={event.date} 
        address={event.location} 
        image={event.image} 
        imageAlt={event.imageAlt}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </React.Fragment>
  )
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const eventIds = events.map(event => ({ params: { eventId: event.id} }))

  return {
    paths: eventIds,
    fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId
  const event = await getEventById(eventId)

  return {
    props: {
      event: event
    },
    revalidate: 30
  }
}

export default EventDetailPage