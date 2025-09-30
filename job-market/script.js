// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Close menu when clicking on a link (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.6)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.3)';
            }
            
            // Back to top button visibility
            const backToTop = document.getElementById('backToTop');
            if (backToTop) {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Job Application Buttons
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.closest('.job-card, .internship-card').querySelector('h3').textContent;
            const originalText = this.textContent;
            
            // Show loading state
            this.innerHTML = '<span class="loading"></span> Applying...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you for your interest in the "${jobTitle}" position! We'll review your application and get back to you soon.`);
                this.textContent = originalText;
                this.disabled = false;
            }, 1500);
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you for subscribing with ${email}! You'll receive our latest updates soon.`);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 1500);
        });
    }
    
    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
        
        function performSearch(query) {
            if (query.trim() !== '') {
                // Show loading state
                const originalText = searchBtn.textContent;
                searchBtn.innerHTML = '<span class="loading"></span> Searching...';
                
                // Simulate API call
                setTimeout(() => {
                    alert(`Searching for: "${query}"\n\nThis is a demo search functionality. In a real application, this would connect to a job search API.`);
                    searchBtn.textContent = originalText;
                }, 1500);
            } else {
                alert('Please enter a search term');
            }
        }
    }
    
    // Job Filtering
    const filterTabs = document.querySelectorAll('.filter-tab');
    const jobCards = document.querySelectorAll('.job-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            jobCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-type').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate stats counter
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }
    
    // Intersection Observer for stats animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const jobCount = document.getElementById('jobCount');
                const companyCount = document.getElementById('companyCount');
                const successCount = document.getElementById('successCount');
                
                if (jobCount) animateCounter(jobCount, 500);
                if (companyCount) animateCounter(companyCount, 150);
                if (successCount) animateCounter(successCount, 10000);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe hero section for stats animation
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
    
    // Add loading state to read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.textContent;
            
            this.innerHTML = '<span class="loading"></span> Loading...';
            
            setTimeout(() => {
                alert('This is a demo article. In a real application, this would navigate to the full article page.');
                this.textContent = originalText;
            }, 1500);
        });
    });

    // NEW FUNCTIONALITY: Social Media Links in Footer
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label').toLowerCase();
            
            // Show loading state
            const originalHTML = this.innerHTML;
            this.innerHTML = '<span class="loading"></span>';
            
            // Simulate API call
            setTimeout(() => {
                alert(`Redirecting to our ${platform} page...\n\nThis is a demo. In a real application, this would navigate to the actual social media profile.`);
                this.innerHTML = originalHTML;
            }, 1000);
        });
    });

    // NEW FUNCTIONALITY: Image placeholders for career tips
    const tipImages = document.querySelectorAll('.tip-image');
    const imageNames = ['technical-interview.jpg', 'remote-work.jpg', 'linkedin-profile.jpg'];
    
    tipImages.forEach((imageDiv, index) => {
        // Set background image if available
        const imgElement = imageDiv.querySelector('.tip-img');
        if (imgElement) {
            // In a real application, you would set the actual image source
            // imgElement.src = imageNames[index];
            // For now, we'll just add a placeholder message
            if (!imgElement.getAttribute('src')) {
                imageDiv.innerHTML = `<i class="fas fa-image"></i><p>Image: ${imageNames[index]}</p>`;
                imageDiv.style.flexDirection = 'column';
                imageDiv.style.justifyContent = 'center';
                imageDiv.style.textAlign = 'center';
                imageDiv.querySelector('p').style.marginTop = '10px';
                imageDiv.querySelector('p').style.fontSize = '0.8rem';
            }
        }
    });
});