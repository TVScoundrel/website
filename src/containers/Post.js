import React from 'react'
import { getRouteProps, Link } from 'react-static'

const codeBlock = props => {
  const html = Prism.highlight(props.literal, Prism.languages[props.language])
  const cls = `language-${props.language}`

  return (
    <pre className={cls}>
      <code
        dangerouslySetInnerHTML={{ __html: html }}
        className={cls}
      />
    </pre>
  )
}

export default getRouteProps(({ post }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <h3>{post.title}</h3>
    <div dangerouslySetInnerHTML={{ __html: post.parsed }} />
  </div>
))
