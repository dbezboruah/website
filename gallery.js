/* =========================================================
   AUTOMATIC GALLERY + LIGHTBOX
   ========================================================= */

async function loadGallery() {

    const gallery =
        document.getElementById("gallery");

    if (!gallery) return;

    try {

        const response =
            await fetch(
                "./gallery.json?t=" + Date.now()
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

        photos.forEach((photo, index) => {

            const item =
                document.createElement("div");

            item.className =
                "gallery-item";

            item.innerHTML = `
                <button
                    type="button"
                    class="gallery-photo-button"
                    aria-label="Open photograph">

                    <img
                        src="${photo.src}"
                        alt="${photo.filename}"
                        loading="lazy">

                </button>
            `;

            item
                .querySelector(
                    ".gallery-photo-button"
                )
                .addEventListener(
                    "click",
                    () => openLightbox(
                        photos,
                        index
                    )
                );

            gallery.appendChild(item);

        });

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
   LIGHTBOX
   ========================================================= */

function openLightbox(photos, index) {

    const photo =
        photos[index];

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    const image =
        document.getElementById(
            "lightboxImage"
        );

    image.src =
        photo.src;

    image.alt =
        photo.filename;

    lightbox.classList.add(
        "lightbox-visible"
    );

    document.body.classList.add(
        "lightbox-open"
    );

    lightbox.dataset.index =
        index;
}


/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeLightbox() {

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    lightbox.classList.remove(
        "lightbox-visible"
    );

    document.body.classList.remove(
        "lightbox-open"
    );
}


/* =========================================================
   LIGHTBOX CONTROLS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const lightbox =
            document.getElementById(
                "galleryLightbox"
            );

        const closeButton =
            document.getElementById(
                "lightboxClose"
            );


        if (!lightbox) return;


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        /* Click outside photograph */

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );


        /* Escape key */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeLightbox();

                }

            }
        );

    }
);


/* =========================================================
   START
   ========================================================= */

loadGallery();
