/* Question And Answer Area */
const qnaContainer = document.querySelector(".qna");
const qnaArr = [
  {question : "How Does JavaScript Work?",
  answer : " The source code runs through a compiler system, which converts it to bytecode that the machine can understand and execute. JavaScript, on the other hand, does not require any compilation. Instead, a browser interpreter examines the JavaScript code, understands each line, and then executes it."
  },{
    question: "What does Event Loop do?",
    answer : " The Event Loop's main purpose is to keep track of the Call Stack and Callback Queue. If the Call Stack is empty, the first event in the queue will be processed and pushed to the top. It is effectively run by Call Stack. This type of iteration is required.In the Event Loop, this is referred to as a tick. Each event is nothing more than a function callback.",
  },{
    question : "What is the different between Local Storage and Session Storage?",
    answer : "LocalStorage and SessionStorage both are similar to store our data 'name' and 'value' pair. But the different is localstorage data not expired, if you open the same tab after 2 days, weeks of month - our data will exists. And in SessionStorage is is expired if we close our tab, our data not be avaiable in <bold class='text-bold'>storage </bold> - that's means It's work in Active session."
  }
];
const section = document.createElement("section");
section.classList.add("row");
section.classList.add("mt-4");
const title = document.createElement('h2');
title.innerHTML = "Questions and Answers";
title.classList.add("text-center");
section.appendChild(title);
const question = document.createElement("div");
question.classList.add("question");
qnaArr.forEach(eachQna => {
  const qnaItem = document.createElement("div");
  qnaItem.classList.add("question-item");
  qnaItem.innerHTML = `
    <h3> ${eachQna.question}</h3>
    <p> ${eachQna.answer} </p>  
  `;
  question.appendChild(qnaItem);
});
section.appendChild(question);
qnaContainer.appendChild(section);


let posts=[ ];

const likedPostsId = [];
const reportedPostsId = [];

const getLikedPosts = () => {
    return posts.filter((post) => likedPostsId.includes(post.id));
};

const getReportedPosts = () => {
    return posts.filter((post) => reportedPostsId.includes(post.id));
};

const isLiked = (id) => {
    return likedPostsId?.length && !!likedPostsId.includes(id);
};

const addToLiked = (id) => {
    likedPostsId.push(id); 
    return showPosts(posts);  
};

const reportPost = (id) => {
    reportedPostsId.push(id);
    const remainingPosts = posts.filter((post) => !reportedPostsId.includes(post.id));
    showPosts(remainingPosts);
};

const displayContent = (text) => {
    return text.length < 30 ? text : text.slice(0, 30) + "<span class='fw-bold text-info'>....learn more</span>";
};

const switchTab = (id) => {
    if (id === "posts") {
        document.getElementById( "posts" ).style.display = "grid";
        document.getElementById( "liked" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";
        qnaContainer.style.display = 'block';
    } else if (id === "liked") {
        document.getElementById( "liked" ).style.display = "block";
        qnaContainer.style.display = 'none';
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";

        displayLikedPosts();
    } else {
        document.getElementById( "reported" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "liked" ).style.display = "none";
        qnaContainer.style.display = 'none';
        displayReportedPosts();
    }
};

const createPost = (post) => {
    const image = post.image;
    const commentText = post?.comments[0]?.text;
    const commentUser = post?.comments[0]?.user;
    
    const userImg = post.userImage;
    // const {img, userImg, comments : {user,text}} = post;
    const div = document.createElement( "article" );
    div.classList.add( "post" );
    div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a
                    href="https://github.com/ProgrammingHero1"
                    target="_blank"
                    class="post__avatar"
                  >
                    <img src="${userImg}" alt="User Picture" />
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>

                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${image}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${post.id})">
                  <i class="fa-solid fa-heart ${isLiked(post.id) && "text-danger"}"></i>
                    
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>
                  

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right" onclick="reportPost(${
                      post.id
                  })">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>

                <div class="post__content">${displayContent(post.description)}</div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" />
                    </a>

                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a></span>
                  </div>

                  <hr/>

                  <div class="post__description">
                    <small>
                      <a class="post__name--underline" href="#">
                          ${commentUser}
                      </a>
                      ${commentText}
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
      `;
    return div;
};

const showPosts = (posts) => {
    const productsContainer = document.getElementById( "posts" );
    productsContainer.innerHTML = "";

    posts.forEach((post) => {
        const div = createPost(post);
        productsContainer.appendChild(div);
    });
  // productsContainer.appendChild(section);
};

const displayLikedPosts = () => {
    const likedPosts = getLikedPosts();
    if(likedPosts.length){
       document.getElementById( "liked" ).innerHTML = '';
    }
    likedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "liked" ).appendChild(div);
    });
};

const displayReportedPosts = () => {
    const reportedPosts = getReportedPosts();
    if(reportedPosts.length){
      document.getElementById( "reported" ).innerHTML = '';
    }
    reportedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "reported" ).appendChild(div);
    });
};

const loadPosts = async () =>{
  let data = await fetch('./data/posts.json');
  posts = await data.json();
  showPosts(posts);
}

loadPosts();