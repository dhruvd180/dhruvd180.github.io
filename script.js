document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    const highlightNavOnScroll = () => {
        const sections = document.querySelectorAll('.section[id], .hero[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 10;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--orange)';
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);

    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // Animate species tags on hover
    const speciesTags = document.querySelectorAll('.species-tag');
    speciesTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
        });
    });
});
const scrollHints = document.querySelectorAll('.scroll-hint');

window.addEventListener('scroll', () => {
    scrollHints.forEach(hint => {
        const rect = hint.getBoundingClientRect();
        const fadeStart = window.innerHeight * 0.7;
        const fadeEnd = window.innerHeight * 0.4;
        
        if(rect.top < fadeStart) {
            hint.style.opacity = Math.max(0, (rect.top - fadeEnd) / (fadeStart - fadeEnd));
        } else {
            hint.style.opacity = 1;
        }
    });
});
