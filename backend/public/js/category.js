const blogSection = document.querySelector('.blogs-section');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {

        // console.log(decodeURI(location.pathname.split("/").pop()));
        // console.log(blog.data().category);
        


        if(blog.data().category == decodeURI(location.pathname.split("/").pop()))
            {
                if(blog.id != decodeURI(location.pathname.split("/").pop())){
                    createBlog(blog);
                }
            }
       
    })
})

const createBlog = (blog) => {

        // console.log('asdasdsd');
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}