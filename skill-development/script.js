// Mobile menu functionality - Fixed version
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  console.log('Mobile menu elements:', { navbarToggle, navbarMenu, mobileMenuOverlay });

  // Initialize mobile menu
  function initMobileMenu() {
    if (navbarToggle && navbarMenu) {
      // Toggle mobile menu
      navbarToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Hamburger clicked');
        toggleMobileMenu();
      });

      // Close menu when clicking on overlay
      if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
          console.log('Overlay clicked');
          closeMobileMenu();
        });
      }

      // Close menu when clicking on a link
      if (navbarMenu) {
        navbarMenu.addEventListener('click', function(e) {
          if (e.target.tagName === 'A' && window.innerWidth <= 768) {
            console.log('Menu link clicked');
            closeMobileMenu();
          }
        });
      }

      // Close menu when pressing Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
          console.log('Escape key pressed');
          closeMobileMenu();
        }
      });

      // Close menu when window is resized to desktop size
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navbarMenu.classList.contains('active')) {
          closeMobileMenu();
        }
      });
    } else {
      console.error('Mobile menu elements not found');
    }
  }

  // Function to toggle mobile menu
  function toggleMobileMenu() {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.toggle('active');
    }
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    
    console.log('Menu toggled. Active:', navbarMenu.classList.contains('active'));
  }

  // Function to close mobile menu
  function closeMobileMenu() {
    navbarToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
    
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('active');
    }
    
    document.body.style.overflow = '';
    
    console.log('Menu closed');
  }

  // Initialize mobile menu
  initMobileMenu();

  // Your existing smooth scrolling code
  document.querySelectorAll('.navbar-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Handle internal page links (hash links)
      const href = this.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ========== EXISTING SKILL ASSESSMENT CODE ==========
  
  // Skill Assessment Variables
  let currentQuestion = 0;
  let userAnswers = [];
  
  // Assessment Questions
  const assessmentQuestions = [
    {
      question: "How would you rate your current technical skills?",
      options: [
        "Beginner - Basic computer skills",
        "Intermediate - Comfortable with common software",
        "Advanced - Proficient in specialized tools",
        "Expert - Can develop complex technical solutions"
      ]
    },
    {
      question: "How comfortable are you with communication in professional settings?",
      options: [
        "Not comfortable - Avoid speaking in groups",
        "Somewhat comfortable - Can communicate one-on-one",
        "Comfortable - Can present to small groups",
        "Very comfortable - Excel at public speaking and negotiations"
      ]
    },
    {
      question: "How would you describe your problem-solving approach?",
      options: [
        "I follow established procedures",
        "I can solve routine problems with some guidance",
        "I can tackle complex problems independently",
        "I excel at innovative problem-solving and strategy"
      ]
    },
    {
      question: "How much experience do you have working in teams?",
      options: [
        "Limited experience - Prefer working alone",
        "Some experience - Can collaborate when needed",
        "Experienced - Comfortable in team settings",
        "Highly experienced - Often lead teams successfully"
      ]
    },
    {
      question: "What is your learning preference?",
      options: [
        "Self-paced online courses",
        "Instructor-led virtual classes",
        "Hands-on projects and practice",
        "Combination of all methods"
      ]
    }
  ];
  
  // Skill Recommendations Data
  const skillRecommendations = {
    technical: [
      {
        skill: "Programming Fundamentals",
        description: "Build a strong foundation in coding concepts",
        priority: "high",
        resources: ["Free Course", "Practice Exercises", "Mentorship Program"]
      },
      {
        skill: "Data Analysis",
        description: "Learn to interpret and visualize data effectively",
        priority: "medium",
        resources: ["Interactive Tutorials", "Real-world Projects"]
      }
    ],
    communication: [
      {
        skill: "Professional Communication",
        description: "Enhance your verbal and written communication skills",
        priority: "high",
        resources: ["Video Series", "Practice Scenarios", "Feedback Sessions"]
      }
    ],
    problemsolving: [
      {
        skill: "Critical Thinking",
        description: "Develop analytical and decision-making abilities",
        priority: "medium",
        resources: ["Case Studies", "Problem-solving Framework"]
      }
    ],
    teamwork: [
      {
        skill: "Collaboration Skills",
        description: "Improve your ability to work effectively in teams",
        priority: "low",
        resources: ["Team Exercises", "Communication Guide"]
      }
    ]
  };
  
  // DOM Elements
  const startAssessmentBtn = document.getElementById('startAssessment');
  const assessmentModal = document.getElementById('assessmentModal');
  const closeModal = document.querySelector('.close');
  const assessmentQuestionsContainer = document.querySelector('.assessment-questions');
  const progressBar = document.getElementById('assessmentProgress');
  const progressText = document.getElementById('progressText');
  const prevQuestionBtn = document.getElementById('prevQuestion');
  const nextQuestionBtn = document.getElementById('nextQuestion');
  const submitAssessmentBtn = document.getElementById('submitAssessment');
  const skillRecommendationsSection = document.getElementById('skillRecommendations');
  const recommendationsGrid = document.getElementById('recommendationsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const resourceCards = document.querySelectorAll('.resource-card');
  
  // Event Listeners for Assessment
  if (startAssessmentBtn) {
    startAssessmentBtn.addEventListener('click', openAssessmentModal);
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', closeAssessmentModal);
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === assessmentModal) {
      closeAssessmentModal();
    }
  });
  
  if (prevQuestionBtn) {
    prevQuestionBtn.addEventListener('click', showPreviousQuestion);
  }
  
  if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener('click', showNextQuestion);
  }
  
  if (submitAssessmentBtn) {
    submitAssessmentBtn.addEventListener('click', submitAssessment);
  }
  
  // Filter resources by category
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const category = button.getAttribute('data-category');
      
      // Show/hide resources based on category
      resourceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Functions
  function openAssessmentModal() {
    if (assessmentModal) {
      assessmentModal.style.display = 'block';
      currentQuestion = 0;
      userAnswers = [];
      renderQuestion(currentQuestion);
      updateProgress();
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  }
  
  function closeAssessmentModal() {
    if (assessmentModal) {
      assessmentModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
  }
  
  function renderQuestion(index) {
    if (!assessmentQuestionsContainer) return;
    
    assessmentQuestionsContainer.innerHTML = '';
    
    const question = assessmentQuestions[index];
    const questionElement = document.createElement('div');
    questionElement.className = `question ${index === currentQuestion ? 'active' : ''}`;
    
    questionElement.innerHTML = `
      <h4>${question.question}</h4>
      <div class="options">
        ${question.options.map((option, i) => `
          <div class="option" data-index="${i}">
            ${option}
          </div>
        `).join('')}
      </div>
    `;
    
    assessmentQuestionsContainer.appendChild(questionElement);
    
    // Add event listeners to options
    const options = questionElement.querySelectorAll('.option');
    options.forEach(option => {
      option.addEventListener('click', () => {
        // Remove selected class from all options
        options.forEach(opt => opt.classList.remove('selected'));
        // Add selected class to clicked option
        option.classList.add('selected');
        // Store the answer
        userAnswers[currentQuestion] = parseInt(option.getAttribute('data-index'));
        
        // Enable next button
        if (nextQuestionBtn) {
          nextQuestionBtn.disabled = false;
        }
      });
    });
    
    // If user already answered this question, show the selected option
    if (userAnswers[index] !== undefined) {
      options[userAnswers[index]].classList.add('selected');
      if (nextQuestionBtn) {
        nextQuestionBtn.disabled = false;
      }
    }
    
    // Update navigation buttons
    if (prevQuestionBtn) {
      prevQuestionBtn.disabled = index === 0;
    }
    if (nextQuestionBtn) {
      nextQuestionBtn.style.display = index < assessmentQuestions.length - 1 ? 'block' : 'none';
    }
    if (submitAssessmentBtn) {
      submitAssessmentBtn.style.display = index === assessmentQuestions.length - 1 ? 'block' : 'none';
    }
  }
  
  function showPreviousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion(currentQuestion);
      updateProgress();
    }
  }
  
  function showNextQuestion() {
    if (currentQuestion < assessmentQuestions.length - 1 && userAnswers[currentQuestion] !== undefined) {
      currentQuestion++;
      renderQuestion(currentQuestion);
      updateProgress();
    }
  }
  
  function updateProgress() {
    if (!progressBar || !progressText) return;
    
    const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestion + 1} of ${assessmentQuestions.length}`;
  }
  
  function submitAssessment() {
    if (userAnswers.length === assessmentQuestions.length) {
      // Generate recommendations based on answers
      generateRecommendations();
      closeAssessmentModal();
      if (skillRecommendationsSection) {
        skillRecommendationsSection.style.display = 'block';
        
        // Scroll to recommendations
        skillRecommendationsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      alert('Please complete all questions before submitting.');
    }
  }
  
  function generateRecommendations() {
    if (!recommendationsGrid) return;
    
    recommendationsGrid.innerHTML = '';
    
    // Analyze user answers to determine skill priorities
    const technicalScore = userAnswers[0]; // First question about technical skills
    const communicationScore = userAnswers[1]; // Second question about communication
    const problemSolvingScore = userAnswers[2]; // Third question about problem-solving
    const teamworkScore = userAnswers[3]; // Fourth question about teamwork
    
    // Determine which skills need development based on scores
    // Lower scores (0-1) indicate need for development
    if (technicalScore <= 1) {
      skillRecommendations.technical.forEach(skill => {
        createRecommendationCard(skill);
      });
    }
    
    if (communicationScore <= 1) {
      skillRecommendations.communication.forEach(skill => {
        createRecommendationCard(skill);
      });
    }
    
    if (problemSolvingScore <= 1) {
      skillRecommendations.problemsolving.forEach(skill => {
        createRecommendationCard(skill);
      });
    }
    
    if (teamworkScore <= 1) {
      skillRecommendations.teamwork.forEach(skill => {
        createRecommendationCard(skill);
      });
    }
    
    // If all scores are high, show some general recommendations
    if (technicalScore > 1 && communicationScore > 1 && problemSolvingScore > 1 && teamworkScore > 1) {
      const advancedSkills = [
        {
          skill: "Leadership Development",
          description: "Enhance your leadership capabilities for senior roles",
          priority: "medium",
          resources: ["Leadership Workshop", "Mentorship Program", "Case Studies"]
        },
        {
          skill: "Strategic Thinking",
          description: "Develop long-term planning and strategic decision-making skills",
          priority: "medium",
          resources: ["Strategy Course", "Business Simulations", "Expert Interviews"]
        }
      ];
      
      advancedSkills.forEach(skill => {
        createRecommendationCard(skill);
      });
    }
  }
  
  function createRecommendationCard(skillData) {
    if (!recommendationsGrid) return;
    
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    
    card.innerHTML = `
      <h4>${skillData.skill}</h4>
      <p>${skillData.description}</p>
      <div class="priority ${skillData.priority}">${skillData.priority.toUpperCase()} PRIORITY</div>
      <div class="resource-links">
        ${skillData.resources.map(resource => `
          <a href="#" class="resource-link">${resource}</a>
        `).join('')}
      </div>
    `;
    
    recommendationsGrid.appendChild(card);
  }
  
  // Add keyboard navigation for accessibility
  document.addEventListener('keydown', (e) => {
    if (assessmentModal && assessmentModal.style.display === 'block') {
      if (e.key === 'Escape') {
        closeAssessmentModal();
      } else if (e.key === 'ArrowLeft' && prevQuestionBtn && !prevQuestionBtn.disabled) {
        showPreviousQuestion();
      } else if (e.key === 'ArrowRight' && nextQuestionBtn && !nextQuestionBtn.disabled) {
        showNextQuestion();
      }
    }
  });

  const fileSizes = {
    'programming-fundamentals.pdf': '1.2 MB',
    'python-exercises-complete.pdf': '0.9 MB',
    'communication-guide.pdf': '0.9 MB',
    'communication-scenarios.pdf': '0.6 MB',
    'data-analysis-tutorial.pdf': '1.1 MB',
    'datasets-complete.pdf': '0.8 MB',
    'pmp-study-guide.pdf': '1.4 MB',
    'project-templates-complete.pdf': '1.0 MB',
    'team-collaboration.pdf': '1.0 MB',
    'team-exercises-complete.pdf': '0.7 MB',
    'cybersecurity-basics.pdf': '0.9 MB',
    'security-checklist.pdf': '0.3 MB'
  };
});