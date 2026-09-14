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

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

const submitButton =
    document.getElementById("submitButton");


if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* Show sending message */

        if (formMessage) {

            formMessage.textContent =
                "Sending your enquiry...";

            formMessage.className =
                "form-message";

        }


        /* Disable button while sending */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Sending...";

        }


        try {

            /* Collect form data */

            const formData =
                new FormData(contactForm);


            /* Convert form data to JSON */

            const object =
                Object.fromEntries(formData);

            const json =
                JSON.stringify(object);


            /* Send to Web3Forms */

            const response =
                await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"
                        },

                        body: json
                    }
                );


            const result =
                await response.json();


            /* Successful submission */

            if (response.status === 200 && result.success) {

                if (formMessage) {

                    formMessage.textContent =
                        "Thank you. Your enquiry has been sent successfully.";

                    formMessage.className =
                        "form-message success";

                }


                /* Clear the form */

                contactForm.reset();


                /* Restore button */

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Send Enquiry";

                }


            } else {

                /* Web3Forms returned an error */

                if (formMessage) {

                    formMessage.textContent =
                        result.message ||
                        "Your enquiry could not be sent. Please try again.";

                    formMessage.className =
                        "form-message error";

                }


                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Send Enquiry";

                }

            }


        } catch (error) {

            console.error(
                "Web3Forms error:",
                error
            );


            if (formMessage) {

                formMessage.textContent =
                    "Something went wrong. Please try again or contact the advocate directly.";

                formMessage.className =
                    "form-message error";

            }


            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Send Enquiry";

            }

        }

    });

}