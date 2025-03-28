const apiUrl = "http://localhost:3000/api/blogs";

// Fetch blogs on page load
document.addEventListener("DOMContentLoaded", fetchBlogs);

async function fetchBlogs() {
  try {
    const response = await fetch(apiUrl);
    const blogs = await response.json();
    const blogList = document.getElementById("blogList");
    blogList.innerHTML = "";

    blogs.forEach(blog => {
      const blogCard = document.createElement("div");
      blogCard.className = "col-md-4";
      blogCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${blog.title}</h5>
            <p class="card-text">By ${blog.author}</p>
            <a href="blog.html?id=${blog._id}" class="btn btn-read">Read More</a>
          </div>
        </div>
      `;
      blogList.appendChild(blogCard);
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

// Handle blog submission
document.getElementById("blogForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    content: document.getElementById("content").value,
  };

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  document.getElementById("blogForm").reset();
  fetchBlogs();
});
