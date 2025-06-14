// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2, // Smoothing duration (seconds)
    easing: (t) => t * (2 - t), // Ease-out quadratic for natural scroll
    wheelMultiplier: 2, // Amplify wheel scroll by 2x
    touchMultiplier: 1.5, // Amplify touch scroll by 1.5x
    smoothWheel: true, // Enable smooth wheel scrolling
    smoothTouch: true, // Enable smooth touch scrolling
});

// Animation frame for Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// IntersectionObserver for visibility animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.hero-section');

    sections.forEach(section => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% visible
        );

        observer.observe(section);
    });
});
document.querySelector('.hamburger-icon').addEventListener('click', function () {
    document.querySelector('.menu').classList.toggle('active');
});
function sendMessage() {
    const input = document.getElementById('bot-input');
    const responseDiv = document.getElementById('bot-response');
    let response = '';

    if (input.value.toLowerCase().includes('about')) {
        response = 'I’m an AI bot here to help! The "About Me" section highlights John Doe’s experience as a web developer with skills in HTML, CSS, and JavaScript.';
    } else if (input.value.toLowerCase().includes('project')) {
        response = 'The "Projects" section showcases John’s work, including a responsive landing page and an interactive web app built with React.';
    } else if (input.value.toLowerCase().includes('contact')) {
        response = 'You can reach John at john.doe@example.com or (123) 456-7890, as listed in the "Contact" section.';
    } else {
        response = 'Sorry, I can only answer questions about the portfolio. Try asking about "About," "Projects," or "Contact"!';
    }

    responseDiv.innerHTML = `<p><strong>Bot:</strong> ${response}</p>`;
    responseDiv.classList.add('resp-hl'); // Add class
    input.value = ''; // Clear input after sending
    input.readOnly = true; // Reset to readonly after sending
    typeText();

    // Remove response after 15 seconds
    setTimeout(() => {
        responseDiv.innerHTML = ''; // Clear the response
        responseDiv.classList.remove('resp-hl'); // Add class
        typeText();
    }, 12000); // 15 seconds
}

// Send message with Enter key and remove readonly on focus
document.getElementById('bot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !this.readOnly) {
        sendMessage();
    }
});

document.getElementById('bot-input').addEventListener('focus', function () {
    this.readOnly = false; // Remove readonly when user starts typing
    this.value = ''; // Clear the initial message
    clearInterval(typingInterval); // Stop typing animation when focused
});

document.getElementById('bot-input').addEventListener('blur', function () {
    if (!this.value) {
        this.readOnly = true; // Restore readonly when blurred and empty
        typeText(); // Resume typing animation when focus is lost
    }
});

// Typing animation for initial text
let typingInterval; // Global variable to store the interval for clearing

function typeText() {
    const input = document.getElementById('bot-input');
    const text = "Hello! Ask Me..";
    let index = 0;
    input.readOnly = true; // Ensure readonly during typing animation
    input.value = ''; // Clear any existing text

    function type() {
        if (index < text.length) {
            input.value += text.charAt(index);
            index++;
            typingInterval = setTimeout(type, 200); // 200ms delay per character
        } else {
            // Wait before clearing and restarting
            clearInterval(typingInterval); // Clear the interval
            setTimeout(() => {
                index = 0;
                input.value = '';
                if (document.activeElement !== input) {
                    typeText(); // Restart only if not focused
                }
            }, 1000); // 2-second pause after full text
        }
    }

    type(); // Start the typing animation
}

// Random movement within 300px x 300px area
function moveAvatar() {
    const bot = document.getElementById('ai-bot');
    const container = document.querySelector('.avatar-container');
    const containerWidth = container.offsetWidth - bot.offsetWidth; // 300px - 100px
    const containerHeight = container.offsetHeight - bot.offsetHeight; // 300px - 100px

    const newX = Math.floor(Math.random() * containerWidth) - 20;
    const newY = Math.floor(Math.random() * containerHeight) - 20;

    bot.style.left = newX + 'px';
    bot.style.top = newY + 'px';
}

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.scrollable-section');
    let sectionTop = section.offsetTop; // Get initial position of section

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    section.classList.add('visible', 'fixed'); // Add visible and fixed classes
                    observer.unobserve(entry.target); // Stop observing once fixed
                }
            });
        },
        { threshold: 0.1 } // Trigger when 10% of section is visible
    );

    observer.observe(section);

    // Handle window resize to update section position
    window.addEventListener('resize', () => {
        sectionTop = section.offsetTop;
    });
});

// Move avatar every 2 seconds and start typing animation
setInterval(moveAvatar, 2000);
typeText(); // Initiate typing animation on page load