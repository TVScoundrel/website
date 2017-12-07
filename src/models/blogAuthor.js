const blogAuthor = author => {
  const { name, website, profilePhoto, biography, createdEntries } = author.fields
  return {
    name,
    website,
    profilePhoto,
    biography,
    createdEntries: createdEntries.map(entry => {
      const { title, slug, category, date } = entry.fields
      return { title, slug, category, date }
    }),
  }
}

export default blogAuthor
