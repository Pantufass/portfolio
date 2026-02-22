// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Video play on hover for prototypes
const prototypeVideos = document.querySelectorAll('.prototype-media video');

prototypeVideos.forEach(video => {
    const playBtn = video.closest('.prototype-media').querySelector('.prototype-play-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.style.opacity = '0';
            } else {
                video.pause();
                playBtn.style.opacity = '1';
            }
        });
    }
    
    video.addEventListener('mouseenter', () => {
        video.play();
    });
    
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// Scroll to top button functionality
const scrollBtn = document.querySelector('.hero-scroll');

if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Loading animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('fade-out');
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Project card hover effect
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Form submission (if you add a contact form)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Message sent! (This is a demo)');
        contactForm.reset();
    });
}

// Dynamic year in footer
const yearSpan = document.querySelector('.current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Image lazy loading
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Tab navigation highlighting
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Image Carousel for Thesis
class ImageCarousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.images = this.carousel.querySelectorAll('.carousel-image');
        this.dots = this.carousel.querySelectorAll('.dot');
        this.prevBtn = this.carousel.querySelector('.prev-btn');
        this.nextBtn = this.carousel.querySelector('.next-btn');
        this.caption = this.carousel.closest('.thesis-media').querySelector('.caption-text');
        this.currentIndex = 0;
        this.totalImages = this.images.length;
        
        // Captions for each image
        this.captions = [
            "NPC conversation system - Characters now interact autonomously",
            "Tavern social scene - Dynamic NPC gatherings and interactions",
            "Extended dialog options with emotional intent (positive, negative, romantic)",
            "Relationship tracking system between NPCs",
            "Working with 1.5M+ lines of decompiled game code"
        ];
        
        this.init();
    }
    
    init() {
        this.updateCarousel();
        this.setupEventListeners();
        this.startAutoPlay();
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToImage(index));
        });
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    updateCarousel() {
        // Update images
        this.images.forEach((img, index) => {
            img.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update caption
        if (this.caption) {
            this.caption.textContent = this.captions[this.currentIndex];
        }
        
        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.totalImages - 1;
    }
    
    nextImage() {
        if (this.currentIndex < this.totalImages - 1) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    prevImage() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    goToImage(index) {
        if (index >= 0 && index < this.totalImages) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex < this.totalImages - 1) {
                this.nextImage();
            } else {
                this.goToImage(0);
            }
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.image-carousel');
    if (carousel) {
        new ImageCarousel(carousel);
    }
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.querySelector('.prev-btn');
        if (prevBtn && !prevBtn.disabled) prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn && !nextBtn.disabled) nextBtn.click();
    }
});

// Console greeting (for fun)
console.log('%c👋 Welcome to Filipe Silveira\'s Game Design Portfolio!', 'font-size: 16px; color: #6c5ce7; font-weight: bold;');
console.log('%c🎮 Explore my games and prototypes!', 'font-size: 14px; color: #00b894;');