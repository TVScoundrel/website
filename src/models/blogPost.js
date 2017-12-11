import md from 'markdown-it'
import prism from 'markdown-it-prism'
import blogAuthor from './blogAuthor'

const blogPost = post => {
  const { title, slug, author, body, category, tags, featuredImage, date } = post.fields

  // transform body into html
  const myMd = md()
  myMd.use(prism)
  const parsed = myMd.render(body)

  return {
    title,
    slug,
    author: author.map(blogAuthor),
    body,
    parsed,
    category,
    tags,
    featuredImage,
    date,
  }
}

export default blogPost
