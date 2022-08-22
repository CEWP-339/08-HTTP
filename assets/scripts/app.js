const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

function sendHTTPRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.onload = function() {
            resolve(xhr.response);
        }
        xhr.send(JSON.stringify(data));
    });
    return promise;
}

async function fetchPosts() {
    const responseData = await sendHTTPRequest('GET', 'https://jsonplaceholder.typicode.com/posts');
    const listOfPosts = responseData;
    for (const post of listOfPosts) {
        const postElement = document.importNode(postTemplate.content, true);
        postElement.querySelector('h2').textContent = post.title.toUpperCase();
        postElement.querySelector('p').textContent = post.body;
        listElement.append(postElement);
    }
}

async function createPost(title, content) {
    const userId = Math.random();
    const post = {
        title,
        body: content,
        userId
    }
    sendHTTPRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

fetchPosts();
createPost("DUMMY", "This is a dummy post");




