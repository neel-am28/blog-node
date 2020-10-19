const Blog = require("../models/blogModel");

const getData = Blog.find({}).sort({ createdAt: -1 });

// display all bogs
const get_blogs = (req, res) => {
    getData.exec()
            .then((result) => {
                // get the genres(we have duplicate genres stored in db)
                const genres = result.map(obj => obj.genre);
                // extract unique genres from array of genres
                const uniquGenres = [...new Set(genres)];
                res.render('blogView', { blogs: result, genres: uniquGenres});
            })
            .catch((err) => {
                console.log(err);   
            });
}

// render a blog according to its slug
const get_blog_with_slug = (req, res) => {
    const slug = req.params.slug;
    Blog.find({ slug: slug })
        .then((result) => {            
            const genre = result.genre;
            const slug = result.slug;
            Blog.find({ slug: {$nin: slug}, genre: genre})
                    .then((relatedData) => {
                        res.render('showView', {relatedBlogs: relatedData, blog: result });
                    })
                })
                .catch((err) => {
                    console.log(err);   
                });
}
            

module.exports = {
    get_blogs,
    get_blog_with_slug
}
