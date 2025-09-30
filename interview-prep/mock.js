// mock.js - Mock Interview Functionality
class MockInterview {
    constructor() {
        this.currentMode = 'hr';
        this.currentQuestionIndex = 0;
        this.questions = {
            hr: [
                "Tell me about yourself and your background.",
                "Why are you interested in this position?",
                "What are your greatest strengths?",
                "What are your areas for improvement?",
                "Where do you see yourself in 5 years?",
                "Why should we hire you?",
                "What do you know about our company?",
                "How do you handle pressure or stressful situations?",
                "What are your long-term and short-term career goals?",
                "How do you evaluate success?",
                "What motivates you to put forth your greatest effort?",
                "What qualifications do you have that make you think you will be successful?",
                "How has your college education prepared you for a professional career?",
                "What do you expect to be earning in five years?",
                "Why did you choose the career for which you are planning?"
            ],
            technical: [
                "Explain a technical project you've worked on recently.",
                "How would you approach debugging a complex issue?",
                "What programming languages are you most comfortable with and why?",
                "Describe your experience with version control systems.",
                "How do you ensure code quality in your projects?",
                "Explain a challenging technical problem you solved.",
                "What's your experience with agile methodologies?",
                "How do you stay updated with new technologies?",
                "Describe a situation where you had to learn a new technology quickly.",
                "How do you approach testing your code?",
                "What's the most complex system you've designed or worked on?",
                "How do you handle technical debt in a project?",
                "Explain your experience with database design and optimization."
            ],
            behavioral: [
                "Tell me about a time you had a conflict with a team member.",
                "Describe a situation where you had to meet a tight deadline.",
                "Give an example of when you showed leadership skills.",
                "How do you handle receiving constructive criticism?",
                "Describe a time you failed and what you learned from it.",
                "Tell me about a time you had to persuade someone.",
                "How do you prioritize multiple tasks?",
                "Describe a situation where you went above and beyond.",
                "Tell me about a time when you had to make a quick decision.",
                "Describe a situation where you had to adapt to significant change.",
                "Tell me about a time you had to solve a complex problem.",
                "Describe a situation where you had to work with a difficult person.",
                "Tell me about a time you had to convince your team to adopt your idea."
            ]
        };
        
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.timerInterval = null;
        this.startTime = null;
        this.transcript = '';
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateProgress();
    }
    
    initializeElements() {
        this.modeBtns = document.querySelectorAll('.mode-btn');
        this.recordBtn = document.getElementById('record-btn');
        this.recordingStatus = document.getElementById('recording-status');
        this.nextBtn = document.getElementById('next-btn');
        this.feedbackBtn = document.getElementById('feedback-btn');
        this.restartBtn = document.getElementById('restart-btn');
        
        this.questionText = document.getElementById('question-text');
        this.transcriptText = document.getElementById('transcript-text');
        this.timer = document.getElementById('timer');
        this.roundTitle = document.getElementById('round-title');
        this.progress = document.getElementById('progress');
        this.progressText = document.getElementById('progress-text');
        
        this.feedbackArea = document.getElementById('feedback-area');
        this.clarityScore = document.getElementById('clarity-score');
        this.confidenceScore = document.getElementById('confidence-score');
        this.relevanceScore = document.getElementById('relevance-score');
        this.feedbackText = document.getElementById('feedback-text');
        
        this.interviewComplete = document.getElementById('interview-complete');
    }
    
    attachEventListeners() {
        // Mode selection
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn.dataset.mode));
        });
        
        // Recording functionality
        this.recordBtn.addEventListener('click', () => this.toggleRecording());
        
        // Navigation buttons
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.feedbackBtn.addEventListener('click', () => this.generateFeedback());
        this.restartBtn.addEventListener('click', () => this.restartInterview());
        
        // Initialize first question
        this.displayCurrentQuestion();
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        this.currentQuestionIndex = 0;
        
        // Update active mode button
        this.modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        // Update round title
        const modeTitles = {
            hr: 'HR Round',
            technical: 'Technical Round',
            behavioral: 'Behavioral Round'
        };
        this.roundTitle.textContent = modeTitles[mode];
        
        this.updateProgress();
        this.displayCurrentQuestion();
        this.hideFeedback();
        this.hideCompletion();
    }
    
    displayCurrentQuestion() {
        if (this.currentQuestionIndex < this.questions[this.currentMode].length) {
            this.questionText.textContent = this.questions[this.currentMode][this.currentQuestionIndex];
            this.transcriptText.textContent = 'Your speech will appear here...';
            this.transcript = '';
            this.hideFeedback();
        } else {
            this.showCompletion();
        }
    }
    
    async toggleRecording() {
        if (!this.isRecording) {
            await this.startRecording();
        } else {
            this.stopRecording();
        }
    }
    
    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };
            
            this.mediaRecorder.onstop = () => {
                this.processAudio();
            };
            
            this.mediaRecorder.start();
            this.isRecording = true;
            this.recordBtn.classList.add('recording');
            this.recordBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
            this.recordingStatus.textContent = 'Recording...';
            this.startTimer();
            
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Unable to access microphone. Please check your permissions.');
        }
    }
    
    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            
            this.isRecording = false;
            this.recordBtn.classList.remove('recording');
            this.recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
            this.recordingStatus.textContent = 'Processing...';
            this.stopTimer();
        }
    }
    
    processAudio() {
        // Simulate speech-to-text processing
        setTimeout(() => {
            const sampleResponses = {
                hr: [
                    "I'm a recent graduate with a degree in Computer Science...",
                    "I'm passionate about this industry because...",
                    "My greatest strengths include problem-solving and teamwork...",
                    "I'm working on improving my public speaking skills...",
                    "In 5 years, I hope to be in a leadership position...",
                    "I believe my skills align perfectly with your requirements...",
                    "I admire your company's commitment to innovation...",
                    "I handle stress by breaking problems into smaller tasks..."
                ],
                technical: [
                    "Recently I worked on a web application using React...",
                    "I start by reproducing the issue and examining logs...",
                    "I'm most comfortable with JavaScript and Python...",
                    "I have extensive experience with Git and GitHub...",
                    "I use code reviews, testing, and continuous integration...",
                    "I once optimized a database query that reduced load time by 80%...",
                    "I've worked in Scrum teams with 2-week sprints...",
                    "I follow industry blogs and take online courses regularly..."
                ],
                behavioral: [
                    "When I had a conflict, I scheduled a private meeting to discuss...",
                    "I created a detailed plan and communicated with stakeholders...",
                    "I led a team project by delegating tasks based on strengths...",
                    "I view feedback as an opportunity for growth...",
                    "I missed a deadline once and learned to set better expectations...",
                    "I presented data and benefits to gain buy-in for my idea...",
                    "I use the Eisenhower matrix to prioritize urgent vs important tasks...",
                    "I volunteered to mentor new team members which improved overall productivity..."
                ]
            };
            
            const response = sampleResponses[this.currentMode][this.currentQuestionIndex] || 
                           "This is a simulated response based on my experience...";
            
            this.transcript = response;
            this.transcriptText.textContent = response;
            this.recordingStatus.textContent = 'Transcript ready';
            
        }, 2000);
    }
    
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            this.timer.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions[this.currentMode].length - 1) {
            this.currentQuestionIndex++;
            this.updateProgress();
            this.displayCurrentQuestion();
        } else {
            this.showCompletion();
        }
    }
    
    generateFeedback() {
        if (!this.transcript) {
            alert('Please record your answer first!');
            return;
        }
        
        // Simulate AI feedback generation
        const scores = {
            clarity: Math.floor(Math.random() * 3) + 7, // 7-9
            confidence: Math.floor(Math.random() * 3) + 6, // 6-8
            relevance: Math.floor(Math.random() * 3) + 8 // 8-10
        };
        
        const feedbackMessages = {
            excellent: "Excellent answer! You demonstrated strong communication skills and relevant experience.",
            good: "Good response. Consider providing more specific examples to strengthen your answer.",
            average: "Solid foundation. Work on being more concise and confident in your delivery."
        };
        
        const averageScore = (scores.clarity + scores.confidence + scores.relevance) / 3;
        let feedback;
        
        if (averageScore >= 8) feedback = feedbackMessages.excellent;
        else if (averageScore >= 7) feedback = feedbackMessages.good;
        else feedback = feedbackMessages.average;
        
        // Update scores
        this.clarityScore.textContent = `${scores.clarity}/10`;
        this.confidenceScore.textContent = `${scores.confidence}/10`;
        this.relevanceScore.textContent = `${scores.relevance}/10`;
        
        // Update feedback text
        this.feedbackText.textContent = feedback;
        
        this.showFeedback();
    }
    
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions[this.currentMode].length) * 100;
        this.progress.style.width = `${progress}%`;
        this.progressText.textContent = `${Math.round(progress)}%`;
    }
    
    showFeedback() {
        this.feedbackArea.classList.add('active');
    }
    
    hideFeedback() {
        this.feedbackArea.classList.remove('active');
    }
    
    showCompletion() {
        this.interviewComplete.classList.add('active');
        this.questionText.textContent = "Interview completed successfully!";
        this.hideFeedback();
    }
    
    hideCompletion() {
        this.interviewComplete.classList.remove('active');
    }
    
    restartInterview() {
        this.currentQuestionIndex = 0;
        this.updateProgress();
        this.displayCurrentQuestion();
        this.hideCompletion();
        this.hideFeedback();
        this.timer.textContent = '00:00';
        this.transcript = '';
        this.transcriptText.textContent = 'Your speech will appear here...';
    }
}

// Initialize the mock interview when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MockInterview();
});