import { useRouter } from "next/router";

const BlogPostsPage = () => {
  const router = useRouter()
  console.log(router)

  return (
    <div>BlogPostsPage</div>
  )
}

export default BlogPostsPage