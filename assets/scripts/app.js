const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const fetchButton = document.querySelector("#available-posts button");
const form = document.querySelector("#new-post form");
const postList = document.querySelector("ul");

function sendHTTPRequest(method, url, data) {
  //   const promise = new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.setRequestHeader('Content-Type', 'application/json');
  //     xhr.open(method, url);
  //     xhr.responseType = "json";
  //     xhr.onload = function () {
  //         if (xhr.status >= 200 && xhr.status < 300) {
  //             resolve(xhr.response);
  //         } else {
  //             reject(new Error("Oops.. Something Went Wrong on the Server!"));
  //         }
  //     };
  //     xhr.onerror = function () {
  //       reject(new Error("Failed to Send the Request - Network Error!"));
  //     };
  //     xhr.send(JSON.stringify(data));
  //   });
  //   return promise;

  return fetch(url, {
    method,
    body: data,
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errData) => {
          console.log(errData);
          throw new Error("Oops.. Something Went Wrong on the Server!");
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something Went Wrong!");
    });
}

async function fetchPosts() {
  try {
    const responseData = await sendHTTPRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );
    const listOfPosts = responseData;
    for (const post of listOfPosts) {
      const postElement = document.importNode(postTemplate.content, true);
      postElement.querySelector("h2").textContent = post.title.toUpperCase();
      postElement.querySelector("p").textContent = post.body;
      postElement.querySelector("li").id = post.id;
      listElement.append(postElement);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title,
    body: content,
    userId,
  };
  const fd = new FormData(form);
  fd.append('userId', userId);
  sendHTTPRequest("POST", "https://jsonplaceholder.typicode.com/posts", fd);
}

fetchButton.addEventListener("click", fetchPosts);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  createPost(enteredTitle, enteredContent);
});

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    sendHTTPRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
