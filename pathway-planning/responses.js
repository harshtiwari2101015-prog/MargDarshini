// Comprehensive Career Guidance Responses
const careerResponses = {
    // Greetings
    greeting: [
        "Hello! I'm your career mentor. I'm here to help you navigate your career path. What's on your mind today?",
        "Hi there! I'm excited to help you with your career questions. What would you like to discuss?",
        "Welcome! I'm your career guidance assistant. Whether you're starting out, changing paths, or advancing - I'm here to help!"
    ],
    
    // Engineering & Tech
    engineering: [
        "Great choice! Engineering offers many exciting opportunities. Here are some steps:\n1. Identify which field interests you (software, mechanical, civil, etc.)\n2. Build foundation in math and science\n3. Work on practical projects\n4. Look for internships\n5. Connect with professionals\n\nWhat specific area interests you?",
        "Engineering is fantastic! Consider:\n• Software: Learn programming, build portfolio\n• Mechanical: CAD skills, hands-on projects\n• Civil: Structural design, sustainability\n• Electrical: Circuit design, embedded systems\n\nWhich engineering field calls to you?"
    ],
    
    // Career Confusion
    confused: [
        "It's normal to feel confused! Let's start with what you enjoy. Tell me about subjects or activities that make you lose track of time.",
        "Career confusion is common. Let's break it down:\n1. What are you naturally good at?\n2. What problems interest you?\n3. What work environment do you prefer?\n4. What impact do you want to make?\n\nReflect on these and we'll find direction!"
    ],
    
    // Skills Development
    skills: [
        "Skill development is key! Approach:\n1. Identify 2-3 relevant skills\n2. Use free online resources\n3. Practice with small projects\n4. Apply to real situations\n5. Get feedback and improve\n\nWhat skills are you considering?",
        "Building skills opens doors:\n• Technical: Coding, data analysis, design\n• Soft: Communication, leadership, problem-solving\n• Hybrid: Project management, analytics\n\nWhich skill category interests you?"
    ],
    
    // Career Changes
    careerChange: [
        "Career changes can be exciting! Strategy:\n1. Research target industry thoroughly\n2. Identify transferable skills\n3. Fill skill gaps strategically\n4. Network intentionally\n5. Consider gradual transition\n\nWhat field are you considering?",
        "Changing careers successfully:\n• Talk to people who made similar changes\n• Test waters with freelance/volunteer work\n• Update resume to highlight relevant experience\n• Be patient during transition\n\nWhat's motivating your change?"
    ],
    
    // Interview Preparation
    interview: [
        "Interview prep is crucial! Framework:\n1. Research company and role deeply\n2. Practice common questions aloud\n3. Prepare smart questions to ask\n4. Review your resume thoroughly\n5. Plan logistics in advance\n\nWhat type of role are you interviewing for?",
        "Ace your interviews:\n• Use STAR method for behavioral questions\n• Focus on achievements and value\n• Practice with mock interviews\n• Send thank you notes afterward\n• Follow up appropriately\n\nAny specific interview concerns?"
    ],
    
    // Resume Help
    resume: [
        "Resume tips that work:\n1. Tailor for each application\n2. Use action verbs and quantify achievements\n3. Keep clean and error-free\n4. Highlight relevant skills\n5. Optimize for ATS and humans\n\nNeed industry-specific advice?",
        "Strong resume building:\n• Start with compelling summary\n• Focus on accomplishments\n• Include relevant keywords\n• Keep 1-2 pages maximum\n• Get professional proofreading\n\nWhat field are you applying to?"
    ],
    
    // Networking
    networking: [
        "Networking opens doors! Approach:\n1. Start with existing contacts\n2. Attend industry events\n3. Prepare elevator pitch\n4. Build genuine relationships\n5. Follow up consistently\n\nWhat's your current approach?",
        "Effective networking:\n• Join LinkedIn groups actively\n• Offer help to others first\n• Be specific about your goals\n• Reach out to people you admire\n• Remember most people enjoy helping\n\nTargeting specific industry?"
    ],
    
    // Education Paths
    education: [
        "Education decisions matter! Consider:\n1. Programs aligned with career goals\n2. Traditional degrees vs alternatives\n3. Cost, duration, learning style\n4. Career support quality\n5. Talk to current students\n\nWhat field are you considering studying?",
        "Educational options:\n• University degrees (BA/BS, MA/MS, PhD)\n• Bootcamps and certifications\n• Apprenticeships and trades\n• Self-directed learning\n• Online courses and MOOCs\n\nWhat's your timeline and budget?"
    ],
    
    // Remote Work
    remote: [
        "Remote work success tips:\n1. Create dedicated workspace\n2. Establish clear boundaries\n3. Master digital communication\n4. Communicate proactively\n5. Schedule breaks and social time\n\nWhat aspect interests you most?",
        "Thriving remotely requires:\n• Strong self-discipline\n• Excellent written communication\n• Proactive relationship building\n• Tech comfort and troubleshooting\n• Independent work ability\n\nSeeking remote jobs or improving skills?"
    ],
    
    // Entrepreneurship
    entrepreneurship: [
        "Entrepreneurship journey:\n1. Validate business idea with customers\n2. Create simple business plan\n3. Start small and test concept\n4. Build mentor network\n5. Focus on solving real problems\n\nWhat business are you considering?",
        "Starting up successfully:\n• Identify unique value proposition\n• Research market and competition\n• Consider funding options\n• Choose legal structure wisely\n• MVP approach: build, measure, learn\n\nSpecific problem you want to solve?"
    ],
    
    // Career Advancement
    advancement: [
        "Career advancement strategies:\n1. Document achievements and impact\n2. Seek feedback and grow\n3. Take stretch assignments\n4. Build decision-maker relationships\n5. Develop next-level skills\n\nCurrent role and target position?",
        "Intentional growth requires:\n• Clear goals with timelines\n• Mentor in desired path\n• High-visibility projects\n• Continuous skill updates\n• Communicating aspirations\n\nWhat's motivating your advancement goals?"
    ],
    
    // Work-Life Balance
    balance: [
        "Work-life balance essentials:\n1. Set clear work hour boundaries\n2. Learn to say no strategically\n3. Schedule personal time\n4. Practice time blocking\n5. Regularly assess priorities\n\nSpecific balance challenges?",
        "Better balance strategies:\n• Identify core values and priorities\n• Use technology to protect time\n• Communicate needs clearly\n• Build buffer time between tasks\n• Make self-care non-negotiable\n\nStruggling with specific aspects?"
    ],
    
    // Salary Negotiation
    salary: [
        "Salary negotiation preparation:\n1. Research market rates thoroughly\n2. Document achievements and value\n3. Practice talking points\n4. Consider total compensation\n5. Have target range ready\n\nNegotiating new offer or raise?",
        "Successful negotiation:\n• Let them make first offer when possible\n• Focus on value, not personal needs\n• Be prepared to walk away\n• Consider non-monetary benefits\n• Practice collaborative communication\n\nCurrent negotiation stage?"
    ],
    
    // Industry-Specific: Healthcare
    healthcare: [
        "Healthcare career paths:\n• Clinical roles (nursing, therapy, medicine)\n• Administrative and management\n• Technology and health IT\n• Research and public health\n• Medical devices and pharmaceuticals\n\nWhich area interests you?",
        "Entering healthcare:\n• Required certifications and education\n• Shift work and physical demands\n• Growing fields like telehealth\n• Specialization opportunities\n• Continuous learning importance\n\nSpecific healthcare role in mind?"
    ],
    
    // Industry-Specific: Technology
    tech: [
        "Tech careers beyond engineering:\n• Product management and design\n• Data analysis and science\n• Cybersecurity and IT operations\n• Technical writing\n• Sales engineering\n\nWhat tech work appeals to you?",
        "Breaking into tech:\n• Build project portfolio\n• Contribute to open source\n• Network at tech events\n• Consider coding bootcamps\n• Develop technical + soft skills\n\nTechnical or non-technical roles?"
    ],
    
    // Industry-Specific: Creative
    creative: [
        "Creative career options:\n• Design (graphic, UX/UI, product)\n• Writing and content creation\n• Marketing and advertising\n• Film, media, entertainment\n• Arts and crafts businesses\n\nWhat creative work excites you?",
        "Building creative career:\n• Develop strong portfolio\n• Network in creative communities\n• Learn business skills\n• Balance artistic vision with client needs\n• Multiple income streams\n\nSpecific creative field pursuing?"
    ],
    
    // Mental Health at Work
    mentalHealth: [
        "Workplace mental health strategies:\n1. Recognize burnout signs early\n2. Set realistic boundaries\n3. Use vacation time and breaks\n4. Seek supportive resources\n5. Consider professional help\n\nSpecific challenges experiencing?",
        "Protecting mental health:\n• Practice stress management\n• Communicate needs clearly\n• Build supportive network\n• Know rights and policies\n• Prioritize sleep and health\n\nParticular work stressors affecting you?"
    ],
    
    // Career Assessment
    assessment: [
        "Self-assessment questions:\n1. What activities make time fly?\n2. What problems do you enjoy solving?\n3. What environments energize you?\n4. What skills come naturally?\n5. What impact do you want?\n\nLet's explore your answers!",
        "Understanding yourself:\n• Take career assessments\n• Reflect on satisfying experiences\n• Consider past role values\n• Imagine ideal workday\n• Identify deal-breakers\n\nDiscoveries about preferences?"
    ],
    
    // Leadership Development
    leadership: [
        "Leadership development path:\n1. Start with self-awareness\n2. Develop communication skills\n3. Learn to delegate effectively\n4. Build emotional intelligence\n5. Seek leadership opportunities\n\nCurrent leadership experience?",
        "Becoming better leader:\n• Find leadership mentor\n• Take management courses\n• Read leadership books\n• Practice giving feedback\n• Lead projects voluntarily\n\nWhat type of leader do you want to be?"
    ],
    
    // Freelancing & Consulting
    freelancing: [
        "Freelancing successfully:\n1. Identify your niche and services\n2. Build portfolio and testimonials\n3. Set clear rates and policies\n4. Develop client acquisition system\n5. Manage finances and taxes wisely\n\nWhat services would you offer?",
        "Thriving as freelancer:\n• Specialize in high-demand skills\n• Create recurring revenue streams\n• Master proposal writing\n• Build referral network\n• Maintain work-life boundaries\n\nFull-time or side freelancing?"
    ],
    
    // International Careers
    international: [
        "International career considerations:\n1. Research visa and work requirements\n2. Understand cultural differences\n3. Language preparation if needed\n4. Network in target country\n5. Consider remote international options\n\nWhich countries interest you?",
        "Working abroad successfully:\n• Research cost of living and salaries\n• Understand healthcare and benefits\n• Prepare for cultural adjustment\n• Consider international companies\n• Build global professional network\n\nShort-term or permanent move?"
    ],
    
    // Career Breaks & Returns
    careerBreak: [
        "Managing career breaks:\n1. Keep skills current during break\n2. Stay connected to network\n3. Consider freelance or volunteer work\n4. Prepare return-to-work story\n5. Update resume and skills\n\nReason for career break?",
        "Returning to work successfully:\n• Refresh skills with courses\n• Practice interviewing\n• Network with former colleagues\n• Consider returnship programs\n• Be confident about break value\n\nPlanning return timeline?"
    ],
    
    // Default fallback
    default: [
        "I'd love to help with that! Could you tell me more about your specific situation?",
        "That's an interesting question. To give better advice, could you share more details about your background or goals?",
        "I understand. What have you tried so far, and what outcomes are you hoping for?",
        "Thanks for sharing! To provide targeted guidance, could you tell me about your current skills or interests?"
    ]
};

// Helper function to get random response
function getResponse(category) {
    const responses = careerResponses[category] || careerResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
}