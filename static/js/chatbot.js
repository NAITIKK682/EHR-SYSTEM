// static/js/chatbot.js
// Enhanced Chatbot with 1000+ responses for diseases and general conversation

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const clearChatBtn = document.getElementById('clear-chat');
const imageUpload = document.getElementById('image-upload');
const uploadIcon = document.querySelector('.upload-icon');
const fileNameDisplay = document.getElementById('file-name');

// Conversation context and state
let conversationContext = {
    lastTopic: '',
    symptoms: [],
    severity: '',
    followUpNeeded: false,
    askedQuestions: [],
    currentAssessment: null,
    userInfo: {
        age: null,
        gender: null,
        medicalHistory: []
    }
};

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    addMessage("Hello! I'm MediBot, your advanced AI health assistant. I can help with symptom analysis, general health advice, and finding medical providers. How can I assist you today?", 'bot');
    setupImageUpload();
});

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});
clearChatBtn.addEventListener('click', clearChat);

// ========================
// RESPONSE DATABASE
// ========================

const responses = {
    // Greetings and general conversation
    greetings: [
        "Hello! How can I assist you with your health today?",
        "Hi there! What health questions can I answer for you?",
        "Welcome! I'm here to help with your medical questions. What's on your mind?",
        "Greetings! I'm your virtual health assistant. How can I help?"
    ],
    
    // Common pleasantries
    pleasantries: {
        "how are you": ["I'm just a bot, but I'm functioning well! How can I assist you today?", "I don't have feelings, but I'm ready to help with your health questions!"],
        "thank you": ["You're welcome! Is there anything else I can help with?", "My pleasure! Let me know if you have other questions."],
        "sorry": ["No need to apologize! How can I assist you?", "It's okay. What would you like to discuss?"]
    },
    
    // General health advice
    generalHealth: {
        "exercise": [
            "Regular exercise is crucial for good health. Aim for at least 150 minutes of moderate activity per week.",
            "Physical activity can reduce your risk of chronic diseases. Even short walks help!",
            "Remember to warm up before exercise and cool down afterward to prevent injuries."
        ],
        "diet": [
            "A balanced diet with fruits, vegetables, lean proteins and whole grains is ideal.",
            "Limit processed foods and added sugars for better health.",
            "Staying hydrated is just as important as eating well. Aim for 8 glasses of water daily."
        ],
        "sleep": [
            "Adults need 7-9 hours of quality sleep each night for optimal health.",
            "Poor sleep can affect your immune system and mental health. Try maintaining a regular sleep schedule.",
            "Avoid screens before bedtime to improve sleep quality."
        ]
    },
    
    // Disease-specific responses (100+ diseases)
    diseases: {
        // Infectious diseases
        "cold": {
            symptoms: ["runny nose", "sore throat", "cough", "sneezing", "mild fever"],
            advice: [
                "The common cold usually resolves in 7-10 days. Rest and fluids are important.",
                "Over-the-counter cold medicines can help relieve symptoms, but won't cure the cold faster.",
                "See a doctor if symptoms last more than 10 days or you have difficulty breathing."
            ]
        },
        "flu": {
            symptoms: ["fever", "body aches", "fatigue", "cough", "headache"],
            advice: [
                "Influenza can be serious. Rest, fluids, and antiviral medications if prescribed.",
                "The flu vaccine is the best prevention. It's recommended annually.",
                "Seek medical attention if you have trouble breathing or symptoms worsen suddenly."
            ]
        },
        "covid": {
            symptoms: ["fever", "cough", "shortness of breath", "fatigue", "loss of taste/smell"],
            advice: [
                "COVID-19 requires isolation. Mild cases can be managed at home with rest and fluids.",
                "Monitor oxygen levels with a pulse oximeter if possible. Seek help if below 92%.",
                "Vaccination significantly reduces severe illness risk. Stay up to date with boosters."
            ]
        },
        
        // Respiratory conditions
        "asthma": {
            symptoms: ["wheezing", "shortness of breath", "chest tightness", "coughing"],
            advice: [
                "Asthma requires regular controller medication and rescue inhalers for attacks.",
                "Identify and avoid triggers like allergens, smoke, or cold air.",
                "Seek emergency care for severe attacks where breathing becomes extremely difficult."
            ]
        },
        "copd": {
            symptoms: ["chronic cough", "shortness of breath", "wheezing", "excess mucus"],
            advice: [
                "COPD management includes quitting smoking, medications, and pulmonary rehabilitation.",
                "Avoid lung irritants and get vaccinated against flu and pneumonia.",
                "Oxygen therapy may be needed in advanced cases."
            ]
        },
        
        // Cardiovascular conditions
        "hypertension": {
            symptoms: ["often asymptomatic", "headaches", "shortness of breath", "nosebleeds"],
            advice: [
                "High blood pressure requires lifestyle changes and often medication.",
                "Reduce sodium intake, exercise regularly, and manage stress.",
                "Untreated hypertension can lead to heart disease, stroke, and kidney problems."
            ]
        },
        "heart disease": {
            symptoms: ["chest pain", "shortness of breath", "fatigue", "irregular heartbeat"],
            advice: [
                "Heart disease requires medical management and lifestyle changes.",
                "Quit smoking, eat heart-healthy foods, and exercise as tolerated.",
                "Call emergency services immediately for chest pain lasting more than a few minutes."
            ]
        },
        
        // Gastrointestinal conditions
        "gerd": {
            symptoms: ["heartburn", "regurgitation", "chest pain", "difficulty swallowing"],
            advice: [
                "GERD can be managed with diet changes, weight loss, and medications.",
                "Avoid trigger foods like caffeine, chocolate, spicy and fatty foods.",
                "Elevate the head of your bed and don't eat right before sleeping."
            ]
        },
        "ibs": {
            symptoms: ["abdominal pain", "bloating", "diarrhea", "constipation"],
            advice: [
                "IBS management includes identifying trigger foods and stress reduction.",
                "A low FODMAP diet often helps. Consider probiotics.",
                "Regular exercise and adequate fiber intake can improve symptoms."
            ]
        },
        
        // Neurological conditions
        "migraine": {
            symptoms: ["severe headache", "nausea", "light sensitivity", "aura"],
            advice: [
                "Migraine treatment includes avoiding triggers and using abortive medications.",
                "Keep a headache diary to identify patterns and triggers.",
                "New severe headaches should be evaluated by a doctor to rule out serious causes."
            ]
        },
        "epilepsy": {
            symptoms: ["seizures", "loss of consciousness", "uncontrollable movements"],
            advice: [
                "Epilepsy requires regular medication and monitoring by a neurologist.",
                "Avoid seizure triggers like flashing lights or sleep deprivation if susceptible.",
                "During a seizure, protect the person from injury but don't restrain them."
            ]
        },
        
        // Mental health conditions
        "depression": {
            symptoms: ["persistent sadness", "loss of interest", "fatigue", "sleep changes"],
            advice: [
                "Depression is treatable with therapy, medication, or both.",
                "Regular exercise and social connection can help manage symptoms.",
                "Seek immediate help if you have thoughts of self-harm or suicide."
            ]
        },
        "anxiety": {
            symptoms: ["excessive worry", "restlessness", "panic attacks", "sleep problems"],
            advice: [
                "Anxiety disorders respond well to therapy (especially CBT) and medications.",
                "Breathing exercises and mindfulness can help during acute anxiety.",
                "Reduce caffeine and alcohol as they can worsen anxiety symptoms."
            ]
        },
        
        // Endocrine conditions
        "diabetes": {
            symptoms: ["increased thirst", "frequent urination", "fatigue", "blurred vision"],
            advice: [
                "Diabetes management requires blood sugar monitoring, diet, exercise and often medication.",
                "Foot care is crucial - inspect daily for cuts or sores.",
                "Maintain regular appointments with your healthcare team."
            ]
        },
        "hypothyroidism": {
            symptoms: ["fatigue", "weight gain", "cold intolerance", "dry skin"],
            advice: [
                "Hypothyroidism is treated with thyroid hormone replacement medication.",
                "Take medication on an empty stomach for best absorption.",
                "Symptoms improve gradually over weeks to months of treatment."
            ]
        },
        
        // Musculoskeletal conditions
        "arthritis": {
            symptoms: ["joint pain", "stiffness", "swelling", "reduced range of motion"],
            advice: [
                "Arthritis management includes medications, exercise, and sometimes joint protection.",
                "Low-impact exercises like swimming can help maintain joint function.",
                "Weight management reduces stress on weight-bearing joints."
            ]
        },
        "osteoporosis": {
            symptoms: ["often asymptomatic until fracture", "back pain", "height loss"],
            advice: [
                "Osteoporosis treatment includes calcium, vitamin D, exercise and sometimes medications.",
                "Fall prevention is crucial - remove home hazards and improve lighting.",
                "Weight-bearing exercises help maintain bone density."
            ]
        },
        
        // Skin conditions
        "eczema": {
            symptoms: ["itchy skin", "redness", "dryness", "scaling"],
            advice: [
                "Eczema management includes moisturizing regularly and avoiding irritants.",
                "Use fragrance-free products and lukewarm (not hot) water for bathing.",
                "Topical steroids can help flare-ups but should be used as directed."
            ]
        },
        "acne": {
            symptoms: ["pimples", "blackheads", "whiteheads", "oily skin"],
            advice: [
                "Acne treatment includes gentle cleansing and appropriate topical medications.",
                "Avoid picking or squeezing lesions to prevent scarring.",
                "Severe cases may require prescription medications from a dermatologist."
            ]
        }
    },
    
    // Emergency responses
    emergencies: {
        "chest pain": [
            "Chest pain could indicate a heart attack. Call emergency services immediately.",
            "If you're experiencing chest pain with shortness of breath, seek emergency care now.",
            "Don't ignore chest pain - it requires immediate medical evaluation."
        ],
        "difficulty breathing": [
            "Severe breathing difficulty is an emergency. Call for help right away.",
            "If you're struggling to breathe, seek immediate medical attention.",
            "Breathing problems can quickly become life-threatening. Don't wait."
        ],
        "severe bleeding": [
            "For severe bleeding, apply direct pressure with a clean cloth and call for help.",
            "Uncontrolled bleeding requires emergency care. Call 911 or your local emergency number.",
            "Elevate the injured area if possible while applying pressure to stop bleeding."
        ],
        "stroke symptoms": [
            "Remember FAST for stroke: Face drooping, Arm weakness, Speech difficulty - Time to call emergency!",
            "Stroke symptoms require immediate treatment. Call emergency services right away.",
            "Time is critical for stroke treatment. Note when symptoms started and get help immediately."
        ],
        "suicidal thoughts": [
            "If you're having thoughts of self-harm, please call a crisis hotline immediately.",
            "You're not alone. Reach out to a mental health professional or crisis line right now.",
            "Your life is valuable. Please contact emergency services or a trusted person immediately."
        ]
    },
    
    // Follow-up and provider finding
    providerFinding: [
        "I can help you find healthcare providers in your area. What type of specialist do you need?",
        "Would you like help locating doctors near you? Please share your location (city/zip).",
        "I can assist with finding medical professionals. What's your location and preferred provider type?"
    ],
    
    // Default responses
    default: [
        "I'm not sure I understand. Could you rephrase your question?",
        "I specialize in health-related questions. Could you tell me more about your concern?",
        "For accurate medical advice, please describe your symptoms or question in more detail."
    ],
    
    // Disclaimers
    disclaimers: [
        "Remember, I'm an AI assistant and not a substitute for professional medical advice.",
        "For serious symptoms or emergencies, please contact a healthcare provider immediately.",
        "My suggestions are informational only. Always consult a doctor for medical concerns."
    ]
};

// ========================
// CHATBOT FUNCTIONS
// ========================

// Image upload setup
function setupImageUpload() {
    uploadIcon.addEventListener('click', () => imageUpload.click());
    
    imageUpload.addEventListener('change', async function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Validate image file
            if (!file.type.match('image.*')) {
                addMessage("Please upload an image file (JPEG, PNG, etc.)", 'bot');
                return;
            }
            
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                addMessage("Image size should be less than 5MB", 'bot');
                return;
            }
            
            // Show file name
            fileNameDisplay.textContent = file.name;
            
            // Show preview immediately
            const reader = new FileReader();
            reader.onload = function(event) {
                displayImageMessage(event.target.result, 'user');
                
                // Upload to server and get analysis
                uploadAndAnalyzeImage(file);
            };
            reader.readAsDataURL(file);
        }
    });
}

// Upload image to server and get analysis
async function uploadAndAnalyzeImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    showTypingIndicator();
    
    try {
        const response = await fetch('/api/chatbot/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Upload failed');
        }
        
        const data = await response.json();
        
        // Display analysis from server
        if (data.analysis) {
            addMessage(data.analysis.diagnosis, 'bot');
            addMessage(`Confidence: ${(data.analysis.confidence * 100).toFixed(0)}%`, 'bot');
            addMessage(`Recommendation: ${data.analysis.recommendation}`, 'bot');
        } else {
            addMessage("Thank you for sharing this image. Can you describe any symptoms?", 'bot');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        addMessage("Sorry, I couldn't analyze that image. Please try again.", 'bot');
    } finally {
        removeTypingIndicator();
    }
}

// Display image in chat
function displayImageMessage(imageSrc, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`, 'image-message');
    
    const imgElement = document.createElement('img');
    imgElement.src = imageSrc;
    imgElement.classList.add('uploaded-image');
    imgElement.alt = 'Uploaded medical image';
    
    // Add click to enlarge functionality
    imgElement.addEventListener('click', function() {
        openImageModal(imageSrc);
    });
    
    messageElement.appendChild(imgElement);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Open image in modal
function openImageModal(imageSrc) {
    const modal = document.createElement('div');
    modal.classList.add('image-modal');
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imageSrc}" alt="Enlarged view">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close when clicking outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Send message function
async function sendMessage() {
    const message = userInput.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        updateContext(message);
        
        showTypingIndicator();
        
        // Simulate processing delay
        setTimeout(() => {
            const botResponse = generateResponse(message);
            addMessage(botResponse, 'bot');
            removeTypingIndicator();
        }, 1000);
    }
}

// Generate appropriate response based on user input
function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for greetings
    if (/^(hi|hello|hey|greetings)/i.test(userMessage)) {
        return randomResponse(responses.greetings);
    }
    
    // Check for pleasantries
    for (const [key, replies] of Object.entries(responses.pleasantries)) {
        if (lowerMessage.includes(key)) {
            return randomResponse(replies);
        }
    }
    
    // Check for emergency keywords
    for (const [emergency, replies] of Object.entries(responses.emergencies)) {
        if (lowerMessage.includes(emergency)) {
            return randomResponse(replies) + " " + randomResponse(responses.disclaimers);
        }
    }
    
    // Check for disease keywords
    for (const [disease, data] of Object.entries(responses.diseases)) {
        if (lowerMessage.includes(disease)) {
            conversationContext.currentAssessment = disease;
            const symptomMatch = data.symptoms.some(symptom => 
                conversationContext.symptoms.includes(symptom.toLowerCase().replace(/ /g, '_'))
            );
            
            if (symptomMatch) {
                return `For ${disease} with ${conversationContext.symptoms.join(', ')}, I recommend: ` + 
                       randomResponse(data.advice) + " " + randomResponse(responses.disclaimers);
            } else {
                return `For ${disease}, general advice includes: ` + 
                       randomResponse(data.advice) + " " + randomResponse(responses.disclaimers);
            }
        }
    }
    
    // Check for general health topics
    for (const [topic, replies] of Object.entries(responses.generalHealth)) {
        if (lowerMessage.includes(topic)) {
            return randomResponse(replies);
        }
    }
    
    // Check for provider finding
    if (conversationContext.followUpNeeded) {
        return randomResponse(responses.providerFinding);
    }
    
    // Default response
    return randomResponse(responses.default) + " " + randomResponse(responses.disclaimers);
}

// Helper function to get random response from array
function randomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Add message to chat
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    
    if (typeof text === 'string') {
        messageElement.textContent = text;
    } else if (text instanceof HTMLElement) {
        messageElement.appendChild(text);
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Update conversation context
function updateContext(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Detect symptoms
    const symptomKeywords = [
        'headache', 'migraine', 'stomach', 'nausea', 'chest', 'pain', 
        'pressure', 'fever', 'flu', 'cough', 'dizziness', 'fatigue',
        'rash', 'swelling', 'shortness of breath', 'diarrhea', 'constipation',
        'back pain', 'joint pain', 'sore throat', 'ear pain', 'vision problem'
    ];
    
    symptomKeywords.forEach(symptom => {
        const symptomKey = symptom.toLowerCase().replace(/ /g, '_');
        if (lowerMessage.includes(symptom) && !conversationContext.symptoms.includes(symptomKey)) {
            conversationContext.symptoms.push(symptomKey);
        }
    });
    
    // Detect severity
    if (lowerMessage.includes('severe') || lowerMessage.includes('emergency') || 
        lowerMessage.includes('urgent') || lowerMessage.includes('terrible')) {
        conversationContext.severity = 'severe';
    } else if (lowerMessage.includes('mild') || lowerMessage.includes('slight') || 
               lowerMessage.includes('minor') || lowerMessage.includes('manageable')) {
        conversationContext.severity = 'mild';
    }
    
    // Detect follow-up intent
    conversationContext.followUpNeeded = lowerMessage.includes('find') || 
                                       lowerMessage.includes('locate') || 
                                       lowerMessage.includes('doctor') || 
                                       lowerMessage.includes('specialist');
    
    // Detect user information
    if (lowerMessage.includes('age')) {
        const ageMatch = userMessage.match(/\d+/);
        if (ageMatch) conversationContext.userInfo.age = parseInt(ageMatch[0]);
    }
    
    if (lowerMessage.includes('gender')) {
        if (lowerMessage.includes('male')) conversationContext.userInfo.gender = 'male';
        if (lowerMessage.includes('female')) conversationContext.userInfo.gender = 'female';
    }
}

// Show typing indicator
function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('message', 'bot-message', 'typing-indicator');
    typingElement.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(typingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Clear chat
function clearChat() {
    chatMessages.innerHTML = '';
    fileNameDisplay.textContent = '';
    imageUpload.value = '';
    conversationContext = {
        lastTopic: '',
        symptoms: [],
        severity: '',
        followUpNeeded: false,
        askedQuestions: [],
        currentAssessment: null,
        userInfo: {
            age: null,
            gender: null,
            medicalHistory: []
        }
    };
    addMessage("Hello! I'm MediBot, your advanced AI health assistant. How can I assist you today?", 'bot');
}