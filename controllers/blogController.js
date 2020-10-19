const Blog = require('../models/blogModel');

const getData = Blog.find({}).sort({ createdAt: -1 });
// display all blogs
const get_blogs = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
                    .then((result) => {
                        res.render('add-blog', { blogs: result, success: ""});
                    })
                    .catch((err) =>{
                        console.log(err);   
                    });
    // res.redirect( req.originalUrl)
}

// add a blog
const post_blogs = (req, res) => {
    const blogDetails = new Blog({
        title: req.body.title,
        desc: req.body.desc,
        genre: req.body.genre,
        image: req.file.filename
    });

    blogDetails.save((err, doc) => {
        if(err) throw err;
        getData.exec((err, data) => {
            res.render("add-blog", {blogs: data, success: "Blog inserted"});
        });
    });     
}

// edit a blog according to its id
const edit_blog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('edit-blog', { blog: blog} );
}

// update blog
const update_blog = (req, res) => {
    if(req.file){
        var blogDetails = {
            title: req.body.title,
            desc: req.body.desc,
            genre: req.body.genre,
            image: req.file.filename
            
        }
    } else{
        var blogDetails = {
            title: req.body.title,
            desc: req.body.desc,
            genre: req.body.genre,
        }
    }

    const updateBlog = Blog.findByIdAndUpdate(req.body.id, blogDetails);
    updateBlog.exec((err, data) => {
        if(err) throw err;
        getData.exec((err, data) => {
            res.render("add-blog", {blogs: data, success: "Blog updated"});
        });
    });
}

// delete blog

const delete_blog = (req, res) => {
    const blog_id = req.params.id;
    const deleteBlog = Blog.findByIdAndDelete(blog_id);
    deleteBlog.exec((err, data) => {
        if(err) throw err;
        getData.exec((err, data) => {
            res.render("add-blog", {blogs: data, success: "Blog Deleted"});
        });
    });
}

module.exports = {
    get_blogs,
    post_blogs,
    edit_blog,
    update_blog,
    delete_blog
}