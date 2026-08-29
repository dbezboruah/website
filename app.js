/* =========================================================
   BEBERIBANG BLOG
   Load posts from posts.json
   ========================================================= */

const POSTS_FILE = "./posts.json";


/* =========================================================
   LOAD POSTS
   ========================================================= */

async function loadPosts() {

    const blogList =
        document.getElementById("blogList");

    try {

        const response =
            await fetch(
                POSTS_FILE + "?t=" + Date.now()
            );


        if (!response.ok) {

            throw new Error(
                "Could not load posts.json. Status: "
                + response.status
            );

        }


        const posts =
            await response.json();


        console.log(
            "Posts loaded:",
            posts
        );


        if (
            !Array.isArray(posts) ||
            posts.length === 0
        ) {

            blogList.innerHTML = `
                <p class="no-posts">
                    No posts available.
                </p>
            `;

            return;

        }


        /* Show the posts */

        blogList.innerHTML = "";


        posts.forEach(
            post => {

                blogList.appendChild(
                    createPost(post)
                );

            }
        );


    } catch (error) {

        console.error(
            "Blog loading error:",
            error
        );


        blogList.innerHTML = `

            <div class="error-message">

                <p>
                    Unable to load posts.
                </p>

                <small>
                    ${escapeHTML(error.message)}
                </small>

            </div>

        `;

    }

}


/* =========================================================
   CREATE POST PREVIEW
   ========================================================= */

function createPost(post) {

    const article =
        document.createElement("article");


    article.className =
        "post_preview";


    const title =
        post.title || "Untitled";


    const date =
        formatDate(post.date);


    const excerpt =
        post.excerpt || "";


    article.innerHTML = `

        <div class="post_preview_date">
            ${date}
        </div>


        <h2 class="post_preview_title">
            ${escapeHTML(title)}
        </h2>


        <div class="post_preview_excerpt">
            ${escapeHTML(excerpt)}
        </div>


        <a
            href="#post-${encodeURIComponent(post.id)}"
            class="read_link">

            Read →

        </a>

    `;


    article
        .querySelector(".read_link")
        .addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showPost(post);

            }
        );


    return article;

}


/* =========================================================
   SHOW FULL POST
   ========================================================= */

function showPost(post) {

    const blogList =
        document.getElementById("blogList");

    const articleView =
        document.getElementById("articleView");


    blogList.style.display =
        "none";


    articleView.style.display =
        "block";


    articleView.innerHTML = `

        <article class="article">


            <a
                href="#"
                class="back_link"
                onclick="showAllPosts(); return false;">

                ← All posts

            </a>


            <div class="article_date">

                ${formatDate(post.date)}

            </div>


            <h1 class="article_title">

                ${escapeHTML(post.title)}

            </h1>


            <div class="article_content">

                ${post.content || ""}

            </div>


            <div class="article_bottom">

                <a
                    href="#"
                    class="back_link"
                    onclick="showAllPosts(); return false;">

                    ← Back to all posts

                </a>

            </div>


        </article>

    `;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SHOW ALL POSTS
   ========================================================= */

function showAllPosts() {

    const blogList =
        document.getElementById("blogList");

    const articleView =
        document.getElementById("articleView");


    articleView.style.display =
        "none";


    blogList.style.display =
        "block";


    window.location.hash =
        "";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "";

    }


    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-IN",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================================
   START
   ========================================================= */

loadPosts();
