/* =========================================================
   AUTOMATIC GALLERY
   ========================================================= */

async function loadGallery() {

    const gallery =
        document.getElementById("gallery");


    if (!gallery) {
        return;
    }


    try {

        const response =
            await fetch(
                "./gallery.json?t=" +
                Date.now()
            );


        if (!response.ok) {

            throw new Error(
                "Could not load gallery.json"
            );

        }


        const photos =
            await response.json();


        gallery.innerHTML = "";


        if (
            !Array.isArray(photos) ||
            photos.length === 0
        ) {

            gallery.innerHTML = `
                <p class="gallery-empty">
                    No photographs yet.
                </p>
            `;

            return;
        }


        photos.forEach(
            photo => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "gallery-item";


                item.innerHTML = `

                    <img
                        src="${photo.src}"
                        alt="${photo.filename}"
                        loading="lazy"
                    >

                `;


                gallery.appendChild(item);

            }
        );


    } catch (error) {

        console.error(
            "Gallery error:",
            error
        );


        gallery.innerHTML = `

            <p class="gallery-error">

                Unable to load gallery.

            </p>

        `;

    }

}


/* =========================================================
   START
   ========================================================= */

loadGallery();