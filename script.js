/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });


    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

}


/* =====================================================
   PROJECT SLIDER
===================================================== */

const slidesContainer =
    document.getElementById("slides");

const slides =
    document.querySelectorAll(".slide");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const dotsContainer =
    document.getElementById("dots");

let currentSlide = 0;


/* =====================================================
   CREATE DOTS
===================================================== */

if (dotsContainer && slides.length > 0) {

    slides.forEach((slide, index) => {

        const dot =
            document.createElement("button");

        dot.classList.add("dot");

        dot.setAttribute(
            "aria-label",
            "Go to project " + (index + 1)
        );

        dot.addEventListener("click", () => {

            currentSlide = index;

            updateSlider();

            restartAutoSlide();

        });

        dotsContainer.appendChild(dot);

    });

}


const dots =
    document.querySelectorAll(".dot");


/* =====================================================
   UPDATE SLIDER
===================================================== */

function updateSlider() {

    if (!slidesContainer) {
        return;
    }

    slidesContainer.style.transform =
        `translateX(-${currentSlide * 100}%)`;


    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}


/* =====================================================
   NEXT
===================================================== */

function nextSlide() {

    if (!slides.length) {
        return;
    }

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    updateSlider();

}


/* =====================================================
   PREVIOUS
===================================================== */

function previousSlide() {

    if (!slides.length) {
        return;
    }

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide =
            slides.length - 1;

    }

    updateSlider();

}


/* =====================================================
   BUTTON EVENTS
===================================================== */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        () => {

            nextSlide();

            restartAutoSlide();

        }
    );

}


if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        () => {

            previousSlide();

            restartAutoSlide();

        }
    );

}


/* =====================================================
   INITIAL SLIDER
===================================================== */

updateSlider();


/* =====================================================
   FULLSCREEN IMAGE VIEWER
===================================================== */

const lightbox =
    document.getElementById(
        "imageLightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );

const lightboxCounter =
    document.getElementById(
        "lightboxCounter"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );

const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );

const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );

let lightboxIndex = 0;


/* =====================================================
   PROJECT TITLES
===================================================== */

const projectTitles = [

    "Login Page",

    "Front Office Dashboard",

    "Housekeeping Dashboard",

    "Food & Beverage Dashboard",

    "Back Office Dashboard",

    "Guest Information",

    "System Reports"

];


/* =====================================================
   OPEN LIGHTBOX
===================================================== */

function openLightbox(index) {

    if (
        !lightbox ||
        !slides[index]
    ) {

        return;

    }


    lightboxIndex = index;


    const image =
        slides[index].querySelector(
            ".project-image"
        );


    if (!image) {

        return;

    }


    lightboxImage.src =
        image.src;

    lightboxImage.alt =
        image.alt;


    lightboxTitle.textContent =
        projectTitles[index] ||
        image.alt;


    lightboxCounter.textContent =
        `${index + 1} / ${slides.length}`;


    lightbox.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

    if (!lightbox) {

        return;

    }

    lightbox.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* =====================================================
   PROJECT IMAGE CLICK
===================================================== */

slides.forEach((slide, index) => {

    const image =
        slide.querySelector(
            ".project-image"
        );


    if (!image) {

        return;

    }


    image.addEventListener(
        "click",
        () => {

            openLightbox(index);

        }
    );

});


/* =====================================================
   LIGHTBOX CLOSE
===================================================== */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/* =====================================================
   LIGHTBOX PREVIOUS
===================================================== */

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            lightboxIndex--;


            if (lightboxIndex < 0) {

                lightboxIndex =
                    slides.length - 1;

            }


            openLightbox(
                lightboxIndex
            );

        }
    );

}


/* =====================================================
   LIGHTBOX NEXT
===================================================== */

if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            lightboxIndex++;


            if (
                lightboxIndex >=
                slides.length
            ) {

                lightboxIndex = 0;

            }


            openLightbox(
                lightboxIndex
            );

        }
    );

}


/* =====================================================
   CLICK OUTSIDE IMAGE
===================================================== */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox ||
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowLeft") {

            lightboxIndex--;


            if (lightboxIndex < 0) {

                lightboxIndex =
                    slides.length - 1;

            }


            openLightbox(
                lightboxIndex
            );

        }


        if (event.key === "ArrowRight") {

            lightboxIndex++;


            if (
                lightboxIndex >=
                slides.length
            ) {

                lightboxIndex = 0;

            }


            openLightbox(
                lightboxIndex
            );

        }

    }
);


/* =====================================================
   AUTO SLIDER
===================================================== */

let autoSlide = null;


function startAutoSlide() {

    clearInterval(autoSlide);


    autoSlide = setInterval(() => {

        if (
            document.hidden ||
            (
                lightbox &&
                lightbox.classList.contains(
                    "active"
                )
            )
        ) {

            return;

        }


        nextSlide();

    }, 6000);

}


function restartAutoSlide() {

    startAutoSlide();

}


startAutoSlide();


/* =====================================================
   PAUSE SLIDER ON HOVER
===================================================== */

const projectSlider =
    document.querySelector(
        ".project-slider"
    );


if (projectSlider) {

    projectSlider.addEventListener(
        "mouseenter",
        () => {

            clearInterval(
                autoSlide
            );

        }
    );


    projectSlider.addEventListener(
        "mouseleave",
        () => {

            startAutoSlide();

        }
    );

}


/* =====================================================
   TOUCH / SWIPE SUPPORT
===================================================== */

let touchStartX = 0;
let touchEndX = 0;


if (projectSlider) {

    projectSlider.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    projectSlider.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX -
                touchEndX;


            if (
                Math.abs(difference) < 50
            ) {

                return;

            }


            if (difference > 0) {

                nextSlide();

            } else {

                previousSlide();

            }


            restartAutoSlide();

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "show"
            );

        }
    );

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-menu a"
    );


if (
    "IntersectionObserver"
    in window
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            navLinks.forEach(
                                link => {

                                    link.classList.remove(
                                        "active"
                                    );

                                }
                            );


                            const activeLink =
                                document.querySelector(
                                    `.nav-menu a[href="#${entry.target.id}"]`
                                );


                            if (
                                activeLink
                            ) {

                                activeLink.classList.add(
                                    "active"
                                );

                            }

                        }

                    }
                );

            },
            {
                threshold: 0.3
            }
        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =====================================================
   PREVENT LIGHTBOX IMAGE DRAG
===================================================== */

if (lightboxImage) {

    lightboxImage.addEventListener(
        "dragstart",
        event => {

            event.preventDefault();

        }
    );

}


/* =====================================================
   PAGE READY
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateSlider();

    }
);