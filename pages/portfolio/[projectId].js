import { useRouter } from 'next/router'

const PortfolioProjectPage = () => {
  const router = useRouter()

  console.log(router.pathname)
  console.log(router.query.projectId)

  return (
    <div>PortfolioProjectPage</div>
  )
}

export default PortfolioProjectPage