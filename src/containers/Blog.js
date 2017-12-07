
import React from 'react'
import { getRouteProps, Link } from 'react-static'
//

export default getRouteProps(({ posts }) => {
  console.log(posts)
  return (
    <div>
      <h1>It's blog time.</h1>
      <br />
      All Posts:
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={`/blog/post/${post.slug}/`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
})
