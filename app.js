/* =========================================================
   BEBERIBANG
   BLOG FRONT-END
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const POSTS_FILE = "posts.json";


/* =========================================================
   ELEMENTS
   ========================================================= */

const blogList =
    document.getElementById("blogList");

const articleView =
    document.getElementById("articleView");


/* =========================================================
   LOAD POSTS
   ========================================================= */

async function loadPosts() {

    try {

        const response =
            await fetch(
                `${POSTS_FILE}?t=${Date.now()}`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load posts"
            );

        }


        const posts =
            await response.json();


        displayPosts(posts);


        /* Check whether an article was requested */

        const hash =
            window.location.hash;


        if (hash.startsWith("#post-")) {

            const id =
                decodeURIComponent(
                    hash.substring(6)
                );


            showArticle(
                posts,
                id
            );

        }


    } catch (error) {

        console.error(error);


        blogList.innerHTML = `

            <p class="error-message">
                Unable to load posts.
            </p>

        `;

    }

}


/* =========================================================
   DISPLAY BLOG LIST
   ========================================================= */

function displayPosts(posts) {

    blogList.innerHTML = "";


    posts.forEach(post => {

        const card =
            document.createElement("article");


        card.className =
            "post_preview";


        card.innerHTML = `

            <div class="post_preview_date">

                ${formatDate(post.date)}

            </div>


            <h2 class="post_preview_title">

                ${escapeHTML(post.title)}

            </h2>


            <div class="post_preview_excerpt">

                ${post.excerpt}

            </div>


            <a
                href="#post-${encodeURIComponent(post.id)}"
                class="read_link"
                data-post-id="${escapeHTML(post.id)}">

                Read →

            </a>

        `;


        blogList.appendChild(card);

    });


    /* Attach click events */

    document
        .querySelectorAll(".read_link")
        .forEach(link => {

            link.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();


                    const id =
                        this.dataset.postId;


                    showArticle(
                        posts,
                        id
                    );


                    window.history.pushState(
                        null,
                        "",
                        `#post-${encodeURIComponent(id)}`
                    );

                }
            );

        });

}


/* =========================================================
   SHOW ARTICLE
   ========================================================= */

function showArticle(posts, id) {

    const post =
        posts.find(
            item => item.id === id
        );


    if (!post) {

        return;

    }


    /* Hide blog list */

    blogList.style.display =
        "none";


    /* Show article */

    articleView.style.display =
        "block";


    articleView.innerHTML = `

        <article class="article">


            <a
                href="blog.html"
                class="back_link">

                ← All posts

            </a>


            <div class="article_date">

                ${formatDate(post.date)}

            </div>


            <h1 class="article_title">

                ${escapeHTML(post.title)}

            </h1>


            <div class="article_content">

                ${post.content}

            </div>


            <div class="article_bottom">

                <a
                    href="blog.html"
                    class="back_link">

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
   BROWSER BACK BUTTON
   ========================================================= */

window.addEventListener(
    "popstate",
    function() {

        loadPosts();

    }
);


/* =========================================================
   HASH CHANGE
   ========================================================= */

window.addEventListener(
    "hashchange",
    function() {

        loadPosts();

    }
);


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(dateString) {

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

