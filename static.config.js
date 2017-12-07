import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import client from './src/services/contentfulClient'
import blogPost from './src/models/blogPost'

export default {
  getSiteProps: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { items } = await client.getEntries({ content_type: '2wKn6yEnZewu2SCCkus4as' })
      .catch(err => {
        console.log(err)
      })
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getProps: () => ({
          posts: items.map(blogPost),
        }),
        children: items.map(blogPost).map(post => ({
          path: `/post/${post.slug}`,
          component: 'src/containers/Post',
          getProps: () => ({
            post,
          }),
        })),
      },

      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
