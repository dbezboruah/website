/* =========================================================
   BEBERIBANG BLOG
   Blogger content displayed on GitHub Pages
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
                "Could not load posts.json. Status: " +
                response.status
            );

        }


        const posts =
            await response.json();


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


        /* Store posts globally */

        window.blogPosts = posts;


        /* Display the grid */

        showAllPosts();


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
   DISPLAY ALL POSTS
   ========================================================= */

function showAllPosts() {

    const blogList =
        document.getElementById("blogList");

    const articleView =
        document.getElementById("articleView");


    /* Hide article */

    articleView.style.display =
        "none";


    /* Show blog grid */

    blogList.style.display =
        "grid";


    /* Clear current grid */

    blogList.innerHTML = "";


    /* Make sure posts exist */

    if (
        !window.blogPosts ||
        window.blogPosts.length === 0
    ) {

        blogList.innerHTML = `
            <p class="no-posts">
                No posts available.
            </p>
        `;

        return;

    }


    /* Create cards */

    window.blogPosts.forEach(
        post => {

            blogList.appendChild(
                createPost(post)
            );

        }
    );


    /* Remove article hash */

    if (
        window.location.hash
    ) {

        history.replaceState(
            null,
            "",
            window.location.pathname
        );

    }


    /* Return to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   CREATE POST CARD
   ========================================================= */

function createPost(post) {

    const article =
        document.createElement("article");


    article.className =
        "post_preview";


    const title =
        post.title ||
        "Untitled";


    const date =
        formatDate(post.date);


    const excerpt =
        post.excerpt ||
        "";


    article.innerHTML = `

        <div>

            <div class="post_preview_date">

                ${date}

            </div>


            <h2 class="post_preview_title">

                ${escapeHTML(title)}

            </h2>


            <div class="post_preview_excerpt">

                ${escapeHTML(excerpt)}

            </div>

        </div>


        <a
            href="#post-${encodeURIComponent(post.id)}"
            class="read_link">

            Read story →

        </a>

    `;


    /* Click event */

    article
        .querySelector(".read_link")
        .addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                history.pushState(
                    null,
                    "",
                    "#post-" +
                    encodeURIComponent(post.id)
                );


                showPost(post);

            }
        );


    return article;

}


/* =========================================================
   SHOW SINGLE ARTICLE
   ========================================================= */

function showPost(post) {

    const blogList =
        document.getElementById("blogList");

    const articleView =
        document.getElementById("articleView");


    /* Hide grid */

    blogList.style.display =
        "none";


    /* Show article */

    articleView.style.display =
        "block";


    articleView.innerHTML = `

        <article class="article">


            <a
                href="#"
                class="back_link"
                id="backTop">

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
                    id="backBottom">

                    ← Back to all posts

                </a>

            </div>


        </article>

    `;


    /* Back links */

    document
        .getElementById("backTop")
        .addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showAllPosts();

            }
        );


    document
        .getElementById("backBottom")
        .addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showAllPosts();

            }
        );


    /* Go to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   BROWSER BACK BUTTON
   ========================================================= */

window.addEventListener(
    "popstate",
    function() {

        handleURL();

    }
);


/* =========================================================
   HANDLE URL
   ========================================================= */

function handleURL() {

    if (
        !window.blogPosts
    ) {

        return;

    }


    const hash =
        window.location.hash;


    if (
        hash.startsWith("#post-")
    ) {

        const id =
            decodeURIComponent(
                hash.substring(6)
            );


        const post =
            window.blogPosts.find(
                item =>
                    item.id === id
            );


        if (post) {

            showPost(post);

            return;

        }

    }


    showAllPosts();

}


/* =========================================================
   DATE
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

