// resources.js - Enhanced Resources Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // View More functionality for question banks
    const viewMoreFifty = document.getElementById('view-more-fifty');
    const viewMoreBehavioral = document.getElementById('view-more-behavioral');
    
    // Expandable question functionality for 50 questions
    if (viewMoreFifty) {
        viewMoreFifty.addEventListener('click', function() {
            const isExpanded = this.dataset.expanded === 'true';
            
            if (!isExpanded) {
                // Create and show additional question columns
                const additionalQuestions = createAdditionalFiftyQuestions();
                const questionsGrid = document.querySelector('#fifty-questions .questions-grid');
                
                additionalQuestions.forEach(column => {
                    questionsGrid.appendChild(column);
                });
                
                this.textContent = 'Show Less Questions';
                this.dataset.expanded = 'true';
            } else {
                // Hide additional questions
                const additionalColumns = document.querySelectorAll('#fifty-questions .question-column:nth-child(n+4)');
                additionalColumns.forEach(col => col.remove());
                
                this.textContent = 'View All 50 Questions';
                this.dataset.expanded = 'false';
            }
        });
    }
    
    // Expandable question functionality for behavioral questions
    if (viewMoreBehavioral) {
        viewMoreBehavioral.addEventListener('click', function() {
            const isExpanded = this.dataset.expanded === 'true';
            
            if (!isExpanded) {
                // Create and show additional behavioral questions
                const additionalQuestions = createAdditionalBehavioralQuestions();
                const questionsGrid = document.querySelector('#behavioral-questions .questions-grid');
                
                additionalQuestions.forEach(column => {
                    questionsGrid.appendChild(column);
                });
                
                this.textContent = 'Show Less Questions';
                this.dataset.expanded = 'true';
            } else {
                // Hide additional questions
                const additionalColumns = document.querySelectorAll('#behavioral-questions .question-column:nth-child(n+4)');
                additionalColumns.forEach(col => col.remove());
                
                this.textContent = 'View More Behavioral Questions';
                this.dataset.expanded = 'false';
            }
        });
    }
    
    // Resource item click handlers
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceTitle = this.closest('.resource-item').querySelector('h3').textContent;
            showResourceModal(resourceTitle);
        });
    });
    
    // Smooth scrolling for anchor links within the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Function to create additional 50 questions columns
function createAdditionalFiftyQuestions() {
    const columns = [];
    
    // Column 4: Work Experience & Skills
    const column4 = document.createElement('div');
    column4.className = 'question-column';
    column4.innerHTML = `
        <h3>Work Experience & Skills</h3>
        <ul>
            <li>What kind of work interests you the most?</li>
            <li>What are your long-range and short-range goals and objectives?</li>
            <li>Why did you decide to seek a position in this field?</li>
            <li>What do you know about our company?</li>
            <li>What two or three things are most important to you in your job?</li>
            <li>Are you seeking employment in a company of a certain size? Why?</li>
            <li>What criteria are you using to evaluate the company for which you hope to work?</li>
            <li>Do you have a geographical preference? Why?</li>
        </ul>
    `;
    columns.push(column4);
    
    // Column 5: Problem Solving & Adaptability
    const column5 = document.createElement('div');
    column5.className = 'question-column';
    column5.innerHTML = `
        <h3>Problem Solving & Adaptability</h3>
        <ul>
            <li>How do you work under pressure?</li>
            <li>How do you handle multiple priorities?</li>
            <li>What do you do when you have trouble solving a problem?</li>
            <li>Have you ever had difficulty working with a manager or professor?</li>
            <li>What have you done when you had a conflict with a coworker?</li>
            <li>What have you learned from your mistakes?</li>
            <li>Describe a situation where you had to adapt to significant change.</li>
            <li>How do you handle unexpected obstacles?</li>
        </ul>
    `;
    columns.push(column5);
    
    // Column 6: Company & Role Specific
    const column6 = document.createElement('div');
    column6.className = 'question-column';
    column6.innerHTML = `
        <h3>Company & Role Specific</h3>
        <ul>
            <li>What can you do for us that someone else cannot?</li>
            <li>What contributions could you make in the first 90 days?</li>
            <li>What questions do you have about our company?</li>
            <li>What challenges are you looking for in this position?</li>
            <li>Are you willing to relocate?</li>
            <li>Are you willing to travel?</li>
            <li>What salary are you seeking?</li>
            <li>When would you be available to start?</li>
        </ul>
    `;
    columns.push(column6);
    
    return columns;
}

// Function to create additional behavioral questions columns
function createAdditionalBehavioralQuestions() {
    const columns = [];
    
    // Column 4: Initiative & Innovation
    const column4 = document.createElement('div');
    column4.className = 'question-column';
    column4.innerHTML = `
        <h3>Initiative & Innovation</h3>
        <ul>
            <li>Tell me about a time when you showed initiative.</li>
            <li>Describe a situation where you improved a process.</li>
            <li>Give an example of when you had to think outside the box.</li>
            <li>Tell me about a time you implemented a new idea.</li>
            <li>Describe a situation where you took on a responsibility beyond your role.</li>
            <li>How do you stay motivated when working on routine tasks?</li>
            <li>Tell me about a time you identified and capitalized on an opportunity.</li>
        </ul>
    `;
    columns.push(column4);
    
    // Column 5: Work Ethic & Reliability
    const column5 = document.createElement('div');
    column5.className = 'question-column';
    column5.innerHTML = `
        <h3>Work Ethic & Reliability</h3>
        <ul>
            <li>Describe a time when you had to work extra hard to complete a task.</li>
            <li>Tell me about a time you had to meet a very tight deadline.</li>
            <li>How do you ensure quality in your work?</li>
            <li>Describe a situation where you had to be very thorough.</li>
            <li>Tell me about a time you went above and beyond expectations.</li>
            <li>How do you handle repetitive tasks?</li>
            <li>Describe your approach to time management.</li>
        </ul>
    `;
    columns.push(column5);
    
    // Column 6: Adaptability & Learning
    const column6 = document.createElement('div');
    column6.className = 'question-column';
    column6.innerHTML = `
        <h3>Adaptability & Learning</h3>
        <ul>
            <li>Tell me about a time you had to learn something new quickly.</li>
            <li>Describe a situation where you had to adapt to significant change.</li>
            <li>How do you handle unexpected challenges?</li>
            <li>Tell me about a time you received constructive criticism.</li>
            <li>Describe a situation where you had to work with new technology.</li>
            <li>How do you stay current in your field?</li>
            <li>Tell me about a time you had to adjust to a new team or environment.</li>
        </ul>
    `;
    columns.push(column6);
    
    return columns;
}

// Function to show resource modal (placeholder functionality)
function showResourceModal(title) {
    // In a real implementation, this would show detailed resource content
    // For now, we'll show a simple alert
    alert(`Thank you for your interest in "${title}".\n\nThis resource would open in a full implementation. For now, please explore the available questions and practice materials on this page.`);
    
    // Example of what a full implementation might include:
    /*
    const modal = document.createElement('div');
    modal.className = 'resource-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <p>Detailed content for ${title} would appear here...</p>
            <button class="close-modal">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add event listener to close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    */
}

// Add some interactive features to resource items
document.querySelectorAll('.resource-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Print functionality for question banks
function addPrintButtons() {
    const questionBanks = document.querySelectorAll('.question-bank');
    
    questionBanks.forEach(bank => {
        const printBtn = document.createElement('button');
        printBtn.className = 'btn print-btn';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Questions';
        printBtn.style.marginLeft = '10px';
        
        printBtn.addEventListener('click', function() {
            const bankContent = bank.innerHTML;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Questions</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h2 { color: #333; }
                            .question-column { margin-bottom: 20px; }
                            ul { padding-left: 20px; }
                            li { margin-bottom: 8px; }
                            @media print {
                                body { padding: 0; }
                                .print-btn { display: none; }
                            }
                        </style>
                    </head>
                    <body>
                        ${bankContent}
                        <script>
                            window.onload = function() { window.print(); }
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        });
        
        const viewMoreContainer = bank.querySelector('.view-more-container');
        if (viewMoreContainer) {
            viewMoreContainer.appendChild(printBtn);
        }
    });
}

// Initialize print buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', addPrintButtons);