import React from 'react'
import Head from 'next/head'

import EventList from '../components/events/EventList'
import { getFeaturedEvents } from '../dummy-data'

const HomePage = ({featuredEvents}) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta 
          name='description'
          content='Find great events in your area!'
        />
      </Head>
      <EventList items={featuredEvents}/>
    </div>
  )
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      featuredEvents: featuredEvents
    },
    revalidate: 600
  }
}

export default HomePage