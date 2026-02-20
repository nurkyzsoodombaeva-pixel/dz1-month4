const postsContainer = document.querySelector('.posts-container');

const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        renderPosts(posts);
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        if (postsContainer) {
            postsContainer.innerHTML = '<h2>Failed to load posts. Please try again later.</h2>';
        }
    }
};

const renderPosts = (posts) => {
    if (!postsContainer) {
        console.error('Posts container not found!');
        return;
    }
    
    postsContainer.innerHTML = ''; 
    
    posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('post-card');
        
        card.innerHTML = `
            <img src="https://via.placeholder.com/300x200.png?text=Post+Image" alt="Post Image">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-body">${post.body}</p>
        `;
        
        postsContainer.appendChild(card);
    });
};

fetchPosts();
