// Resume Builder JavaScript - Mobile First
console.log('Script loaded - starting resume builder');

// Define loadSampleData function at the top
function loadSampleData() {
    console.log('loadSampleData function called');
    return {
        personal: {
            fullName: 'Aarav Sharma',
            email: 'aarav.sharma@email.com',
            phone: '+91 9876543210',
            location: 'Mumbai, Maharashtra',
            linkedin: 'https://linkedin.com/in/aaravsharma',
            github: 'https://github.com/aaravsharma',
            summary: 'Experienced software developer with 5+ years in web development. Passionate about creating efficient and scalable applications using modern technologies.'
        },
        experience: [
            {
                id: 1,
                title: 'Senior Software Developer',
                company: 'Tech Solutions Inc.',
                startDate: 'Jan 2022',
                endDate: 'Present',
                description: 'Lead development team in creating web applications using React, Node.js, and MongoDB. Implemented CI/CD pipelines reducing deployment time by 40%.'
            },
            {
                id: 2,
                title: 'Software Developer',
                company: 'Web Innovators',
                startDate: 'Jun 2019',
                endDate: 'Dec 2021',
                description: 'Developed and maintained client websites using JavaScript, PHP, and MySQL. Collaborated with designers to implement responsive web designs.'
            }
        ],
        education: [
            {
                id: 3,
                degree: 'Bachelor of Technology in Computer Science',
                institution: 'Indian Institute of Technology, Delhi',
                year: '2015-2019',
                grade: '8.9 CGPA'
            }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker', 'Git']
    };
}

class ResumeBuilder {
    constructor() {
        console.log('ResumeBuilder constructor called');
        this.currentTemplate = 'basic';
        this.resumeData = {
            personal: {
                fullName: '',
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                summary: ''
            },
            experience: [],
            education: [],
            skills: []
        };
        
        this.isSampleDataActive = false;
        this.init();
    }

    init() {
        console.log('ResumeBuilder init called');
        this.setupNavbar();
        this.setupEventListeners();
        this.setupMobileEvents();
        this.loadFromLocalStorage();
        this.renderPreview();
        this.addSampleDataButton();
    }

    setupNavbar() {
        // Mobile navbar toggle
        const navbarToggle = document.querySelector('.navbar-toggle');
        const navbarMenu = document.querySelector('.navbar-menu');
        
        if (navbarToggle && navbarMenu) {
            navbarToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navbarToggle.classList.toggle('active');
                navbarMenu.classList.toggle('active');
            });
            
            // Close navbar when clicking on a link
            document.querySelectorAll('.navbar-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    navbarToggle.classList.remove('active');
                    navbarMenu.classList.remove('active');
                });
            });
            
            // Close navbar when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
                    navbarToggle.classList.remove('active');
                    navbarMenu.classList.remove('active');
                }
            });
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners');
        
        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => this.selectTemplate(card));
        });

        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn));
        });

        // Form inputs
        document.querySelectorAll('#personal-tab input, #personal-tab textarea').forEach(input => {
            input.addEventListener('input', () => this.updatePersonalInfo(input));
        });

        // Add experience/education
        const addExperienceBtn = document.getElementById('addExperience');
        const addEducationBtn = document.getElementById('addEducation');
        
        if (addExperienceBtn) {
            addExperienceBtn.addEventListener('click', () => this.addExperience());
        }
        
        if (addEducationBtn) {
            addEducationBtn.addEventListener('click', () => this.addEducation());
        }

        // Skills input
        const skillsInput = document.getElementById('skillsInput');
        if (skillsInput) {
            skillsInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addSkill();
                }
            });
        }

        // Export buttons
        const downloadPdfBtn = document.getElementById('downloadPdf');
        const printResumeBtn = document.getElementById('printResume');
        
        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', () => this.downloadPdf());
        }
        
        if (printResumeBtn) {
            printResumeBtn.addEventListener('click', () => this.printResume());
        }

        // Auto-save
        setInterval(() => this.saveToLocalStorage(), 3000);
    }

    setupMobileEvents() {
        // Touch events for mobile
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('touchstart', (e) => {
                e.preventDefault();
                card.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', (e) => {
                e.preventDefault();
                card.style.transform = '';
                this.selectTemplate(card);
            });
        });

        // Better touch handling for mobile buttons
        document.querySelectorAll('.preview-btn, .add-btn, .tab-btn').forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.opacity = '0.7';
            });
            
            btn.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
    }

    addSampleDataButton() {
        console.log('Adding sample data button...');
        const sampleButton = document.createElement('button');
        sampleButton.id = 'sampleDataBtn';
        sampleButton.className = 'preview-btn secondary';
        sampleButton.innerHTML = '<i class="fas fa-magic"></i> Load Sample Data';
        sampleButton.style.marginTop = '1rem';
        
        sampleButton.addEventListener('click', () => {
            console.log('Sample data button clicked, current state:', this.isSampleDataActive);
            
            if (!this.isSampleDataActive) {
                // Load sample data
                if (confirm('Load sample data? This will overwrite your current data.')) {
                    this.loadSampleData();
                    this.isSampleDataActive = true;
                    sampleButton.innerHTML = '<i class="fas fa-trash"></i> Clear Sample Data';
                    sampleButton.style.backgroundColor = '#ff6b6b';
                    console.log('Sample data loaded, button state changed to clear');
                    alert('Sample data loaded successfully!');
                }
            } else {
                // Clear sample data
                if (confirm('Clear all sample data and start fresh?')) {
                    this.clearSampleData();
                    this.isSampleDataActive = false;
                    sampleButton.innerHTML = '<i class="fas fa-magic"></i> Load Sample Data';
                    sampleButton.style.backgroundColor = '';
                    console.log('Sample data cleared, button state changed to load');
                    alert('All data cleared successfully!');
                }
            }
        });

        const previewActions = document.querySelector('.preview-actions');
        if (previewActions) {
            previewActions.appendChild(sampleButton);
            console.log('Toggle sample data button added to DOM');
        } else {
            console.log('Preview actions container not found');
        }
    }

    loadSampleData() {
        this.resumeData = loadSampleData();
        this.updateFormFields();
        this.renderExperienceList();
        this.renderEducationList();
        this.renderSkillsTags();
        this.renderPreview();
        this.saveToLocalStorage();
    }

    clearSampleData() {
        this.resumeData = {
            personal: { 
                fullName: '', 
                email: '', 
                phone: '', 
                location: '', 
                linkedin: '', 
                github: '', 
                summary: '' 
            },
            experience: [],
            education: [],
            skills: []
        };
        this.updateFormFields();
        this.renderExperienceList();
        this.renderEducationList();
        this.renderSkillsTags();
        this.renderPreview();
        this.saveToLocalStorage();
    }

    updateFormFields() {
        // Update personal info form fields
        const personal = this.resumeData.personal;
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const location = document.getElementById('location');
        const linkedin = document.getElementById('linkedin');
        const github = document.getElementById('github');
        const summary = document.getElementById('summary');
        
        if (fullName) fullName.value = personal.fullName || '';
        if (email) email.value = personal.email || '';
        if (phone) phone.value = personal.phone || '';
        if (location) location.value = personal.location || '';
        if (linkedin) linkedin.value = personal.linkedin || '';
        if (github) github.value = personal.github || '';
        if (summary) summary.value = personal.summary || '';
    }

    selectTemplate(card) {
        document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.currentTemplate = card.dataset.template;
        this.renderPreview();
    }

    switchTab(btn) {
        const tabName = btn.dataset.tab;
        
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetTab = document.getElementById(`${tabName}-tab`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    }

    updatePersonalInfo(input) {
        const field = input.id;
        this.resumeData.personal[field] = input.value;
        this.renderPreview();
    }

    addExperience() {
        const experience = {
            id: Date.now(),
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            description: '',
            current: false
        };

        this.resumeData.experience.push(experience);
        this.renderExperienceList();
        this.renderPreview();
    }

    addEducation() {
        const education = {
            id: Date.now(),
            degree: '',
            institution: '',
            year: '',
            grade: ''
        };

        this.resumeData.education.push(education);
        this.renderEducationList();
        this.renderPreview();
    }

    addSkill() {
        const input = document.getElementById('skillsInput');
        if (!input) return;
        
        const skill = input.value.trim();
        
        if (skill && !this.resumeData.skills.includes(skill)) {
            this.resumeData.skills.push(skill);
            this.renderSkillsTags();
            input.value = '';
            this.renderPreview();
        }
    }

    removeSkill(skill) {
        this.resumeData.skills = this.resumeData.skills.filter(s => s !== skill);
        this.renderSkillsTags();
        this.renderPreview();
    }

    renderExperienceList() {
        const container = document.getElementById('experienceList');
        if (!container) return;
        
        container.innerHTML = '';

        this.resumeData.experience.forEach(exp => {
            const expElement = document.createElement('div');
            expElement.className = 'experience-item';
            expElement.innerHTML = `
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" value="${exp.title}" 
                           oninput="window.resumeBuilder.updateExperience(${exp.id}, 'title', this.value)"
                           placeholder="Software Engineer">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" value="${exp.company}" 
                           oninput="window.resumeBuilder.updateExperience(${exp.id}, 'company', this.value)"
                           placeholder="Tech Company Inc.">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="text" value="${exp.startDate}" 
                               oninput="window.resumeBuilder.updateExperience(${exp.id}, 'startDate', this.value)"
                               placeholder="Jan 2020">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="text" value="${exp.endDate}" 
                               oninput="window.resumeBuilder.updateExperience(${exp.id}, 'endDate', this.value)"
                               placeholder="Present">
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea oninput="window.resumeBuilder.updateExperience(${exp.id}, 'description', this.value)"
                              placeholder="Describe your responsibilities and achievements...">${exp.description}</textarea>
                </div>
                <button class="remove-btn" onclick="window.resumeBuilder.removeExperience(${exp.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            `;
            container.appendChild(expElement);
        });
    }

    renderEducationList() {
        const container = document.getElementById('educationList');
        if (!container) return;
        
        container.innerHTML = '';

        this.resumeData.education.forEach(edu => {
            const eduElement = document.createElement('div');
            eduElement.className = 'education-item';
            eduElement.innerHTML = `
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" value="${edu.degree}" 
                           oninput="window.resumeBuilder.updateEducation(${edu.id}, 'degree', this.value)"
                           placeholder="Bachelor of Technology">
                </div>
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" value="${edu.institution}" 
                           oninput="window.resumeBuilder.updateEducation(${edu.id}, 'institution', this.value)"
                           placeholder="University Name">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Year</label>
                        <input type="text" value="${edu.year}" 
                               oninput="window.resumeBuilder.updateEducation(${edu.id}, 'year', this.value)"
                               placeholder="2020-2024">
                    </div>
                    <div class="form-group">
                        <label>Grade</label>
                        <input type="text" value="${edu.grade}" 
                               oninput="window.resumeBuilder.updateEducation(${edu.id}, 'grade', this.value)"
                               placeholder="8.5 CGPA">
                    </div>
                </div>
                <button class="remove-btn" onclick="window.resumeBuilder.removeEducation(${edu.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            `;
            container.appendChild(eduElement);
        });
    }

    renderSkillsTags() {
        const container = document.getElementById('skillsTags');
        if (!container) return;
        
        container.innerHTML = '';

        this.resumeData.skills.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag-input';
            tag.innerHTML = `
                ${skill}
                <span class="remove" onclick="window.resumeBuilder.removeSkill('${skill}')">×</span>
            `;
            container.appendChild(tag);
        });
    }

    updateExperience(id, field, value) {
        const experience = this.resumeData.experience.find(exp => exp.id === id);
        if (experience) {
            experience[field] = value;
            this.renderPreview();
        }
    }

    updateEducation(id, field, value) {
        const education = this.resumeData.education.find(edu => edu.id === id);
        if (education) {
            education[field] = value;
            this.renderPreview();
        }
    }

    removeExperience(id) {
        this.resumeData.experience = this.resumeData.experience.filter(exp => exp.id !== id);
        this.renderExperienceList();
        this.renderPreview();
    }

    removeEducation(id) {
        this.resumeData.education = this.resumeData.education.filter(edu => edu.id !== id);
        this.renderEducationList();
        this.renderPreview();
    }

    renderPreview() {
        const container = document.getElementById('resumePreview');
        if (!container) return;
        
        if (this.currentTemplate === 'basic') {
            container.innerHTML = this.renderBasicTemplate();
        } else if (this.currentTemplate === 'modern') {
            container.innerHTML = this.renderModernTemplate();
        } else {
            container.innerHTML = this.renderProfessionalTemplate();
        }
    }

    renderBasicTemplate() {
        const { personal, experience, education, skills } = this.resumeData;
        
        return `
            <div class="resume-template basic">
                <div class="resume-header-preview">
                    <h1 class="resume-name">${personal.fullName || 'Your Name'}</h1>
                    <div class="resume-contact">
                        ${personal.email ? `<div class="contact-item"><i class="fas fa-envelope"></i> ${personal.email}</div>` : ''}
                        ${personal.phone ? `<div class="contact-item"><i class="fas fa-phone"></i> ${personal.phone}</div>` : ''}
                        ${personal.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${personal.location}</div>` : ''}
                        ${personal.linkedin ? `<div class="contact-item"><i class="fab fa-linkedin"></i> ${personal.linkedin}</div>` : ''}
                        ${personal.github ? `<div class="contact-item"><i class="fab fa-github"></i> ${personal.github}</div>` : ''}
                    </div>
                </div>

                ${personal.summary ? `
                <div class="section">
                    <h2 class="section-title">Summary</h2>
                    <p>${personal.summary}</p>
                </div>
                ` : ''}

                ${experience.length > 0 ? `
                <div class="section">
                    <h2 class="section-title">Experience</h2>
                    ${experience.map(exp => `
                        <div class="experience-item">
                            <div class="item-header">
                                <span class="item-title">${exp.title || 'Job Title'}</span>
                                <span class="item-date">${exp.startDate || 'Start'} - ${exp.endDate || 'End'}</span>
                            </div>
                            <div class="item-subtitle">${exp.company || 'Company'}</div>
                            <p>${exp.description || 'Description of responsibilities and achievements.'}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${education.length > 0 ? `
                <div class="section">
                    <h2 class="section-title">Education</h2>
                    ${education.map(edu => `
                        <div class="education-item">
                            <div class="item-header">
                                <span class="item-title">${edu.degree || 'Degree'}</span>
                                <span class="item-date">${edu.year || 'Year'}</span>
                            </div>
                            <div class="item-subtitle">${edu.institution || 'Institution'}</div>
                            ${edu.grade ? `<p>Grade: ${edu.grade}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${skills.length > 0 ? `
                <div class="section">
                    <h2 class="section-title">Skills</h2>
                    <div class="skills-list">
                        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }

    renderModernTemplate() {
        const { personal, experience, education, skills } = this.resumeData;
        
        return `
            <div class="resume-template modern">
                <div class="resume-content-grid">
                    <div class="resume-main">
                        <div class="resume-header-preview">
                            <h1 class="resume-name">${personal.fullName || 'Your Name'}</h1>
                            <div class="resume-title">${personal.summary ? personal.summary.split('.')[0] : 'Professional Summary'}</div>
                        </div>

                        ${experience.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Work Experience</h2>
                            ${experience.map(exp => `
                                <div class="experience-item">
                                    <div class="item-header">
                                        <span class="item-title">${exp.title || 'Job Title'}</span>
                                        <span class="item-date">${exp.startDate || 'Start'} - ${exp.endDate || 'End'}</span>
                                    </div>
                                    <div class="item-subtitle">${exp.company || 'Company'}</div>
                                    <p>${exp.description || 'Description of responsibilities and achievements.'}</p>
                                </div>
                            `).join('')}
                        </div>
                        ` : ''}

                        ${education.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Education</h2>
                            ${education.map(edu => `
                                <div class="education-item">
                                    <div class="item-header">
                                        <span class="item-title">${edu.degree || 'Degree'}</span>
                                        <span class="item-date">${edu.year || 'Year'}</span>
                                    </div>
                                    <div class="item-subtitle">${edu.institution || 'Institution'}</div>
                                    ${edu.grade ? `<p>Grade: ${edu.grade}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>

                    <div class="resume-sidebar">
                        ${personal.email || personal.phone || personal.location ? `
                        <div class="section">
                            <h2 class="section-title">Contact</h2>
                            <div class="contact-info">
                                ${personal.email ? `<div class="contact-item"><i class="fas fa-envelope"></i> ${personal.email}</div>` : ''}
                                ${personal.phone ? `<div class="contact-item"><i class="fas fa-phone"></i> ${personal.phone}</div>` : ''}
                                ${personal.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${personal.location}</div>` : ''}
                            </div>
                        </div>
                        ` : ''}

                        ${skills.length > 0 ? `
                        <div class="section">
                            <h2 class="section-title">Skills</h2>
                            <div class="skills-list">
                                ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            </div>
                        </div>
                        ` : ''}

                        ${personal.linkedin || personal.github ? `
                        <div class="section">
                            <h2 class="section-title">Links</h2>
                            <div class="links-list">
                                ${personal.linkedin ? `<a href="${personal.linkedin}" class="link-item"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                                ${personal.github ? `<a href="${personal.github}" class="link-item"><i class="fab fa-github"></i> GitHub</a>` : ''}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    renderProfessionalTemplate() {
        const { personal, experience, education, skills } = this.resumeData;
        
        return `
            <div class="resume-template professional">
                <div class="resume-header-preview" style="text-align: left; border-bottom: 3px solid #2e7d32; padding-bottom: 1.5rem;">
                    <h1 class="resume-name" style="font-size: 2.2rem; color: #2e7d32; margin-bottom: 0.5rem;">${personal.fullName || 'Your Name'}</h1>
                    <div class="resume-contact" style="flex-direction: row; gap: 2rem; justify-content: flex-start;">
                        ${personal.email ? `<div class="contact-item"><i class="fas fa-envelope"></i> ${personal.email}</div>` : ''}
                        ${personal.phone ? `<div class="contact-item"><i class="fas fa-phone"></i> ${personal.phone}</div>` : ''}
                        ${personal.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${personal.location}</div>` : ''}
                    </div>
                </div>

                ${personal.summary ? `
                <div class="section">
                    <h2 class="section-title">Professional Summary</h2>
                    <p style="font-size: 1.1rem; line-height: 1.8;">${personal.summary}</p>
                </div>
                ` : ''}

                ${experience.length > 0 ? `
                <div class="section">
                    <h2 class="section-title">Professional Experience</h2>
                    ${experience.map(exp => `
                        <div class="experience-item" style="margin-bottom: 2rem;">
                            <div class="item-header" style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <span class="item-title" style="font-size: 1.2rem; font-weight: bold;">${exp.title || 'Job Title'}</span>
                                    <div class="item-subtitle" style="font-size: 1.1rem; color: #555;">${exp.company || 'Company'}</div>
                                </div>
                                <span class="item-date" style="font-weight: bold; color: #2e7d32;">${exp.startDate || 'Start'} - ${exp.endDate || 'End'}</span>
                            </div>
                            <p style="margin-top: 0.5rem; line-height: 1.6;">${exp.description || 'Description of responsibilities and achievements.'}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                    ${education.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Education</h2>
                        ${education.map(edu => `
                            <div class="education-item" style="margin-bottom: 1.5rem;">
                                <div class="item-header">
                                    <span class="item-title" style="font-weight: bold;">${edu.degree || 'Degree'}</span>
                                    <span class="item-date" style="color: #2e7d32;">${edu.year || 'Year'}</span>
                                </div>
                                <div class="item-subtitle">${edu.institution || 'Institution'}</div>
                                ${edu.grade ? `<p style="margin-top: 0.3rem;"><strong>Grade:</strong> ${edu.grade}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}

                    ${skills.length > 0 ? `
                    <div class="section">
                        <h2 class="section-title">Skills & Competencies</h2>
                        <div class="professional-skills">
                            ${skills.map(skill => `
                                <div style="background: #f8f9fa; padding: 0.8rem; border-radius: 5px; text-align: center; font-weight: bold;">
                                    ${skill}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>

                ${personal.linkedin || personal.github ? `
                <div class="section">
                    <h2 class="section-title">Professional Links</h2>
                    <div style="display: flex; gap: 2rem;">
                        ${personal.linkedin ? `<a href="${personal.linkedin}" style="color: #2e7d32; text-decoration: none;"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                        ${personal.github ? `<a href="${personal.github}" style="color: #2e7d32; text-decoration: none;"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }

    downloadPdf() {
        const element = document.getElementById('resumePreview');
        const buttons = document.querySelector('.preview-actions');
        
        if (!element || !buttons) return;
        
        // Check if there's any data to download
        const hasData = this.resumeData.personal.fullName || 
                       this.resumeData.experience.length > 0 || 
                       this.resumeData.education.length > 0 || 
                       this.resumeData.skills.length > 0;
        
        if (!hasData) {
            alert('Please add some content to your resume before downloading.');
            return;
        }
        
        buttons.classList.add('loading');
        
        const options = {
            margin: 10,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Create a temporary container for better PDF rendering
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.width = '210mm';
        tempContainer.style.padding = '20mm';
        tempContainer.style.background = 'white';
        tempContainer.innerHTML = element.innerHTML;
        document.body.appendChild(tempContainer);

        html2pdf().set(options).from(tempContainer).save().then(() => {
            document.body.removeChild(tempContainer);
            buttons.classList.remove('loading');
        }).catch((error) => {
            console.error('PDF generation error:', error);
            document.body.removeChild(tempContainer);
            buttons.classList.remove('loading');
            alert('Error generating PDF. Please try again or use the Print option.');
        });
    }

    printResume() {
        const hasData = this.resumeData.personal.fullName || 
                       this.resumeData.experience.length > 0 || 
                       this.resumeData.education.length > 0 || 
                       this.resumeData.skills.length > 0;
        
        if (!hasData) {
            alert('Please add some content to your resume before printing.');
            return;
        }

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Resume - ${this.resumeData.personal.fullName || 'Your Resume'}</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 20mm; 
                        line-height: 1.6;
                        color: #333;
                    }
                    .resume-name { 
                        font-size: 24px; 
                        font-weight: bold; 
                        color: #2e7d32;
                        margin-bottom: 10px;
                    }
                    .section-title {
                        font-size: 18px;
                        color: #2e7d32;
                        border-bottom: 2px solid #4caf50;
                        padding-bottom: 5px;
                        margin: 20px 0 10px 0;
                    }
                    .experience-item, .education-item {
                        margin-bottom: 15px;
                    }
                    .item-header {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 5px;
                    }
                    .item-title {
                        font-weight: bold;
                    }
                    .item-date {
                        color: #666;
                    }
                    .skills-list {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                    }
                    .skill-tag {
                        background: #e8f5e8;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 14px;
                    }
                    @media print {
                        body { margin: 0; }
                    }
                </style>
            </head>
            <body>
                ${document.getElementById('resumePreview').innerHTML}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for content to load before printing
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('resumeData', JSON.stringify(this.resumeData));
            localStorage.setItem('currentTemplate', this.currentTemplate);
            localStorage.setItem('isSampleDataActive', this.isSampleDataActive);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('resumeData');
            const savedTemplate = localStorage.getItem('currentTemplate');
            const savedSampleData = localStorage.getItem('isSampleDataActive');
            
            if (savedData) {
                this.resumeData = JSON.parse(savedData);
                this.updateFormFields();
                this.renderExperienceList();
                this.renderEducationList();
                this.renderSkillsTags();
            }
            
            if (savedTemplate) {
                this.currentTemplate = savedTemplate;
                document.querySelectorAll('.template-card').forEach(card => {
                    card.classList.toggle('active', card.dataset.template === savedTemplate);
                });
            }
            
            if (savedSampleData) {
                this.isSampleDataActive = savedSampleData === 'true';
                const sampleBtn = document.getElementById('sampleDataBtn');
                if (sampleBtn) {
                    if (this.isSampleDataActive) {
                        sampleBtn.innerHTML = '<i class="fas fa-trash"></i> Clear Sample Data';
                        sampleBtn.style.backgroundColor = '#ff6b6b';
                    } else {
                        sampleBtn.innerHTML = '<i class="fas fa-magic"></i> Load Sample Data';
                        sampleBtn.style.backgroundColor = '';
                    }
                }
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
    }
}

// Initialize the resume builder when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing resume builder');
    window.resumeBuilder = new ResumeBuilder();
});