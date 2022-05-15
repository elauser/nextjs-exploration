import Link from 'next/link'

const HomePage = () => {
  return (
    <div>
      <h1>
        The HomePage
      </h1>
      <ul>
        <li>
          <Link href="/portfolio">portfolioPage</Link>
        </li>
        <li>
          <Link href="/clients">clientsPage</Link>
        </li>
      </ul>
    </div>
  )
}

export default HomePage