import React from 'react'
import { getRouteProps, Link } from 'react-static'
import marked from 'marked'

const getParsedMarkdown = content => ({
  __html: marked(content, { sanitize: true }),
})

export default getRouteProps(({ post }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <h3>{post.title}</h3>
    <div dangerouslySetInnerHTML={getParsedMarkdown(post.body)} />
  </div>
))
