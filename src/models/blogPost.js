import blogAuthor from './blogAuthor'

const blogPost = post => {
  const { title, slug, author, body, category, tags, featuredImage, date } = post.fields
  return {
    title,
    slug,
    author: author.map(blogAuthor),
    body,
    category,
    tags,
    featuredImage,
    date,
  }
}

export default blogPost
