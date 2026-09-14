/* =========================
   MOBILE NAVIGATION
========================= */

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

if (hamburger && mobileNav) {

    hamburger.addEventListener("click", (event) => {

        event.stopPropagation();

        mobileNav.classList.toggle("active");

        const isOpen =
            mobileNav.classList.contains("active");

        hamburger.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Close mobile menu after clicking a link */

    const mobileLinks =
        document.querySelectorAll(".mobile-nav a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Close mobile menu when clicking outside */

    document.addEventListener("click", (event) => {

        const isMenuOpen =
            mobileNav.classList.contains("active");

        const clickedInsideMenu =
            mobileNav.contains(event.target);

        const clickedHamburger =
            hamburger.contains(event.target);

        if (
            isMenuOpen &&
            !clickedInsideMenu &&
            !clickedHamburger
        ) {

            mobileNav.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================
   NAVBAR ON SCROLL
========================= */

const navbar =
    document.getElementById("navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 5px 25px rgba(0,0,0,0.06)";

        } else {

            navbar.style.boxShadow = "none";

        }

    });

}


/* =========================
   FAQ
========================= */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");

    if (!question || !answer) return;


    question.addEventListener("click", () => {

        const isActive =
            item.classList.contains("active");


        /* Close all FAQ items */

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            if (otherAnswer) {

                otherAnswer.style.maxHeight = null;

            }

        });


        /* Open selected FAQ */

        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* =========================
   CONTACT FORM
========================= */

/*
   The contact form is submitted directly
   to Web3Forms.

   Do NOT use event.preventDefault()
   here because it would stop the form
   from being submitted.
*/

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm && formMessage) {

    contactForm.addEventListener("submit", () => {

        formMessage.textContent =
            "Sending your enquiry...";

    });

}