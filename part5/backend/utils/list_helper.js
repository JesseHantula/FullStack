const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const mostLikes = (blogs) => {
    const blogLikes = blogs.map(blog => blog.likes)
    return blogs[blogLikes.indexOf(Math.max(...blogLikes))]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const blogAuthors = blogs.map(blog => blog.author)

    const getBlogAuthorCounts = blogAuthors.reduce((authorCounts, author) => {
        authorCounts[author] = (authorCounts[author] || 0) + 1
        return authorCounts
    }, {})

    let mostBlogsAuthor = ''
    let mostBlogsCount = 0

    for (const author in getBlogAuthorCounts) {
        if (getBlogAuthorCounts[author] > mostBlogsCount) {
            mostBlogsAuthor = author 
            mostBlogsCount = getBlogAuthorCounts[author]
        }
    }

    return {
        author: mostBlogsAuthor,
        blogs: mostBlogsCount
    }
}

const mostLikedAuthor = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const blogAuthors = blogs.map(blog => ({ author: blog.author, likes: blog.likes }))

    const getBlogAuthorCounts = blogAuthors.reduce((authorCounts, blog) => {
        authorCounts[blog.author] = (authorCounts[blog.author] || 0) + blog.likes
        return authorCounts
    }, {})

    let mostLikesAuthor = ''
    let mostLikesCount = 0

    for (const author in getBlogAuthorCounts) {
        if (getBlogAuthorCounts[author] > mostLikesCount) {
            mostLikesAuthor = author
            mostLikesCount = getBlogAuthorCounts[author]
        }
    }

    return {
        author: mostLikesAuthor,
        likes: mostLikesCount
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    mostBlogs,
    mostLikedAuthor
}