// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {

// Mobile navigation toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const body = document.body;

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.navbar-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container') && navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
        body.classList.remove('menu-open');
    }
});
    
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

// Add active class to current page in navigation
const currentLocation = window.location.href;
const navItems = document.querySelectorAll('.navbar-menu a');

navItems.forEach(item => {
    if (item.href === currentLocation) {
        item.classList.add('active');
    }
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe animated elements
const animatedElements = document.querySelectorAll('.service-card, .testimonies-card, .resource-item, .tip-card');
animatedElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Prevent zoom on double-tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Initialize interview functionality if on interview page
if (document.querySelector('.interview-container')) {
    initializeInterview();
}
});

// Interview functionality
function initializeInterview() {
const modeBtns = document.querySelectorAll('.mode-btn');
const recordBtn = document.getElementById('record-btn');
const nextBtn = document.getElementById('next-btn');
const feedbackBtn = document.getElementById('feedback-btn');
const restartBtn = document.getElementById('restart-btn');

let currentMode = 'hr';
let currentQuestionIndex = 0;

const questions = {
    hr: [
        "Tell me about yourself and your background.",
        "Why are you interested in this position?",
        "What are your greatest strengths?",
        "What are your areas for improvement?",
        "Where do you see yourself in 5 years?",
        "Why should we hire you?",
        "What do you know about our company?",
        "How do you handle pressure or stressful situations?"
    ],
    technical: [
        "Explain a technical project you've worked on recently.",
        "How would you approach debugging a complex issue?",
        "What programming languages are you most comfortable with and why?",
        "Describe your experience with version control systems.",
        "How do you ensure code quality in your projects?",
        "Explain a challenging technical problem you solved.",
        "What's your experience with agile methodologies?",
        "How do you stay updated with new technologies?"
    ],
    behavioral: [
        "Tell me about a time you had a conflict with a team member.",
        "Describe a situation where you had to meet a tight deadline.",
        "Give an example of when you showed leadership skills.",
        "How do you handle receiving constructive criticism?",
        "Describe a time you failed and what you learned from it.",
        "Tell me about a time you had to persuade someone.",
        "How do you prioritize multiple tasks?",
        "Describe a situation where you went above and beyond."
    ]
};

// Mode selection
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        switchMode(mode);
    });
});

// Recording simulation
if (recordBtn) {
    recordBtn.addEventListener('click', () => {
        const isRecording = recordBtn.classList.contains('recording');
        
        if (!isRecording) {
            // Start recording simulation
            recordBtn.classList.add('recording');
            recordBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
            document.getElementById('recording-status').textContent = 'Recording...';
            
            // Simulate processing after 3 seconds
            setTimeout(() => {
                if (recordBtn.classList.contains('recording')) {
                    recordBtn.classList.remove('recording');
                    recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
                    document.getElementById('recording-status').textContent = 'Processing...';
                    
                    // Show simulated transcript after another 2 seconds
                    setTimeout(() => {
                        document.getElementById('recording-status').textContent = 'Transcript ready';
                        document.getElementById('transcript-text').textContent = 
                            "This is a simulated transcript of your response. In a real implementation, this would be generated from your speech using speech-to-text technology.";
                    }, 2000);
                }
            }, 3000);
        } else {
            // Stop recording
            recordBtn.classList.remove('recording');
            recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
            document.getElementById('recording-status').textContent = 'Ready to record';
        }
    });
}

// Next question
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions[currentMode].length - 1) {
            currentQuestionIndex++;
            updateQuestion();
            updateProgress();
            resetResponseArea();
        } else {
            showCompletion();
        }
    });
}

// Feedback
if (feedbackBtn) {
    feedbackBtn.addEventListener('click', () => {
        generateFeedback();
    });
}

// Restart
if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        updateQuestion();
        updateProgress();
        resetResponseArea();
        hideCompletion();
    });
}

function switchMode(mode) {
    currentMode = mode;
    currentQuestionIndex = 0;
    
    // Update active mode button
    modeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Update round title
    const modeTitles = {
        hr: 'HR Round',
        technical: 'Technical Round',
        behavioral: 'Behavioral Round'
    };
    document.getElementById('round-title').textContent = modeTitles[mode];
    
    updateQuestion();
    updateProgress();
    resetResponseArea();
    hideFeedback();
    hideCompletion();
}

function updateQuestion() {
    if (currentQuestionIndex < questions[currentMode].length) {
        document.getElementById('question-text').textContent = questions[currentMode][currentQuestionIndex];
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions[currentMode].length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
}

function resetResponseArea() {
    document.getElementById('transcript-text').textContent = 'Your response will appear here...';
    document.getElementById('recording-status').textContent = 'Ready to record';
    hideFeedback();
}

function generateFeedback() {
    const scores = {
        clarity: Math.floor(Math.random() * 3) + 7,
        confidence: Math.floor(Math.random() * 3) + 6,
        relevance: Math.floor(Math.random() * 3) + 8
    };
    
        const feedbackMessages = {
            excellent: "Excellent answer! You demonstrated strong communication skills and relevant experience. Your response was clear, confident, and directly addressed the question.",
            good: "Good response. Consider providing more specific examples to strengthen your answer. Your communication was clear but could benefit from more concrete details.",
            average: "Average response. Consider providing more specific examples to strengthen your answer. Your communication was not clear you should also work on the clarity."
        };
    }
}
    
function hideFeedback() {
    const feedbackArea = document.getElementById('feedback-area');
    if (feedbackArea) {
        feedbackArea.classList.remove('active');
    }
}

function showCompletion() {
    const interviewComplete = document.getElementById('interview-complete');
    if (interviewComplete) {
        interviewComplete.classList.add('active');
    }
}

function hideCompletion() {
    const interviewComplete = document.getElementById('interview-complete');
    if (interviewComplete) {
        interviewComplete.classList.remove('active');
    }
}

// Initialize interview functionality
function initializeInterview() {
    const modeBtns = document.querySelectorAll('.mode-btn');
    const recordBtn = document.getElementById('record-btn');
    const nextBtn = document.getElementById('next-btn');
    const feedbackBtn = document.getElementById('feedback-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    let currentMode = 'hr';
    let currentQuestionIndex = 0;
    
    const questions = {
        hr: [
            "Tell me about yourself and your background.",
            "Why are you interested in this position?",
            "What are your greatest strengths?",
            "What are your areas for improvement?",
            "Where do you see yourself in 5 years?",
            "Why should we hire you?",
            "What do you know about our company?",
            "How do you handle pressure or stressful situations?"
        ],
        technical: [
            "Explain a technical project you've worked on recently.",
            "How would you approach debugging a complex issue?",
            "What programming languages are you most comfortable with and why?",
            "Describe your experience with version control systems.",
            "How do you ensure code quality in your projects?",
            "Explain a challenging technical problem you solved.",
            "What's your experience with agile methodologies?",
            "How do you stay updated with new technologies?"
        ],
        behavioral: [
            "Tell me about a time you had a conflict with a team member.",
            "Describe a situation where you had to meet a tight deadline.",
            "Give an example of when you showed leadership skills.",
            "How do you handle receiving constructive criticism?",
            "Describe a time you failed and what you learned from it.",
            "Tell me about a time you had to persuade someone.",
            "How do you prioritize multiple tasks?",
            "Describe a situation where you went above and beyond."
        ]
    };
    
    // Mode selection
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            switchMode(mode);
        });
    });
    
    // Recording simulation
    if (recordBtn) {
        recordBtn.addEventListener('click', () => {
            const isRecording = recordBtn.classList.contains('recording');
            
            if (!isRecording) {
                // Start recording simulation
                recordBtn.classList.add('recording');
                recordBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
                document.getElementById('recording-status').textContent = 'Recording...';
                
                // Simulate processing after 3 seconds
                setTimeout(() => {
                    if (recordBtn.classList.contains('recording')) {
                        recordBtn.classList.remove('recording');
                        recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
                        document.getElementById('recording-status').textContent = 'Processing...';
                        
                        // Show simulated transcript after another 2 seconds
                        setTimeout(() => {
                            document.getElementById('recording-status').textContent = 'Transcript ready';
                            document.getElementById('transcript-text').textContent = 
                                "This is a simulated transcript of your response. In a real implementation, this would be generated from your speech using speech-to-text technology.";
                        }, 2000);
                    }
                }, 3000);
            } else {
                // Stop recording
                recordBtn.classList.remove('recording');
                recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
                document.getElementById('recording-status').textContent = 'Ready to record';
            }
        });
    }
    
    // Next question
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < questions[currentMode].length - 1) {
                currentQuestionIndex++;
                updateQuestion();
                updateProgress();
                resetResponseArea();
            } else {
                showCompletion();
            }
        });
    }
    
    // Feedback
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            generateFeedback();
        });
    }
    
    // Restart
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            updateQuestion();
            updateProgress();
            resetResponseArea();
            hideCompletion();
        });
    }
    
    function switchMode(mode) {
        currentMode = mode;
        currentQuestionIndex = 0;
        
        // Update active mode button
        modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        // Update round title
        const modeTitles = {
            hr: 'HR Round',
            technical: 'Technical Round',
            behavioral: 'Behavioral Round'
        };
        document.getElementById('round-title').textContent = modeTitles[mode];
        
        updateQuestion();
        updateProgress();
        resetResponseArea();
        hideFeedback();
        hideCompletion();
    }
    
    function updateQuestion() {
        if (currentQuestionIndex < questions[currentMode].length) {
            document.getElementById('question-text').textContent = questions[currentMode][currentQuestionIndex];
        }
    }
    
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions[currentMode].length) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
    }
    
    function resetResponseArea() {
        document.getElementById('transcript-text').textContent = 'Your response will appear here...';
        document.getElementById('recording-status').textContent = 'Ready to record';
        hideFeedback();
    }
    
    function generateFeedback() {
        const scores = {
            clarity: Math.floor(Math.random() * 3) + 7,
            confidence: Math.floor(Math.random() * 3) + 6,
            relevance: Math.floor(Math.random() * 3) + 8
        };
        
        const feedbackMessages = {
            excellent: "Excellent answer! You demonstrated strong communication skills and relevant experience. Your response was clear, confident, and directly addressed the question.",
            good: "Good response. Consider providing more specific examples to strengthen your answer. Your communication was clear but could benefit from more concrete details.",
            average: "Solid foundation. Work on being more concise and confident in your delivery. Practice structuring your answers more effectively."
        };
        
        const averageScore = (scores.clarity + scores.confidence + scores.relevance) / 3;
        let feedback;
        
        if (averageScore >= 8) feedback = feedbackMessages.excellent;
        else if (averageScore >= 7) feedback = feedbackMessages.good;
        else feedback = feedbackMessages.average;
        
        // Update scores
        document.getElementById('clarity-score').textContent = `${scores.clarity}/10`;
        document.getElementById('confidence-score').textContent = `${scores.confidence}/10`;
        document.getElementById('relevance-score').textContent = `${scores.relevance}/10`;
        
        // Update feedback text
        document.getElementById('feedback-text').textContent = feedback;
        
        showFeedback();
    }
    
    function showFeedback() {
        const feedbackArea = document.getElementById('feedback-area');
        if (feedbackArea) {
            feedbackArea.classList.add('active');
        }
    }
    
    // Initialize first question
    updateQuestion();
    updateProgress();
}