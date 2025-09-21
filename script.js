// Navbar Toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
  
  // Close menu when clicking on a link (mobile)
  if (navbarMenu.classList.contains('active')) {
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
  }
});

// Multi-step form JS
const form = document.getElementById('careerForm');
const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const sectorButtons = document.querySelectorAll('.sector-btn');
const resultsContainer = document.getElementById('resultsContainer');
const careerResults = document.getElementById('careerResults');
const restartBtn = document.getElementById('restartBtn');
let currentStep = 0;
let selectedSectors = [];
let formData = {};

// Initialize form
function initForm() {
  // Show first step
  showStep(currentStep);
  
  // Add touch events for mobile swipe (optional)
  if ('ontouchstart' in window) {
    setupSwipeEvents();
  }
}

// Show specific step
function showStep(stepIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === stepIndex);
  });
}

// Next button functionality
nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Validate current step before proceeding
    if (validateStep(currentStep)) {
      // Save current step data
      saveStepData(currentStep);
      
      // Move to next step
      steps[currentStep].classList.remove("active");
      currentStep++;
      
      if (currentStep < steps.length) {
        showStep(currentStep);
        
        // Scroll to top of form for mobile devices
        if (window.innerWidth < 768) {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // If it's the last step, submit the form
        form.dispatchEvent(new Event('submit'));
      }
    }
  });
});

// Sector selection functionality
sectorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const sector = btn.getAttribute('data-sector');
    
    if (selectedSectors.includes(sector)) {
      // Deselect if already selected
      selectedSectors = selectedSectors.filter(s => s !== sector);
      btn.classList.remove('selected');
    } else {
      // Select if not already selected
      selectedSectors.push(sector);
      btn.classList.add('selected');
    }
    
    // Save selected sectors to form data
    formData.sectors = selectedSectors;
  });
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (validateStep(currentStep)) {
    // Save final step data
    saveStepData(currentStep);
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.classList.add('loading');
    
    // Simulate API call delay
    setTimeout(() => {
      // Hide form and show results
      form.style.display = 'none';
      resultsContainer.style.display = 'block';
      
      // Generate career suggestions
      generateCareerSuggestions();
      
      // Remove loading state
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = originalText;
      
      // Scroll to results for mobile devices
      if (window.innerWidth < 768) {
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1500);
  }
});

// Restart button
restartBtn.addEventListener('click', () => {
  // Reset form
  form.reset();
  selectedSectors = [];
  formData = {};
  sectorButtons.forEach(btn => btn.classList.remove('selected'));
  
  // Hide results and show form
  resultsContainer.style.display = 'none';
  form.style.display = 'block';
  
  // Reset to first step
  currentStep = 0;
  showStep(currentStep);
  
  // Scroll to top for mobile devices
  if (window.innerWidth < 768) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Save data from current step
function saveStepData(stepIndex) {
  const currentStepElement = steps[stepIndex];
  
  if (stepIndex === 0) {
    const educationSelect = currentStepElement.querySelector('#education');
    formData.education = educationSelect.value;
  } else if (stepIndex === 1) {
    const skills = Array.from(currentStepElement.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);
    formData.skills = skills;
  } else if (stepIndex === 2) {
    formData.sectors = selectedSectors;
  } else if (stepIndex === 3) {
    const locationSelect = currentStepElement.querySelector('#location');
    formData.location = locationSelect.value;
  }
}

// Validate current step
function validateStep(stepIndex) {
  const currentStepElement = steps[stepIndex];
  let isValid = true;
  let errorMessage = '';
  
  if (stepIndex === 0) {
    const educationSelect = currentStepElement.querySelector('#education');
    if (!educationSelect.value) {
      educationSelect.focus();
      errorMessage = 'Please select your education level';
      isValid = false;
    }
  } else if (stepIndex === 1) {
    const skillCheckboxes = currentStepElement.querySelectorAll('input[name="skills"]:checked');
    if (skillCheckboxes.length === 0) {
      errorMessage = 'Please select at least one skill';
      isValid = false;
    }
  } else if (stepIndex === 2) {
    if (selectedSectors.length === 0) {
      errorMessage = 'Please select at least one sector';
      isValid = false;
    }
  } else if (stepIndex === 3) {
    const locationSelect = currentStepElement.querySelector('#location');
    if (!locationSelect.value) {
      locationSelect.focus();
      errorMessage = 'Please select your work preference';
      isValid = false;
    }
  }
  
  if (!isValid) {
    showError(errorMessage);
  }
  
  return isValid;
}

// Show error message
function showError(message) {
  // Remove any existing error messages
  const existingError = document.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Create error element
  const errorElement = document.createElement('div');
  errorElement.className = 'form-error';
  errorElement.style.cssText = `
    color: #ff6b6b;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.8rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
    animation: shake 0.5s ease;
  `;
  
  errorElement.textContent = message;
  
  // Add to current step
  const currentStepElement = steps[currentStep];
  currentStepElement.insertBefore(errorElement, currentStepElement.firstChild);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (errorElement.parentNode) {
      errorElement.remove();
    }
  }, 5000);
}

// Generate career suggestions based on user input
function generateCareerSuggestions() {
  // Clear previous results
  careerResults.innerHTML = '';
  
  // Sample career data (in a real app, this would come from a database)
  const allCareers = [
    {
      title: "Software Developer",
      match: 85,
      description: "Create and maintain software applications. Great for those with programming skills.",
      education: "Undergraduate",
      skills: ["Programming", "Data Analysis"],
      sectors: ["IT"],
      location: ["urban", "remote"]
    },
    {
      title: "Data Analyst",
      match: 78,
      description: "Interpret complex data to help businesses make better decisions.",
      education: "Undergraduate",
      skills: ["Data Analysis", "MS Office"],
      sectors: ["IT", "Finance"],
      location: ["urban", "remote"]
    },
    {
      title: "Teacher",
      match: 92,
      description: "Educate students in various subjects. Requires good communication skills.",
      education: "Undergraduate",
      skills: ["Communication", "Creativity"],
      sectors: ["Education"],
      location: ["urban", "rural"]
    },
    {
      title: "Digital Marketing Specialist",
      match: 80,
      description: "Promote products and services through digital channels.",
      education: "Undergraduate",
      skills: ["Digital Marketing", "Communication", "Creativity"],
      sectors: ["IT", "Finance"],
      location: ["urban", "remote"]
    },
    {
      title: "Healthcare Assistant",
      match: 75,
      description: "Support medical staff in providing care to patients.",
      education: "12th",
      skills: ["Communication"],
      sectors: ["Healthcare"],
      location: ["urban", "rural"]
    },
    {
      title: "Agricultural Technician",
      match: 88,
      description: "Apply technology to agricultural production and management.",
      education: "Diploma",
      skills: ["Data Analysis"],
      sectors: ["Agriculture"],
      location: ["rural"]
    }
  ];
  
  // Filter and sort careers based on user input
  const suggestedCareers = allCareers
    .map(career => {
      // Calculate match score based on user inputs
      let score = 0;
      
      // Education match
      if (career.education === formData.education) score += 30;
      else if (
        (formData.education === "Postgraduate" && career.education === "Undergraduate") ||
        (formData.education === "Undergraduate" && (career.education === "Diploma" || career.education === "12th"))
      ) score += 20;
      else if (formData.education === "Diploma" && career.education === "12th") score += 15;
      
      // Skills match
      if (formData.skills) {
        const matchedSkills = formData.skills.filter(skill => career.skills.includes(skill));
        score += matchedSkills.length * 15;
      }
      
      // Sector match
      if (formData.sectors && formData.sectors.some(sector => career.sectors.includes(sector))) score += 20;
      
      // Location match
      if (career.location.includes(formData.location) || formData.location === "any") score += 15;
      
      return { ...career, match: Math.min(score, 100) };
    })
    .filter(career => career.match >= 50) // Only show careers with at least 50% match
    .sort((a, b) => b.match - a.match); // Sort by match score descending
  
  // Display results
  if (suggestedCareers.length === 0) {
    careerResults.innerHTML = `
      <div class="career-option">
        <h3>No perfect matches found</h3>
        <p>Based on your selections, we couldn't find perfect matches. Try expanding your skills or sector preferences.</p>
      </div>
    `;
  } else {
    suggestedCareers.forEach(career => {
      const careerElement = document.createElement('div');
      careerElement.className = 'career-option';
      careerElement.innerHTML = `
        <h3>${career.title}</h3>
        <p>${career.description}</p>
        <p><strong>Match: ${career.match}%</strong></p>
        <div class="progress-bar">
          <div class="progress" style="width: ${career.match}%"></div>
        </div>
      `;
      careerResults.appendChild(careerElement);
    });
    
    // Animate progress bars
    setTimeout(() => {
      document.querySelectorAll('.progress').forEach(progress => {
        progress.style.width = progress.style.width;
      });
    }, 100);
  }
}

// Optional: Setup swipe events for mobile
function setupSwipeEvents() {
  let touchStartX = 0;
  let touchEndX = 0;
  
  form.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  form.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - go to next step
      const nextBtn = steps[currentStep].querySelector('.next-btn');
      if (nextBtn) nextBtn.click();
    } else if (touchEndX > touchStartX + swipeThreshold && currentStep > 0) {
      // Swipe right - go to previous step
      steps[currentStep].classList.remove("active");
      currentStep--;
      showStep(currentStep);
    }
  }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', initForm);

// Add CSS for shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);