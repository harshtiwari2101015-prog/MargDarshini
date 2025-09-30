// Navbar Toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});

// Close menu when clicking on a link (mobile)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbarToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navbarMenu.classList.contains('active') && 
      !navbarMenu.contains(e.target) && 
      !navbarToggle.contains(e.target)) {
    navbarToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
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

// Service cards functionality
const serviceCards = document.querySelectorAll('.service-card');

function initForm() {
  // Show first step
  showStep(currentStep);
  
  // Setup service cards
  setupServiceCards();
  
  // Setup blog cards - ADD THIS LINE
  setupBlogCards();
  
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
    submitBtn.innerHTML = 'Analyzing...';
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
  
  // Expanded career data set
  const allCareers = [
    {
      title: "Software Developer",
      match: 85,
      description: "Create and maintain software applications. Great for those with programming skills.",
      education: "Undergraduate",
      skills: ["Programming", "Data Analysis", "Problem Solving"],
      sectors: ["IT"],
      location: ["urban", "remote"]
    },
    {
      title: "Data Analyst",
      match: 78,
      description: "Interpret complex data to help businesses make better decisions.",
      education: "Undergraduate",
      skills: ["Data Analysis", "MS Office", "Problem Solving"],
      sectors: ["IT", "Finance"],
      location: ["urban", "remote"]
    },
    {
      title: "Teacher",
      match: 92,
      description: "Educate students in various subjects. Requires good communication skills.",
      education: "Undergraduate",
      skills: ["Communication", "Creativity", "Leadership"],
      sectors: ["Education"],
      location: ["urban", "rural"]
    },
    {
      title: "Digital Marketing Specialist",
      match: 80,
      description: "Promote products and services through digital channels.",
      education: "Undergraduate",
      skills: ["Digital Marketing", "Communication", "Creativity"],
      sectors: ["IT", "Finance", "Retail"],
      location: ["urban", "remote"]
    },
    {
      title: "Healthcare Assistant",
      match: 75,
      description: "Support medical staff in providing care to patients.",
      education: "12th",
      skills: ["Communication", "Teamwork"],
      sectors: ["Healthcare"],
      location: ["urban", "rural"]
    },
    {
      title: "Agricultural Technician",
      match: 88,
      description: "Apply technology to agricultural production and management.",
      education: "Diploma",
      skills: ["Data Analysis", "Problem Solving"],
      sectors: ["Agriculture"],
      location: ["rural"]
    },
    {
      title: "Financial Analyst",
      match: 82,
      description: "Analyze financial data to help businesses make investment decisions.",
      education: "Undergraduate",
      skills: ["Data Analysis", "MS Office", "Problem Solving"],
      sectors: ["Finance"],
      location: ["urban", "remote"]
    },
    {
      title: "Graphic Designer",
      match: 79,
      description: "Create visual concepts to communicate ideas that inspire and inform.",
      education: "Undergraduate",
      skills: ["Creativity", "Communication", "Technical Writing"],
      sectors: ["Media", "IT"],
      location: ["urban", "remote"]
    },
    {
      title: "Project Manager",
      match: 85,
      description: "Plan and execute projects, ensuring they are completed on time and within budget.",
      education: "Undergraduate",
      skills: ["Leadership", "Communication", "Problem Solving", "Teamwork"],
      sectors: ["IT", "Finance", "Manufacturing"],
      location: ["urban", "remote"]
    },
    {
      title: "Sales Executive",
      match: 76,
      description: "Sell products and services to businesses or consumers.",
      education: "Undergraduate",
      skills: ["Communication", "Leadership", "Teamwork"],
      sectors: ["Retail", "IT", "Finance"],
      location: ["urban", "remote"]
    },
    {
      title: "Content Writer",
      match: 81,
      description: "Create written content for websites, blogs, and marketing materials.",
      education: "Undergraduate",
      skills: ["Communication", "Creativity", "Technical Writing"],
      sectors: ["Media", "IT", "Education"],
      location: ["urban", "remote"]
    },
    {
      title: "HR Specialist",
      match: 77,
      description: "Recruit, screen, and interview job applicants for open positions.",
      education: "Undergraduate",
      skills: ["Communication", "Leadership", "Teamwork"],
      sectors: ["IT", "Finance", "Manufacturing"],
      location: ["urban"]
    },
    {
      title: "Network Administrator",
      match: 83,
      description: "Maintain computer networks and ensure their smooth operation.",
      education: "Undergraduate",
      skills: ["Programming", "Problem Solving", "Technical Writing"],
      sectors: ["IT"],
      location: ["urban", "remote"]
    },
    {
      title: "Research Scientist",
      match: 90,
      description: "Conduct experiments and analyze results in various scientific fields.",
      education: "Postgraduate",
      skills: ["Data Analysis", "Problem Solving", "Technical Writing"],
      sectors: ["Healthcare", "Education", "Government"],
      location: ["urban"]
    },
    {
      title: "Hotel Manager",
      match: 74,
      description: "Oversee the daily operations of hotels and resorts.",
      education: "Undergraduate",
      skills: ["Leadership", "Communication", "Teamwork"],
      sectors: ["Hospitality"],
      location: ["urban", "rural"]
    },
    {
      title: "Web Developer",
      match: 87,
      description: "Build and maintain websites and web applications.",
      education: "Undergraduate",
      skills: ["Programming", "Creativity", "Problem Solving"],
      sectors: ["IT", "Media"],
      location: ["urban", "remote"]
    },
    {
      title: "Social Media Manager",
      match: 73,
      description: "Manage social media accounts and create engaging content.",
      education: "Undergraduate",
      skills: ["Digital Marketing", "Communication", "Creativity"],
      sectors: ["Media", "Retail", "IT"],
      location: ["urban", "remote"]
    },
    {
      title: "Mechanical Engineer",
      match: 89,
      description: "Design and develop mechanical systems and devices.",
      education: "Undergraduate",
      skills: ["Problem Solving", "Technical Writing", "Data Analysis"],
      sectors: ["Manufacturing", "Automotive"],
      location: ["urban"]
    },
    {
      title: "Nurse",
      match: 84,
      description: "Provide medical care and support to patients in healthcare settings.",
      education: "Undergraduate",
      skills: ["Communication", "Teamwork", "Problem Solving"],
      sectors: ["Healthcare"],
      location: ["urban", "rural"]
    },
    {
      title: "Accountant",
      match: 79,
      description: "Prepare and examine financial records for businesses and individuals.",
      education: "Undergraduate",
      skills: ["Data Analysis", "MS Office", "Problem Solving"],
      sectors: ["Finance", "Government"],
      location: ["urban", "remote"]
    },
    {
      title: "UX/UI Designer",
      match: 82,
      description: "Design user interfaces and experiences for digital products.",
      education: "Undergraduate",
      skills: ["Creativity", "Communication", "Problem Solving"],
      sectors: ["IT", "Media"],
      location: ["urban", "remote"]
    },
    {
      title: "Business Analyst",
      match: 81,
      description: "Analyze business processes and recommend improvements.",
      education: "Undergraduate",
      skills: ["Data Analysis", "Communication", "Problem Solving"],
      sectors: ["IT", "Finance", "Manufacturing"],
      location: ["urban", "remote"]
    },
    {
      title: "Electrician",
      match: 76,
      description: "Install and maintain electrical systems in buildings.",
      education: "Diploma",
      skills: ["Problem Solving", "Technical Writing"],
      sectors: ["Manufacturing", "Construction"],
      location: ["urban", "rural"]
    },
    {
      title: "Pharmacist",
      match: 91,
      description: "Dispense medications and provide pharmaceutical care.",
      education: "Postgraduate",
      skills: ["Communication", "Problem Solving", "Teamwork"],
      sectors: ["Healthcare"],
      location: ["urban", "rural"]
    },
    {
      title: "Journalist",
      match: 78,
      description: "Research and report news stories for various media outlets.",
      education: "Undergraduate",
      skills: ["Communication", "Creativity", "Technical Writing"],
      sectors: ["Media"],
      location: ["urban", "remote"]
    },
    {
      title: "Chef",
      match: 72,
      description: "Prepare and cook food in restaurants and other food establishments.",
      education: "Diploma",
      skills: ["Creativity", "Teamwork", "Leadership"],
      sectors: ["Hospitality"],
      location: ["urban", "rural"]
    },
    {
      title: "Cybersecurity Analyst",
      match: 88,
      description: "Protect computer systems and networks from cyber threats.",
      education: "Undergraduate",
      skills: ["Programming", "Problem Solving", "Data Analysis"],
      sectors: ["IT", "Government", "Finance"],
      location: ["urban", "remote"]
    },
    {
      title: "Architect",
      match: 86,
      description: "Design buildings and oversee their construction.",
      education: "Undergraduate",
      skills: ["Creativity", "Problem Solving", "Technical Writing"],
      sectors: ["Construction"],
      location: ["urban"]
    },
    {
      title: "Psychologist",
      match: 90,
      description: "Study mental processes and behavior to help people improve their lives.",
      education: "Postgraduate",
      skills: ["Communication", "Problem Solving", "Data Analysis"],
      sectors: ["Healthcare", "Education"],
      location: ["urban", "rural"]
    },
    {
      title: "Logistics Manager",
      match: 77,
      description: "Coordinate and manage the supply chain and distribution of goods.",
      education: "Undergraduate",
      skills: ["Leadership", "Problem Solving", "Data Analysis"],
      sectors: ["Manufacturing", "Retail"],
      location: ["urban"]
    },
    {
      title: "Fitness Trainer",
      match: 71,
      description: "Help clients achieve their fitness goals through exercise programs.",
      education: "Diploma",
      skills: ["Communication", "Leadership", "Teamwork"],
      sectors: ["Healthcare", "Hospitality"],
      location: ["urban", "rural"]
    },
    {
      title: "Environmental Scientist",
      match: 83,
      description: "Study the environment and develop solutions to environmental problems.",
      education: "Undergraduate",
      skills: ["Data Analysis", "Problem Solving", "Technical Writing"],
      sectors: ["Government", "Agriculture"],
      location: ["urban", "rural"]
    },
    {
      title: "Legal Assistant",
      match: 75,
      description: "Support lawyers with legal research and document preparation.",
      education: "Undergraduate",
      skills: ["Communication", "Technical Writing", "MS Office"],
      sectors: ["Government", "Legal"],
      location: ["urban"]
    },
    {
      title: "Video Editor",
      match: 74,
      description: "Edit and assemble recorded footage into a finished product.",
      education: "Undergraduate",
      skills: ["Creativity", "Technical Writing", "Communication"],
      sectors: ["Media"],
      location: ["urban", "remote"]
    },
    {
      title: "Real Estate Agent",
      match: 70,
      description: "Help clients buy, sell, and rent properties.",
      education: "Undergraduate",
      skills: ["Communication", "Leadership", "MS Office"],
      sectors: ["Real Estate"],
      location: ["urban", "rural"]
    },
    {
      title: "Data Scientist",
      match: 93,
      description: "Extract insights from complex data using advanced analytical methods.",
      education: "Postgraduate",
      skills: ["Programming", "Data Analysis", "Problem Solving"],
      sectors: ["IT", "Finance", "Healthcare"],
      location: ["urban", "remote"]
    },
    {
      title: "Customer Service Representative",
      match: 68,
      description: "Assist customers with inquiries and resolve issues.",
      education: "12th",
      skills: ["Communication", "Problem Solving", "Teamwork"],
      sectors: ["Retail", "IT", "Finance"],
      location: ["urban", "remote"]
    },
    {
      title: "Biomedical Engineer",
      match: 89,
      description: "Design medical equipment and devices to improve healthcare.",
      education: "Undergraduate",
      skills: ["Problem Solving", "Technical Writing", "Data Analysis"],
      sectors: ["Healthcare", "Manufacturing"],
      location: ["urban"]
    },
    {
      title: "Event Planner",
      match: 73,
      description: "Organize and coordinate events such as weddings and conferences.",
      education: "Undergraduate",
      skills: ["Communication", "Creativity", "Leadership"],
      sectors: ["Hospitality"],
      location: ["urban"]
    },
    {
      title: "Market Research Analyst",
      match: 80,
      description: "Study market conditions to examine potential sales of products and services.",
      education: "Undergraduate",
      skills: ["Data Analysis", "Communication", "Problem Solving"],
      sectors: ["Retail", "Finance", "Media"],
      location: ["urban", "remote"]
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
      else if (formData.education === "Other") score += 10;
      
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
    .sort((a, b) => b.match - a.match) // Sort by match score descending
    .slice(0, 5); // Restrict to 5 suggestions max
  
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
// Update the setupServiceCards function in script.js
function setupServiceCards() {
  serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent flipping if clicking on a link
      if (e.target.closest('a')) {
        return;
      }
      
      if (window.innerWidth <= 768) {
        // Close all other cards
        serviceCards.forEach(otherCard => {
          if (otherCard !== card && otherCard.classList.contains('flipped')) {
            otherCard.classList.remove('flipped');
          }
        });
        
        // Toggle current card
        card.classList.toggle('flipped');
      }
    });
  });
}
// Setup service cards to navigate to their pages
function setupServiceCards() {
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.querySelector('.service-link');
      if (link && link.getAttribute('href') && link.getAttribute('href') !== '#') {
        window.location.href = link.getAttribute('href');
      }
    });
    
    // Add hover effect for desktop
    card.style.cursor = 'pointer';
    card.style.transition = 'transform 0.3s ease';
    
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        card.style.transform = 'translateY(-5px)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}
// Setup service cards to navigate to their pages
function setupServiceCards() {
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.querySelector('.service-link');
      if (link && link.getAttribute('href') && link.getAttribute('href') !== '#') {
        window.location.href = link.getAttribute('href');
      }
    });
    
    // Add hover effect for desktop only
    if (window.innerWidth > 768) {
      card.style.cursor = 'pointer';
      card.style.transition = 'transform 0.3s ease';
      
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    }
  });
}
// Setup service cards to navigate to their pages
function setupServiceCards() {
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.querySelector('.service-link');
      if (link && link.getAttribute('href') && link.getAttribute('href') !== '#') {
        window.location.href = link.getAttribute('href');
      }
    });
    
    // Add hover effect for desktop
    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.3s ease';
    
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        card.style.transform = 'translateY(-5px)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}
// Make blog cards clickable
function setupBlogCards() {
  const blogCards = document.querySelectorAll('.blog-card');
  
  blogCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking on the Read More link
      if (e.target.closest('.blog-link')) {
        return;
      }
      
      const link = card.querySelector('.blog-link');
      if (link && link.href && link.href !== '#') {
        window.location.href = link.href;
      }
    });
    
    // Add pointer cursor
    card.style.cursor = 'pointer';
  });
}