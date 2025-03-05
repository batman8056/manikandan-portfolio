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
    // playGlassBreak(); //sound effect disable 
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

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    canvas.id = "neuralCanvas";
    document.getElementById("home").appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const numParticles = 150;
    const maxDistance = 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off walls
            if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
            if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff85";
            ctx.fill();
            ctx.closePath();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.strokeStyle = `rgba(0, 255, 204, ${1 - distance / maxDistance})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawConnections();
        requestAnimationFrame(animate);
    }

    createParticles();
    animate();

    // Resize canvas on window resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    });
});


document.addEventListener("scroll", function () {
    const homeSection = document.getElementById("home");
    const scrollPosition = window.scrollY;
    const triggerPoint = window.innerHeight * 0.1; // 10% from the top

    if (scrollPosition > 50) {
        homeSection.classList.add("hidden"); // Slide down
    } else {
        homeSection.classList.remove("hidden"); // Reset when scrolling up
    }
});

document.addEventListener("scroll", function () {
    const aboutSection = document.getElementById("about");
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.1; // 10% from the top

    if (aboutPosition < triggerPoint) {
        aboutSection.classList.add("hidden"); // Slide down
    } else {
        aboutSection.classList.remove("hidden"); // Reset when scrolling up
    }
});


