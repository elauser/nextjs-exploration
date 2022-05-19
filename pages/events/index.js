 import React from 'react'
 import { useRouter } from 'next/router'
import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/EventList'
import EventsSearch from '../../components/events/EventsSearch'
 
 const AllEventsPage = () => {
  const events = getAllEvents()
  const router = useRouter()

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`)
  }
  return (
    <>
      <EventsSearch onSearch={findEventsHandler}/>
      <EventList items={events} />
    </>
  )
 }
 
 export default AllEventsPage