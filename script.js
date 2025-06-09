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
let isScrolling = false;
let isHomeVisible = true; // Track home visibility
const glassBreakSound = document.getElementById("glassBreak");
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;
let slideInterval;

// Function to play glass break sound only if home is visible and not scrolling
function playGlassBreak() {
    if (!isScrolling && isHomeVisible) {
        glassBreakSound.currentTime = 0;
        glassBreakSound.play();
    }
}

// Function to stop glass break sound
function stopGlassBreak() {
    glassBreakSound.pause();
    glassBreakSound.currentTime = 0;
}

// Function to show slide with sound effect
function showSlide(n) {
    index = (n + totalSlides) % totalSlides;
    slides.style.transform = `translateX(${-index * 100}%)`;
    playGlassBreak(); // Play sound only if conditions are met
}

// Next and previous slide functions
function nextSlide() {
    showSlide(index + 1);
}
function prevSlide() {
    showSlide(index - 1);
}

// Function to start auto-sliding if home is visible
function startAutoSlide() {
    if (!slideInterval) {
        slideInterval = setInterval(() => {
            if (isHomeVisible && !isScrolling) {
                nextSlide();
            }
        }, 4000);
        
        // Play sound when the first slide starts
        playGlassBreak();
    }
}

// Function to stop auto-sliding and sound
function stopAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = null;
    stopGlassBreak(); // Stop the glass break sound when home slides down
}

// Detect scrolling and update home visibility
document.addEventListener("scroll", function () {
    isScrolling = true;

    // Check if the home section is visible
    const homeSection = document.getElementById("home");
    const homePosition = homeSection.getBoundingClientRect();
    isHomeVisible = homePosition.top >= 0 && homePosition.bottom <= window.innerHeight;

    // Start or stop the slider based on home visibility
    if (isHomeVisible) {
        startAutoSlide();
    } else {
        stopAutoSlide();
    }

    // Reset scrolling state after a delay
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 500);
});

// Start the slider when the page loads
startAutoSlide();




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
    const numParticles = 200;
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
            if (this.x <= 2 || this.x >= canvas.width) this.vx *= -1;
            if (this.y <= 2 || this.y >= canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 1);
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
                    ctx.strokeStyle = `rgba(0, 0, 0, ${1 - distance / maxDistance})`;
                    ctx.lineWidth = 0.8;
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
    const aboutSection = document.getElementById("projects");
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.1; // 10% from the top

    if (aboutPosition < triggerPoint) {
        aboutSection.classList.add("hidden"); // Slide down
    } else {
        aboutSection.classList.remove("hidden"); // Reset when scrolling up
    }
});
document.addEventListener("scroll", function () {
    const aboutSection = document.getElementById("skills");
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.1; // 10% from the top

    if (aboutPosition < triggerPoint) {
        aboutSection.classList.add("hidden"); // Slide down
    } else {
        aboutSection.classList.remove("hidden"); // Reset when scrolling up
    }
});
document.addEventListener("scroll", function () {
    const aboutSection = document.getElementById("experience");
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * -0.3; // 20% from the top

    if (aboutPosition < triggerPoint) {
        aboutSection.classList.add("hidden"); // Slide down
    } else {
        aboutSection.classList.remove("hidden"); // Reset when scrolling up
    }
});
// document.addEventListener("scroll", function () {
//     const aboutSection = document.getElementsByClassName("mobexperience");
//     const aboutPosition = aboutSection.getBoundingClientRect().top;
//     const triggerPoint = window.innerHeight * -0.2; // 20% from the top

//     if (aboutPosition < triggerPoint) {
//         aboutSection.classList.add("hidden"); // Slide down
//     } else {
//         aboutSection.classList.remove("hidden"); // Reset when scrolling up
//     }
// });
document.addEventListener("scroll", function () {
    const aboutSection = document.getElementById("education");
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * -0.3; // 10% from the top

    if (aboutPosition < triggerPoint) {
        aboutSection.classList.add("hidden"); // Slide down
    } else {
        aboutSection.classList.remove("hidden"); // Reset when scrolling up
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const projectContainers = document.querySelectorAll(".project-container");

    function revealProjects() {
        projectContainers.forEach(container => {
            const position = container.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (position < screenPosition) {
                container.classList.add("visible");
            } else {
                container.classList.remove("visible"); // Reset when scrolling up
            }
        });
    }

    window.addEventListener("scroll", revealProjects);
    revealProjects(); // Initial check on page load 
});

document.addEventListener("DOMContentLoaded", function () {
    const projectContainers = document.querySelectorAll(".education-item");

    function revealProjects() {
        projectContainers.forEach(container => {
            const position = container.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (position < screenPosition) {
                container.classList.add("visible");
            } else {
                container.classList.remove("visible"); // Reset when scrolling up
            }
        });
    }

    window.addEventListener("scroll", revealProjects);
    revealProjects(); // Initial check on page load education-item
});

document.addEventListener("DOMContentLoaded", function () {
    const skillsContainer = document.getElementById("skillsContainer");

    // Skill Data with Online Logo URLs
    const skills = [
        { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "React.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "AWS", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
        { name: "VS Code", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Postman", url: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
        { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "JIRA", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
        { name: "Bitbucket", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg" },
        { name: "Confluence", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/confluence/confluence-original.svg" }
    ];

    // Dynamically Create Skill Logos
    skills.forEach(skill => {
        const div = document.createElement("div");
        div.classList.add("skill-logo", "hidden"); // Initially hidden for animation effect
        div.innerHTML = `<img src="${skill.url}" alt="${skill.name}" title="${skill.name}">`;
        skillsContainer.appendChild(div);
    });

    // Reveal Animation on Scroll
    function revealSkills() {
        const skillLogos = document.querySelectorAll(".skill-logo");
        skillLogos.forEach((logo, index) => {
            const position = logo.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (position < screenPosition) {
                setTimeout(() => {
                    logo.classList.add("visible");
                    logo.classList.remove("hidden");
                }, index * 150);
            } else {
                logo.classList.remove("visible");
                logo.classList.add("hidden");
            }
        });
    }

    window.addEventListener("scroll", revealSkills);
    revealSkills(); // Run on load in case any are already in view
});


document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85; // Adjust trigger point based on viewport height
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add("show");
                item.style.transitionDelay = `${index * 0.2}s`; // Staggered animation effect
            } else {
                item.classList.remove("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Initial check on page load
});

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".hidden");

    function checkVisibility() {
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                el.classList.add("show");
            } else {
                el.classList.remove("show");  // Ensure re-animation when scrolling up
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Run initially in case elements are already in view
});


let lastScrollTop = 0;
const logo = document.querySelector(".timeline-logo");

window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        logo.classList.remove("scroll-down");
        logo.classList.add("scroll-up");
    } else {
        // Scrolling up
        logo.classList.remove("scroll-up");
        logo.classList.add("scroll-down");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Safari bounce
});

