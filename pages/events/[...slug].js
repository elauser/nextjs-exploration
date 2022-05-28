import Head from 'next/head'
import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import EventList from '../../components/events/EventList'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/Button'
import ErrorAlert from '../../components/ui/error-alert'

const FilteredEventsPage = ({ filteredEvents, invalidFilter, numYear, numMonth }) => {
  const pageHead = (      
    <Head>
      <title>Filtered Events</title>
      <meta 
        name='description'
        content={`Find all events for ${numYear}-${numMonth}!`}
      />
    </Head>
  )

  if ( invalidFilter ){
    return(
      <>
        {pageHead}
        <ErrorAlert>
          <p>Invalid Filter</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    )
  }

  const router = useRouter()

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHead}
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </> 
    )
  }

  const date = new Date(numYear, numMonth-1)

  return (
    <>
      {pageHead}
      <ResultsTitle date={date}/>
      <EventList items={filteredEvents} />
    </>
  )
}

export async function getServerSideProps(context){
  const filterData = context.params.slug

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021){
    return {
      props: {
        invalidFilter: true,
      }
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth
  })

  return {
    props: {
      filteredEvents: filteredEvents,
      numYear: numYear,
      numMonth: numMonth
    }
  }
}

export default FilteredEventsPage