document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav ul li a");
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 110,
                behavior: "smooth"
            });
        });
    });
    
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

let index = 0;
const glassBreakSound = document.getElementById("glassBreak");
const slider = document.querySelector(".slider");
let isSliderVisible = true; // Track visibility

// Check if the slider is in the viewport
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        isSliderVisible = entry.isIntersecting;
    });
}, { threshold: 0.5 }); // Trigger when at least 50% of the slider is visible

observer.observe(slider);

// Play sound only if slider is visible
function playGlassBreak() {
    if (isSliderVisible) {
        glassBreakSound.currentTime = 0;
        glassBreakSound.play();
    }
}

function showSlide(n) {
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slide").length;
    index = (n + totalSlides) % totalSlides;
    slides.style.transform = `translateX(${-index * 100}%)`;
    playGlassBreak();
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

// Automatic sliding every 4 seconds (only if slider is visible)
setInterval(() => {
    if (isSliderVisible) {
        nextSlide();
    }
}, 4000);

document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.querySelector("nav ul");

    // Toggle menu on button click
    navToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove("active");
        }
    });
})