import Head from 'next/head'
import { useRouter } from 'next/router'
import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/EventList'
import EventsSearch from '../../components/events/EventsSearch'
 
const AllEventsPage = ({ events }) => {
  const router = useRouter()

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`)
  }
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta 
          name='description'
          content='Find all events in your area!'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler}/>
      <EventList items={events} />
    </>
  )
}

export async function getStaticProps(context) {
  const events = await getAllEvents()
  return {
    props: {
      events: events
    },
    revalidate: 30
  }
}
 
 export default AllEventsPage