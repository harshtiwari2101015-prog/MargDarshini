// star.js - STAR Method Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const practiceQuestion = document.getElementById('practice-question');
    const situation = document.getElementById('situation');
    const task = document.getElementById('task');
    const action = document.getElementById('action');
    const result = document.getElementById('result');
    const saveResponse = document.getElementById('save-response');
    const clearResponse = document.getElementById('clear-response');
    
    // Sample responses for demonstration
    const sampleResponses = {
        leadership: {
            situation: "When I was the project lead for our senior capstone project, our team was struggling to meet deadlines due to poor communication and unclear responsibilities.",
            task: "My responsibility was to get the project back on track and ensure we delivered a high-quality product by the deadline.",
            action: "I organized a team meeting to clearly define roles and responsibilities, implemented a weekly check-in system, created a shared project timeline with milestones, and established open communication channels for team members to raise concerns.",
            result: "As a result, we completed the project two weeks ahead of schedule, received an A grade, and three team members cited the experience as valuable preparation for their professional careers."
        },
        conflict: {
            situation: "In my previous internship, two team members had a disagreement about the approach to a marketing campaign which was causing tension and slowing progress.",
            task: "I needed to help resolve the conflict so the team could move forward productively with the campaign.",
            action: "I arranged a mediated discussion where each person could share their perspective without interruption. I helped identify common goals and facilitated a compromise that incorporated elements from both approaches.",
            result: "The team adopted the hybrid approach, which ultimately performed 15% better than previous campaigns. Both team members reported improved working relationships and the project was delivered on time."
        },
        mistake: {
            situation: "During a critical data analysis project, I accidentally used outdated data in my initial report which led to incorrect conclusions.",
            task: "I needed to quickly correct the error, inform stakeholders, and ensure the final report was accurate.",
            action: "I immediately identified the source of the error, reran the analysis with the correct data, personally informed my manager about the mistake, and implemented a data verification process to prevent future errors.",
            result: "The corrected report was delivered within 24 hours, and my manager appreciated my transparency. The new verification process reduced data errors by 90% in subsequent projects."
        },
        challenge: {
            situation: "Our team was tasked with migrating a legacy system to a new platform with a tight deadline and limited documentation.",
            task: "I was responsible for understanding the old system's functionality and ensuring a smooth migration without disrupting ongoing operations.",
            action: "I created detailed documentation by reverse-engineering the legacy system, established a phased migration plan, conducted thorough testing at each stage, and maintained clear communication with all stakeholders.",
            result: "The migration was completed 3 days ahead of schedule with zero downtime. The new documentation became the standard for future system migrations."
        },
        teamwork: {
            situation: "I worked on a cross-functional team developing a new product feature with members from engineering, design, and marketing departments.",
            task: "My role was to coordinate between departments and ensure everyone was aligned on project goals and timelines.",
            action: "I established regular sync meetings, created a shared project dashboard, facilitated brainstorming sessions to incorporate diverse perspectives, and resolved conflicts through active listening and compromise.",
            result: "The feature launched successfully with positive user feedback. Team satisfaction scores improved by 25%, and our collaboration framework was adopted by other teams."
        },
        problem: {
            situation: "I noticed our customer support response times were increasing significantly, leading to customer dissatisfaction.",
            task: "I needed to identify the root cause of the delays and implement a solution to improve response efficiency.",
            action: "I analyzed support ticket data, identified bottlenecks in the workflow, implemented an automated triage system, and provided additional training to the support team on handling common issues.",
            result: "Average response time decreased from 48 hours to 6 hours, customer satisfaction scores improved by 35%, and the support team could handle 50% more tickets with the same resources."
        }
    };
    
    if (practiceQuestion) {
        practiceQuestion.addEventListener('change', function() {
            const selectedQuestion = this.value;
            
            if (selectedQuestion && sampleResponses[selectedQuestion]) {
                // Fill with sample response for demonstration
                situation.value = sampleResponses[selectedQuestion].situation;
                task.value = sampleResponses[selectedQuestion].task;
                action.value = sampleResponses[selectedQuestion].action;
                result.value = sampleResponses[selectedQuestion].result;
            } else {
                // Clear fields for new question
                situation.value = '';
                task.value = '';
                action.value = '';
                result.value = '';
            }
        });
    }
    
    if (saveResponse) {
        saveResponse.addEventListener('click', function() {
            if (!practiceQuestion.value) {
                alert('Please select a question first.');
                return;
            }
            
            if (!situation.value || !task.value || !action.value || !result.value) {
                alert('Please complete all sections of the STAR method before saving.');
                return;
            }
            
            // In a full implementation, this would save to local storage or a backend
            const responseData = {
                question: practiceQuestion.options[practiceQuestion.selectedIndex].text,
                situation: situation.value,
                task: task.value,
                action: action.value,
                result: result.value,
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage
            let savedResponses = JSON.parse(localStorage.getItem('starResponses') || '[]');
            savedResponses.push(responseData);
            localStorage.setItem('starResponses', JSON.stringify(savedResponses));
            
            alert('Response saved successfully! You can view your saved responses in future sessions.');
        });
    }
    
    if (clearResponse) {
        clearResponse.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all fields?')) {
                situation.value = '';
                task.value = '';
                action.value = '';
                result.value = '';
            }
        });
    }
    
    // Load any previously saved responses on page load
    function loadSavedResponses() {
        const savedResponses = JSON.parse(localStorage.getItem('starResponses') || '[]');
        if (savedResponses.length > 0) {
            console.log(`You have ${savedResponses.length} saved STAR responses.`);
        }
    }
    
    loadSavedResponses();
});