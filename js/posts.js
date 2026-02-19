const postsContainer = document.querySelector('.posts-container');
let allPostsCache = []; 

const fetchPosts = async () => {
    console.log("Script works! Fetching posts...");
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        allPostsCache = posts; 
        renderPosts(posts);
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        if (postsContainer) {
            postsContainer.innerHTML = '<h2>Failed to load posts. Please try again later.</h2>';
        }
    }
};

const renderPosts = (posts) => {
    if (!postsContainer) return;
    postsContainer.innerHTML = ''; 
    posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('post-card');
        
        card.innerHTML = `
            <img src="https://picsum.photos/seed/${post.id}/300/200" alt="Post Image">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-body">${post.body}</p>
        `;
        const updateBtn = document.createElement('button');
        updateBtn.classList.add('action-btn', 'put-btn');
        updateBtn.textContent = 'put';
        card.appendChild(updateBtn);
        updateBtn.addEventListener('click', async (e) => {
    const postId = post.id;
    if (!postId) {
        alert('Чтобы обновить, введите ID поста в поле поиска по ID.');
        return;
    }

    const title = prompt("Введите новый заголовок поста:");
    const body = prompt("Введите новое содержимое поста:");

    if (!title || !body) return;

    try {
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ id: postId, title, body, userId: 1 }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const updatedPost = await response.json();
        console.log("Пост обновлен:", updatedPost);
        alert(`Пост ${updatedPost.id} успешно обновлен!`);
        // Обновляем пост в кэше и перерисовываем список
        const postIndex = allPostsCache.findIndex(p => p.id === updatedPost.id);
        if (postIndex > -1) allPostsCache[postIndex] = updatedPost;
        renderPosts(allPostsCache);
    } catch (error) {
        console.error("Ошибка при обновлении поста:", error);
    }
    });
        postsContainer.appendChild(card);
    });
};

fetchPosts();

// ----- Новый функционал: Поиск и Действия -----

const searchIdInput = document.querySelector('#search-id-input');
const searchIdBtn = document.querySelector('#search-id-btn');
const searchTitleInput = document.querySelector('#search-title-input');

const postBtn = document.querySelector('#post-btn');

const deleteBtn = document.querySelector('#delete-btn');

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// 1. Поиск по ID
searchIdBtn.addEventListener('click', async () => {
    const postId = searchIdInput.value.trim();
    if (!postId) {
        alert('Пожалуйста, введите ID поста.');
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${postId}`);
        if (!response.ok) {
            throw new Error(`Пост с ID ${postId} не найден.`);
        }
        const post = await response.json();
        postsContainer.innerHTML = ''; // Очищаем контейнер
        renderPosts([post]); // Отображаем только найденный пост
    } catch (error) {
        console.error("Ошибка при поиске поста по ID:", error);
        postsContainer.innerHTML = `<h2>${error.message}</h2>`;
    }
});

// 2. Поиск по названию (живой поиск)
searchTitleInput.addEventListener('input', () => {
    const searchTerm = searchTitleInput.value.trim().toLowerCase();
    const filteredPosts = allPostsCache.filter(post => post.title.toLowerCase().includes(searchTerm));
    renderPosts(filteredPosts);
});

// 3. POST-запрос (создание)
postBtn.addEventListener('click', async () => {
    const title = prompt("Введите заголовок поста:");
    const body = prompt("Введите содержимое поста:");

    if (!title || !body) {
        alert("Заголовок и содержимое не могут быть пустыми.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ title, body, userId: 1 }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const newPost = await response.json();
        console.log("Пост создан:", newPost);
        alert(`Пост создан с ID: ${newPost.id}`);
        // Добавляем новый пост в начало кэша и обновляем отображение
        allPostsCache.unshift(newPost);
        renderPosts(allPostsCache);
    } catch (error) {
        console.error("Ошибка при создании поста:", error);
    }
});

// 4. DELETE-запрос (удаление)
deleteBtn.addEventListener('click', async () => {
    const postId = searchIdInput.value.trim();
    if (!postId) {
        alert('Чтобы удалить, введите ID поста в поле поиска по ID.');
        return;
    }

    if (!confirm(`Вы уверены, что хотите удалить пост с ID ${postId}?`)) return;

    try {
        const response = await fetch(`${API_URL}/${postId}`, { method: 'DELETE' });
        if (response.ok) {
            console.log(`Пост ${postId} удален (симуляция).`);
            alert(`Пост ${postId} успешно удален!`);
            // Удаляем пост из кэша и обновляем UI
            allPostsCache = allPostsCache.filter(p => p.id !== parseInt(postId));
            renderPosts(allPostsCache);
        } else {
            throw new Error('Не удалось удалить пост.');
        }
    } catch (error) {
        console.error("Ошибка при удалении поста:", error);
    }
});
const putBtns = document.querySelectorAll('#put-btn');