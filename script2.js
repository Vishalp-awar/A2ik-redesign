// Navigation menu toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    burger.classList.toggle('toggle');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Hero section animation
gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: '.hero',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
    }
});

// Service cards animation
gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });
});

// About section animation
gsap.from('.about-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: '#about',
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
    }
});

// FAQ items animation
gsap.utils.toArray('.faq-item').forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        scrollTrigger: {
            trigger: item,
            start: 'top bottom-=50',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });
});

// Job listings animation
gsap.utils.toArray('.job-item').forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        scrollTrigger: {
            trigger: item,
            start: 'top bottom-=50',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });
});

// Form submissions (you may want to replace this with actual form submission logic)
// document.querySelector('.quote-form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert('Quote request submitted successfully!');
// });

// document.querySelector('.contact-form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert('Message sent successfully!');
// });