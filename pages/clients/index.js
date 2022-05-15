import Link from "next/link"

const ClientsPage = () => {
  const clients = [
    {id: 1, name:'max'},
    {id: 2, name:'manu'},
  ]

  return (
    <>
    <div>ClientsPage</div>
    <ul>
      {clients.map(client => {
        return (
          <li key={client.id}>
            <Link href={{
              pathname: '/clients/[id]',
              query: {
                id: client.id
              }
            }}>{client.name}</Link>
          </li>
        )
      })}
    </ul>
    </>
  )
}

export default ClientsPage