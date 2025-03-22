document.addEventListener("DOMContentLoaded", function () {
    alert("Welcome to My Freelance Services!");
});
document.addEventListener("DOMContentLoaded", function() {
    let testimonials = document.querySelectorAll(".testimonial");
    let index = 0;

    function showNextTestimonial() {
        testimonials[index].classList.remove("active");
        index = (index + 1) % testimonials.length;
        testimonials[index].classList.add("active");
    }

    setInterval(showNextTestimonial, 3000); // Change testimonial every 3 seconds

    // Review Form Submission
    document.getElementById("testimonialForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let message = document.getElementById("message").value;

        if (name && message) {
            let newTestimonial = document.createElement("div");
            newTestimonial.classList.add("testimonial", "active");
            newTestimonial.innerHTML = `<p>⭐️⭐️⭐️⭐️⭐️</p><p>"${message}"</p><h4>- ${name}</h4>`;

            document.querySelector(".testimonial-carousel").appendChild(newTestimonial);
            document.getElementById("testimonialForm").reset();

            alert("Thank you for your review!");
        }
    });
});
// Submit Review
document.getElementById("testimonialForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let message = document.getElementById("message").value;

    let response = await fetch("http://127.0.0.1:1808/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message })
    });

    let result = await response.json();
    alert(result.message);
    document.getElementById("testimonialForm").reset();
});

// Fetch and Display Reviews
async function loadReviews() {
    let response = await fetch("http://127.0.0.1:1808/get-reviews");
    let reviews = await response.json();
    
    let container = document.querySelector(".testimonial-carousel");
    container.innerHTML = ""; // Clear old reviews

    reviews.forEach(review => {
        let div = document.createElement("div");
        div.classList.add("testimonial", "active");
        div.innerHTML = `<p>⭐️⭐️⭐️⭐️⭐️</p><p>"${review[1]}"</p><h4>- ${review[0]}</h4>`;
        container.appendChild(div);
    });
}

loadReviews();

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let name = document.getElementById("contact-name").value;
    let contact = document.getElementById("contact-info").value;
    let message = document.getElementById("contact-message").value;

    let response = await fetch("http://127.0.0.1:1808/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message })
    });

    let result = await response.json();
    alert(result.message);
    document.getElementById("contactForm").reset();
});
