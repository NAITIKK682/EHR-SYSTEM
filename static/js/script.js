// static/js/script.js
// Main JavaScript file for the EHR system

// DOM Elements
const diseaseSearch = document.getElementById('disease-search');
const diseasesContainer = document.getElementById('diseases-container');
const doctorsContainer = document.getElementById('doctors-container');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load diseases data
    loadDiseases();
    
    // Load doctors data
    loadDoctors();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize chatbot
    initChatbot();
});

function loadDiseases() {
    const diseases = [
        {
            name: "Common Cold",
            symptoms: "Sneezing, runny nose, sore throat",
            causes: "Virus, weather change",
            treatment: "Rest, fluids, paracetamol"
        },
        {
            name: "Headache",
            symptoms: "Throbbing or dull head pain",
            causes: "Stress, dehydration, screen time",
            treatment: "Painkillers, rest, hydration"
        },
        {
            name: "Acne",
            symptoms: "Pimples, blackheads, oily skin",
            causes: "Hormones, dirt, food habits",
            treatment: "Face wash, creams, healthy food"
        },
        {
            name: "Indigestion",
            symptoms: "Gas, bloating, stomach discomfort",
            causes: "Spicy/fatty food, overeating",
            treatment: "Antacids, light meals, rest"
        },
        {
            name: "Constipation",
            symptoms: "Hard stools, infrequent bowel movements",
            causes: "Low fiber diet, dehydration",
            treatment: "Water, fiber, mild laxatives"
        },
        {
            name: "Cough",
            symptoms: "Dry or wet cough",
            causes: "Infection, allergy, cold air",
            treatment: "Syrup, warm fluids, steam"
        },
        {
            name: "Toothache",
            symptoms: "Sharp or dull pain in teeth",
            causes: "Cavities, infection, cold food",
            treatment: "Dental care, pain relievers"
        },
        {
            name: "Eye Strain",
            symptoms: "Blurred vision, dry eyes",
            causes: "Screen time, poor lighting",
            treatment: "Rest eyes, eye drops"
        },
        {
            name: "Allergies",
            symptoms: "Sneezing, itching, skin rashes",
            causes: "Dust, pollen, foods",
            treatment: "Antihistamines, avoid triggers"
        },
        {
            name: "Fatigue",
            symptoms: "Low energy, weakness",
            causes: "Lack of sleep, poor diet",
            treatment: "Sleep, exercise, nutrition"
        },
        {
            name: "Mouth Ulcers",
            symptoms: "Small painful sores inside mouth",
            causes: "Spicy food, stress, deficiency",
            treatment: "Topical gel, soft food"
        },
        {
            name: "Skin Rashes",
            symptoms: "Red, itchy skin patches",
            causes: "Heat, allergies, infections",
            treatment: "Ointment, clean skin"
        },
        {
            name: "Back Pain",
            symptoms: "Pain in lower or upper back",
            causes: "Poor posture, strain",
            treatment: "Stretching, rest, physiotherapy"
        },
        {
            name: "Diabetes (Sugar)",
            symptoms: "Frequent urination, fatigue, thirst",
            causes: "High blood sugar, genetics",
            treatment: "Insulin, diet, exercise"
        },
        {
            name: "Hypertension (BP)",
            symptoms: "Headache, dizziness, chest pain",
            causes: "Stress, high salt, obesity",
            treatment: "Medication, diet, walk"
        },
        {
            name: "Cholesterol",
            symptoms: "Usually none, can cause heart issues",
            causes: "Fatty food, lack of activity",
            treatment: "Diet, medication, walk"
        },
        {
            name: "PCOD / PCOS",
            symptoms: "Irregular periods, acne, weight gain",
            causes: "Hormonal imbalance",
            treatment: "Healthy lifestyle, medication"
        },
        {
            name: "Thyroid (Hypo/Hyper)",
            symptoms: "Weight changes, fatigue, mood swings",
            causes: "Hormone imbalance",
            treatment: "Thyroid tablets, tests"
        },
        {
            name: "Anemia",
            symptoms: "Pale skin, weakness, short breath",
            causes: "Low iron, blood loss",
            treatment: "Iron supplements, diet"
        },
       
        {
        name: "Acidity",
        symptoms: "Burning sensation in chest, bloating, nausea",
        causes: "Spicy food, irregular meals, stress",
        treatment: "Antacids, dietary changes, hydration",
        speciality: "Gastroenterologist"
    },
        {
            name: "Gastric Problems",
            symptoms: "Stomach pain, gas, discomfort",
            causes: "Fast food, eating habits",
            treatment: "Antacids, avoid spicy food"
        }
    ];

    renderDiseases(diseases);
}


// Render diseases to the page
function renderDiseases(diseases) {
    diseasesContainer.innerHTML = '';
    
    diseases.forEach(disease => {
        const diseaseCard = document.createElement('div');
        diseaseCard.className = 'disease-card';
        diseaseCard.innerHTML = `
            <div class="disease-card-header">${disease.name}</div>
            <div class="disease-card-body">
                <p><strong>Symptoms:</strong> ${disease.symptoms}</p>
                <p><strong>Causes:</strong> ${disease.causes}</p>
                <p><strong>Treatment:</strong> ${disease.treatment}</p>
            </div>
        `;
        diseasesContainer.appendChild(diseaseCard);
    });
}

// Filter diseases based on search input
diseaseSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    // In a real app, this would filter the diseases array
    console.log('Searching for:', searchTerm);
});

// Load doctors data
function loadDoctors() {
    // In a real application, this would fetch from an API
    const doctors = [
        {
            name: "Dr. Sarah Johnson",
            specialty: "Neurologist",
            location: "2.3 km away",
            phone: "+91 95551 23456",
            rating: 4.8
        },
        {
            name: "Dr. Michael Chen",
            specialty: "General Physician",
            location: "3.1 km away",
            phone: "+91 95559 87654",
            rating: 4.6
        },
        {
            name: "Dr. Emily Rodriguez",
            specialty: "Internal Medicine",
            location: "4.7 km away",
            phone: "+91 95554 56789",
            rating: 4.9
        },
        {
            name: "Dr. James Wilson",
            specialty: "Cardiologist",
            location: "1.8 km away",
            phone: "+91 95552 34567",
            rating: 4.7
        },
        {
            name: "Dr. Priya Desai",
            specialty: "Pediatrician",
            location: "2.2 km away",
            phone: "+91 95551 11222",
            rating: 4.8
        },
        {
            name: "Dr. Arjun Mehta",
            specialty: "Orthopedic Surgeon",
            location: "3.5 km away",
            phone: "+91 95553 33444",
            rating: 4.5
        },
        {
            name: "Dr. Kavita Rao",
            specialty: "Dermatologist",
            location: "2.9 km away",
            phone: "+91 95555 55666",
            rating: 4.7
        },
        {
            name: "Dr. Rohan Singh",
            specialty: "ENT Specialist",
            location: "4.1 km away",
            phone: "+91 95557 77888",
            rating: 4.6
        },
        {
            name: "Dr. Aisha Khan",
            specialty: "Gynecologist",
            location: "1.2 km away",
            phone: "+91 95559 99000",
            rating: 4.9
        },
        {
            name: "Dr. Varun Kapoor",
            specialty: "Pulmonologist",
            location: "3.8 km away",
            phone: "+91 95551 01202",
            rating: 4.4
        },
        {
            name: "Dr. Sneha Sharma",
            specialty: "Psychiatrist",
            location: "2.6 km away",
            phone: "+91 95553 03404",
            rating: 4.6
        },
        {
            name: "Dr. Manish Patel",
            specialty: "Oncologist",
            location: "5.0 km away",
            phone: "+91 95555 05606",
            rating: 4.3
        },
        {
            name: "Dr. Neha Verma",
            specialty: "Dentist",
            location: "1.9 km away",
            phone: "+91 95557 07808",
            rating: 4.7
        },
        {
            name: "Dr. Harshita Nair",
            specialty: "Endocrinologist",
            location: "3.3 km away",
            phone: "+91 95559 09101",
            rating: 4.8
        },
        {
            name: "Dr. Rajeev Bansal",
            specialty: "Nephrologist",
            location: "4.6 km away",
            phone: "+91 95551 11313",
            rating: 4.5
        },
        {
            name: "Dr. Alisha D’Costa",
            specialty: "Rheumatologist",
            location: "2.5 km away",
            phone: "+91 95551 41515",
            rating: 4.4
        },
        {
            name: "Dr. Nikhil Sinha",
            specialty: "Hematologist",
            location: "3.0 km away",
            phone: "+91 95556 16171",
            rating: 4.6
        },
        {
            name: "Dr. Meenakshi Goyal",
            specialty: "Allergist",
            location: "1.6 km away",
            phone: "+91 95558 18191",
            rating: 4.8
        },
        {
            name: "Dr. Tarun Joshi",
            specialty: "Gastroenterologist",
            location: "2.4 km away",
            phone: "+91 95552 12232",
            rating: 4.7
        },
        {
            name: "Dr. Ishita Shah",
            specialty: "Urologist",
            location: "3.7 km away",
            phone: "+91 95554 34454",
            rating: 4.5
        },
        {
            name: "Dr. Yash Gupta",
            specialty: "Ophthalmologist",
            location: "2.1 km away",
            phone: "+91 95556 56676",
            rating: 4.9
        },
        {
            name: "Dr. Anjali Rawat",
            specialty: "Plastic Surgeon",
            location: "4.0 km away",
            phone: "+91 95558 78989",
            rating: 4.3
        },
        {
            name: "Dr. Ramesh Kulkarni",
            specialty: "Radiologist",
            location: "1.7 km away",
            phone: "+91 95551 91212",
            rating: 4.6
        },
        {
            name: "Dr. Preeti Tiwari",
            specialty: "Immunologist",
            location: "2.8 km away",
            phone: "+91 95552 32434",
            rating: 4.5
        },
        {
            name: "Dr. Ajay Thakur",
            specialty: "Infectious Disease Specialist",
            location: "3.9 km away",
            phone: "+91 95554 54565",
            rating: 4.7
        },
        {
            name: "Dr. Simran Kaur",
            specialty: "Anesthesiologist",
            location: "4.3 km away",
            phone: "+91 95556 76787",
            rating: 4.8
        },
        {
            name: "Dr. Vivek Anand",
            specialty: "Pathologist",
            location: "1.5 km away",
            phone: "+91 95558 98909",
            rating: 4.6
        }
    ];

    renderDoctors(doctors);
}


// Render doctors to the page
function renderDoctors(doctors) {
    doctorsContainer.innerHTML = '';

    doctors.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card';
        doctorCard.innerHTML = `
            <div class="doctor-header">
                <div class="doctor-avatar">DR</div>
                <div class="doctor-info">
                    <h3>${doctor.name}</h3>
                    <p>${doctor.specialty}</p>
                </div>
            </div>
            <div class="doctor-body">
                <p><i class="fas fa-map-marker-alt"></i> ${doctor.location}</p>
                <p><i class="fas fa-phone"></i> ${doctor.phone}</p>
                <p><i class="fas fa-star"></i> ${doctor.rating} Rating</p>
            </div>
            <div class="doctor-footer">
                <button class="btn btn-small btn-outline">View Profile</button>
                <button class="btn btn-small btn-primary book-btn">Book Appointment</button>
            </div>
        `;

        // Add click event to Book Appointment button
    const bookBtn = doctorCard.querySelector('.book-btn');
bookBtn.addEventListener('click', () => {
    const encodedName = encodeURIComponent(doctor.name);
    // Change this line:
    window.location.href = `/appointment?doctor=${encodedName}`;
});

function generateAndSendPDF(appointment) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Appointment Confirmation", 20, 20);

    const details = [
        `Appointment ID: ${appointment.appointmentId}`,
        `Patient Name: ${appointment.name}`,
        `Email: ${appointment.email}`,
        `Phone: ${appointment.phone}`,
        `Doctor: ${appointment.doctor}`,
        `Date: ${appointment.date}`,
        `Time: ${appointment.time}`,
        `Department: ${appointment.department}`,
        `Reason: ${appointment.reason}`
    ];

    let y = 40;
    details.forEach(line => {
        doc.setFontSize(12);
        doc.text(line, 20, y);
        y += 10;
    });

    const filename = `Appointment_${appointment.appointmentId}.pdf`;
    const pdfBlob = doc.output('blob');

    const formData = new FormData();
    formData.append('pdf', pdfBlob, filename);

    // Send to Flask
    fetch('/save_appointment_pdf', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        console.log("✅ Server Response:", data);
    })
    .catch(err => {
        console.error("❌ Upload failed:", err);
    });
}


        doctorsContainer.appendChild(doctorCard);
    });
}


// Set up event listeners
function setupEventListeners() {
    // Navigation active state
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize chatbot
function initChatbot() {
    // This would initialize the chatbot functionality
    console.log('Chatbot initialized');
}

// Voice recognition functionality
const voiceBtn = document.getElementById('voice-btn');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

voiceBtn.addEventListener('click', () => {
    recognition.start();
    voiceBtn.innerHTML = '<i class="fas fa-microphone-alt"></i>';
    voiceBtn.style.background = '#ff5252';
});

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('user-input').value = transcript;
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    voiceBtn.style.background = 'rgba(255, 255, 255, 0.2)';
};

recognition.onerror = function(event) {
    console.error('Speech recognition error', event.error);
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    voiceBtn.style.background = 'rgba(255, 255, 255, 0.2)';
};