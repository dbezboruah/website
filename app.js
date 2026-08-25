const blogPosts = [
    {
      title: "ঈশ্বৰ কণা আৰু প্ৰেত কণা",
      image: "images/milky_way_neutrino.jpg",
      description: "A small description of what the blog is about",
      link: "neutrino.html",
      tag: "Science",
      author: "Dori Bezboruah",
      year: "2024"
    },
    {
      title: "অদ্ভুত কাহিনী",
      image: "story.jpeg",
      description: "A short story that will leave you wondering...",
      link: "story1.html",
      tag: "Fiction",
      author: "Dori Bezboruah",
      year: "2024"
    },
    {
      title: "সংস্কৃতি আৰু সময়",
      image: "story.jpeg",
      description: "Exploring Assamese heritage through narrative.",
      link: "culture.html",
      tag: "Culture",
      author: "Dori Bezboruah",
      year: "2024"
    }
  ];
  
  const cardSection = document.getElementById("cardSection");
  
  blogPosts.forEach(post => {
    cardSection.innerHTML += `
      <div class="card_container">
          <a href="${post.link}" class="card_image_container">
              <img src="${post.image}" alt="${post.title}" class="card_image" loading="lazy" />
          </a>
          <div class="card_title_container">
              <a href="${post.link}" class="card_title_anchor">
                  <h2 class="card_title">${post.title}</h2>
              </a>
              <p class="card_desc">${post.description}</p>
          </div>
          <div class="card_footer_container">
              <div class="author_container">
                  <div class="author_avatar_container">
                      <img src="https://api.dicebear.com/7.x/notionists/svg?seed=John&size=64" loading="lazy" class="author_avatar" alt="avatar" />
                  </div>
                  <div class="author_info_container">
                      <span class="author_name">${post.author}</span>
                      <span class="author_date">${post.year}</span>
                  </div>
              </div>
              <div class="card_tag_container">
                  <span>${post.tag}</span>
              </div>
          </div>
      </div>
    `;
  });
  