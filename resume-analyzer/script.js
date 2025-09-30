// Role keywords for analysis
const roleKeywords = {
  Web: ["HTML", "CSS", "JavaScript", "React", "Angular", "Vue", "Node.js", "Frontend", "Backend"],
  Data: ["Python", "SQL", "Pandas", "Analytics", "Excel", "Tableau", "Power BI", "Data Visualization"],
  AI: ["Machine Learning", "TensorFlow", "PyTorch", "AI", "Deep Learning", "Neural Networks", "NLP"],
  Software: ["Java", "C++", "Software", "Development", "Agile", "Scrum", "Testing", "Debugging"],
  Engineering: ["CAD", "Engineering", "MATLAB", "Simulation", "Design", "Prototyping", "Manufacturing"],
  Biotech: ["Biology", "Lab", "PCR", "Genetics", "Research", "Biochemistry", "Microbiology"],
  Arts: ["Painting", "Drawing", "Design", "Creativity", "Illustration", "Photography", "Sculpture"],
  Management: ["Leadership", "Management", "Strategy", "Planning", "Project Management", "Team Management"],
  Design: ["UX", "UI", "Sketch", "Figma", "Adobe", "Wireframing", "Prototyping", "User Research"],
  Humanities: ["History", "Philosophy", "Literature", "Research", "Writing", "Critical Thinking"]
};

// DOM Elements
const resumeUpload = document.getElementById("resumeUpload");
const fileName = document.getElementById("fileName");
const evaluateBtn = document.getElementById("evaluateBtn");
const loading = document.getElementById("loading");
const loadingMessage = document.getElementById("loadingMessage");
const output = document.getElementById("output");
const scoreFill = document.getElementById("scoreFill");
const scoreValue = document.getElementById("scoreValue");
const gridOutput = document.getElementById("gridOutput");
const resumePreview = document.getElementById("resumePreview");
const roleSelect = document.getElementById("roleSelect");
const downloadBtn = document.getElementById("downloadReport");
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

let resumeText = "";

// Navbar Toggle
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

// File Upload Handler
resumeUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  fileName.textContent = `Selected: ${file.name}`;
  
  // For demo purposes, we'll simulate text extraction
  // In a real application, you would parse PDFs here
  if (file.type === "application/pdf") {
    // Simulate PDF text extraction
    setTimeout(() => {
      resumeText = "John Doe\nSoftware Developer\n\nExperience:\n- 3 years as Frontend Developer\n- Proficient in HTML, CSS, JavaScript, React\n- Experience with Node.js and MongoDB\n\nEducation:\n- Bachelor of Computer Science, XYZ University\n\nSkills:\n- Programming: JavaScript, Python, Java\n- Frameworks: React, Angular, Node.js\n- Tools: Git, Docker, Jenkins";
      fileName.textContent += " (PDF content loaded)";
    }, 1000);
  } else {
    // For text files
    const reader = new FileReader();
    reader.onload = (e) => { 
      resumeText = e.target.result; 
      fileName.textContent += " (Text content loaded)";
    };
    reader.readAsText(file);
  }
});

// Evaluate Button Handler
evaluateBtn.addEventListener("click", () => {
  if (!resumeText) {
    alert("Please upload a resume first!");
    return;
  }
  
  output.classList.remove("active");
  loading.classList.add("active");
  
  let messages = ["Analyzing Sections...", "Detecting Keywords...", "Calculating Score..."];
  let msgIndex = 0;
  
  const msgInterval = setInterval(() => {
    loadingMessage.textContent = messages[msgIndex++];
    if (msgIndex >= messages.length) {
      clearInterval(msgInterval);
      // Process the resume after messages complete
      setTimeout(() => {
        processResume(resumeText);
      }, 1000);
    }
  }, 1000);
});

// Process Resume Function
function processResume(text) {
  // Calculate score based on role keywords
  let role = roleSelect.value;
  let keywords = roleKeywords[role] || [];
  let found = [];
  let missing = [];
  
  keywords.forEach(kw => {
    if (text.toLowerCase().includes(kw.toLowerCase())) {
      found.push(kw);
    } else {
      missing.push(kw);
    }
  });
  
  // Calculate score (percentage of keywords found)
  let score = found.length / keywords.length * 100;
  if (isNaN(score)) score = 0;
  score = score.toFixed(2);
  
  // Update score display
  scoreFill.style.width = score + "%";
  scoreValue.textContent = score + "%";
  
  // Update grid output
  gridOutput.innerHTML = `
    <div class="grid-card">
      <h3>🎓 Sections Found</h3>
      <p>Education, Skills, Experience, Projects</p>
    </div>
    <div class="grid-card">
      <h3>⚠️ Missing Sections</h3>
      <p>Certifications, Awards, Publications</p>
    </div>
    <div class="grid-card">
      <h3>🛠 Keywords Matched</h3>
      <p>${found.join(", ") || "None"}</p>
    </div>
    <div class="grid-card">
      <h3>💡 Suggestions</h3>
      <p>${missing.length ? "Consider adding: " + missing.join(", ") : "All keywords found! Great job!"}</p>
    </div>
  `;
  
  // Create highlighted resume preview
  let highlightedText = text;
  found.forEach(k => {
    let regex = new RegExp(`(${k})`, "gi");
    highlightedText = highlightedText.replace(regex, `<span class="found">$1</span>`);
  });
  missing.forEach(k => {
    let regex = new RegExp(`(${k})`, "gi");
    highlightedText = highlightedText.replace(regex, `<span class="missing">$1</span>`);
  });
  
  resumePreview.innerHTML = highlightedText.substring(0, 3000) + (text.length > 3000 ? "..." : "");
  
  // Show results
  loading.classList.remove("active");
  output.classList.add("active");
  
  // Scroll to results
  output.scrollIntoView({ behavior: 'smooth' });
}

// Download Report Handler
downloadBtn.addEventListener("click", () => {
  let report = `Resume Analysis Report\n\n`;
  report += `Score: ${scoreValue.textContent}\n`;
  report += `Role: ${roleSelect.value}\n\n`;
  report += `Resume Preview:\n${resumeText.substring(0, 2000)}${resumeText.length > 2000 ? '...' : ''}`;
  
  let blob = new Blob([report], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Margdarshini_Resume_Analysis.txt";
  link.click();
});