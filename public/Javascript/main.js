const blogForm = document.getElementById('blogForm');
const blogPostsContainer = document.getElementById('blogPosts');

async function displayBlogs() {
    const blogs = await axios.get('http://localhost:3000/details');
    console.log(blogs);
    
   blogs.data.forEach(blogs => {
  
      const postBlock = document.createElement('div');
      postBlock.classList.add('blog-post');
  
      const postTitle = document.createElement('h3');
      postTitle.textContent = blogs.blogTitle;
  
      const postAuthor = document.createElement('p');
      postAuthor.textContent = `Author: ${blogs.blogAuthor}`;
    
  
      const postContent = document.createElement('p');
      postContent.textContent = `Content: ${blogs.blogContent}`;
  
      postTitle.addEventListener('click', function () {
        postContent.classList.toggle('expanded');
        postAuthor.classList.toggle('expanded');
      });
  
      postBlock.appendChild(postTitle);
      postBlock.appendChild(postAuthor);
      postBlock.appendChild(postContent);
  
      blogPostsContainer.appendChild(postBlock);
  
      blogForm.reset();




   });

}
displayBlogs();
