const Blogs = require('../models/blogs');

exports.addBlogs =((req,res,next)=> {
    const blogTitle = req.body.blogTitle;
    const blogAuthor = req.body.blogAuthor;
    const blogContent = req.body.blogContent;

    Blogs.create({
        blogTitle: blogTitle,
        blogAuthor: blogAuthor,
        blogContent: blogContent
    }).then( result => {
        //console.log(result);
        console.group("created sucessfully");
        res.redirect('/');
      }).catch(err => {
        console.log(err);
      });
});

exports.getBlogs = ((req,res,next)=> {
    Blogs.findAll()
    .then (blogs =>{
        res.json(blogs);
    })
    .catch(err => console.log(err));
  });
  