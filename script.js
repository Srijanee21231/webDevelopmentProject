/* script.js */

// Step 3: Navigation Menu Interactivity

function toggleMenu() {
    const nav = document.querySelector('.nav-menu');
    nav.classList.toggle('active');
}

document.querySelector('.hamburger').addEventListener('click', toggleMenu);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            document.querySelector('.nav-menu').classList.remove('active');
        }
    });
});

// Step 4: Portfolio Section Interactivity

// Filter Projects by Category
function filterProjects(category) {
    document.querySelectorAll('.project-item').forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        filterProjects(this.dataset.filter);
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Lightbox Effect for Project Images
function openLightbox(imgSrc) {
    const modal = document.querySelector('.lightbox-modal');
    const modalImg = modal.querySelector('img');
    modalImg.src = imgSrc;
    modal.classList.add('open');
}

function closeLightbox() {
    document.querySelector('.lightbox-modal').classList.remove('open');
}

document.querySelectorAll('.project-item img').forEach(img => {
    img.addEventListener('click', function() {
        openLightbox(this.src);
    });
});

document.querySelector('.lightbox-modal .close').addEventListener('click', closeLightbox);

// Step 5: Contact Form Validation

const contactForm = document.querySelector('#contact-form');
const nameInput = contactForm.querySelector('input[name="name"]');
const emailInput = contactForm.querySelector('input[name="email"]');
const messageInput = contactForm.querySelector('textarea[name="message"]');
const feedback = contactForm.querySelector('.form-feedback');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFeedback(message, isError = true) {
    feedback.textContent = message;
    feedback.style.color = isError ? 'red' : 'green';
}

[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        if (!nameInput.value) {
            showFeedback('Please enter your name.');
        } else if (!validateEmail(emailInput.value)) {
            showFeedback('Please enter a valid email address.');
        } else if (!messageInput.value) {
            showFeedback('Please enter your message.');
        } else {
            showFeedback('All fields look good!', false);
        }
    });
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!nameInput.value) {
        showFeedback('Name is required.');
        nameInput.focus();
        return;
    }
    if (!validateEmail(emailInput.value)) {
        showFeedback('Valid email is required.');
        emailInput.focus();
        return;
    }
    if (!messageInput.value) {
        showFeedback('Message is required.');
        messageInput.focus();
        return;
    }
    showFeedback('Thank you for your message!', false);
    contactForm.reset();
});