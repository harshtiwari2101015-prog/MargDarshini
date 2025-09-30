// Enhanced keyword matching with navbar integration
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');

    // Add message function
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Handle line breaks in text
        const formattedText = text.replace(/\n/g, '<br>');
        messageContent.innerHTML = `<p>${formattedText}</p>`;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Process user input
    function processUserInput() {
        const input = userInput.value.trim().toLowerCase();
        
        if (!input) return;
        
        addMessage(input, true);
        userInput.value = '';
        
        // Disable input while processing
        userInput.disabled = true;
        sendButton.disabled = true;
        
        setTimeout(() => {
            let response = '';
            
            // Expanded keyword matching
            if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
                response = getResponse('greeting');
            }
            else if (input.includes('engineer') || input.includes('coding') || input.includes('programming') || input.includes('developer')) {
                response = getResponse('engineering');
            }
            else if (input.includes('confused') || input.includes('lost') || input.includes('unsure') || input.includes('dont know') || input.includes('direction')) {
                response = getResponse('confused');
            }
            else if (input.includes('skill') || input.includes('learn') || input.includes('develop') || input.includes('training')) {
                response = getResponse('skills');
            }
            else if (input.includes('change career') || input.includes('switch') || input.includes('transition') || input.includes('new field')) {
                response = getResponse('careerChange');
            }
            else if (input.includes('interview') || input.includes('hiring') || input.includes('apply') || input.includes('job interview')) {
                response = getResponse('interview');
            }
            else if (input.includes('resume') || input.includes('cv') || input.includes('application') || input.includes('cover letter')) {
                response = getResponse('resume');
            }
            else if (input.includes('network') || input.includes('connect') || input.includes('contact') || input.includes('linkedin')) {
                response = getResponse('networking');
            }
            else if (input.includes('education') || input.includes('degree') || input.includes('study') || input.includes('college') || input.includes('university')) {
                response = getResponse('education');
            }
            else if (input.includes('remote') || input.includes('work from home') || input.includes('wfh') || input.includes('telecommute')) {
                response = getResponse('remote');
            }
            else if (input.includes('entrepreneur') || input.includes('startup') || input.includes('business') || input.includes('own company') || input.includes('self-employed')) {
                response = getResponse('entrepreneurship');
            }
            else if (input.includes('advance') || input.includes('promotion') || input.includes('growth') || input.includes('next level') || input.includes('career growth')) {
                response = getResponse('advancement');
            }
            else if (input.includes('balance') || input.includes('burnout') || input.includes('overwhelm') || input.includes('stress') || input.includes('work life')) {
                response = getResponse('balance');
            }
            else if (input.includes('salary') || input.includes('pay') || input.includes('compensation') || input.includes('negotiate') || input.includes('raise')) {
                response = getResponse('salary');
            }
            else if (input.includes('healthcare') || input.includes('medical') || input.includes('hospital') || input.includes('nursing') || input.includes('doctor')) {
                response = getResponse('healthcare');
            }
            else if (input.includes('tech') || input.includes('technology') || input.includes('software') || input.includes('IT') || input.includes('computer')) {
                response = getResponse('tech');
            }
            else if (input.includes('creative') || input.includes('design') || input.includes('art') || input.includes('writing') || input.includes('photography')) {
                response = getResponse('creative');
            }
            else if (input.includes('mental health') || input.includes('burnout') || input.includes('anxiety') || input.includes('depression') || input.includes('exhaust')) {
                response = getResponse('mentalHealth');
            }
            else if (input.includes('assessment') || input.includes('personality') || input.includes('strengths') || input.includes('self-awareness') || input.includes('career test')) {
                response = getResponse('assessment');
            }
            else if (input.includes('leader') || input.includes('management') || input.includes('manager') || input.includes('supervisor')) {
                response = getResponse('leadership');
            }
            else if (input.includes('freelance') || input.includes('consult') || input.includes('contract') || input.includes('gig') || input.includes('self-employed')) {
                response = getResponse('freelancing');
            }
            else if (input.includes('international') || input.includes('abroad') || input.includes('overseas') || input.includes('global') || input.includes('relocate')) {
                response = getResponse('international');
            }
            else if (input.includes('career break') || input.includes('gap') || input.includes('sabbatical') || input.includes('return to work') || input.includes('parental leave')) {
                response = getResponse('careerBreak');
            }
            else {
                response = getResponse('default');
            }
            
            addMessage(response);
            
            // Re-enable input
            userInput.disabled = false;
            sendButton.disabled = false;
            userInput.focus();
        }, 1000);
    }

    // Event listeners
    sendButton.addEventListener('click', processUserInput);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processUserInput();
        }
    });
});