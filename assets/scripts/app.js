const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

console.log(xhr.response); //this will not work.

xhr.responseType = 'json';

xhr.onload = function() {
    // const listOfPosts = JSON.parse(xhr.response);
    const listOfPosts = xhr.response;
    for (const post of listOfPosts) {
        console.log(post);
    }
}

xhr.send();