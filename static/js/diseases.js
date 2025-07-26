// static/js/diseases.js
// Diseases data and functionality

// Disease data (in a real app, this would come from an API)
const diseasesData = [
    {
        name: "Diabetes",
        symptoms: "Increased thirst, frequent urination, fatigue, blurred vision",
        causes: "Genetic factors, obesity, sedentary lifestyle",
        treatment: "Insulin therapy, diet management, exercise",
        speciality: "Endocrinologist"
    },
    {
        name: "Hypertension",
        symptoms: "Headaches, shortness of breath, nosebleeds",
        causes: "High salt intake, stress, lack of exercise",
        treatment: "Medications, lifestyle changes, diet",
        speciality: "Cardiologist"
    },
    {
        name: "Cholesterol",
        symptoms: "Often asymptomatic; may lead to chest pain or heart issues",
        causes: "Poor diet, inactivity, genetics",
        treatment: "Statins, diet changes, exercise",
        speciality: "Cardiologist"
    },
    {
        name: "Thyroid Disorder",
        symptoms: "Fatigue, weight change, mood swings",
        causes: "Hormonal imbalance, autoimmune conditions",
        treatment: "Thyroid hormone therapy, regular check-ups",
        speciality: "Endocrinologist"
    },
    {
        name: "PCOD/PCOS",
        symptoms: "Irregular periods, weight gain, acne",
        causes: "Hormonal imbalance, genetics",
        treatment: "Lifestyle changes, hormonal treatment",
        speciality: "Gynecologist"
    },
    {
        name: "Anemia",
        symptoms: "Weakness, pale skin, shortness of breath",
        causes: "Iron deficiency, chronic diseases",
        treatment: "Iron supplements, diet modification",
        speciality: "General Physician"
    },
    {
        name: "Asthma",
        symptoms: "Wheezing, shortness of breath, chest tightness",
        causes: "Allergens, pollution, genetic factors",
        treatment: "Inhalers, avoiding triggers, medications",
        speciality: "Pulmonologist"
    },
    {
        name: "Migraine",
        symptoms: "Severe headache, nausea, light sensitivity",
        causes: "Hormonal changes, stress, certain foods",
        treatment: "Pain relievers, preventive medications",
        speciality: "Neurologist"
    },
    {
        name: "Arthritis",
        symptoms: "Joint pain, stiffness, swelling",
        causes: "Wear and tear, autoimmune conditions, infections",
        treatment: "Pain relievers, physical therapy, joint replacement",
        speciality: "Rheumatologist"
    },
    {
        name: "Depression",
        symptoms: "Persistent sadness, loss of interest, fatigue",
        causes: "Genetics, brain chemistry, life events",
        treatment: "Therapy, medications, lifestyle changes",
        speciality: "Psychiatrist"
    },
    {
        name: "Common Cold",
        symptoms: "Runny nose, sore throat, cough",
        causes: "Viral infection, seasonal changes",
        treatment: "Rest, fluids, over-the-counter meds",
        speciality: "General Physician"
    },
    {
        name: "Constipation",
        symptoms: "Infrequent stools, hard stool, bloating",
        causes: "Low fiber intake, dehydration, sedentary lifestyle",
        treatment: "Fiber diet, laxatives, hydration",
        speciality: "General Physician"
    },
    {
        name: "Indigestion",
        symptoms: "Bloating, discomfort, heartburn",
        causes: "Overeating, spicy foods, stress",
        treatment: "Antacids, light diet",
        speciality: "Gastroenterologist"
    },
    {
        name: "Skin Allergies",
        symptoms: "Itchy rashes, redness, swelling",
        causes: "Allergens, chemicals, cosmetics",
        treatment: "Antihistamines, creams",
        speciality: "Dermatologist"
    },
 {
        name: "Acidity",
        symptoms: "Burning sensation in chest, bloating, nausea",
        causes: "Spicy food, irregular meals, stress",
        treatment: "Antacids, dietary changes, hydration",
        speciality: "Gastroenterologist"
    },
    {
        name: "Back Pain",
        symptoms: "Lower or upper back discomfort",
        causes: "Bad posture, injury, sedentary life",
        treatment: "Stretching, painkillers, physiotherapy",
        speciality: "Orthopedic"
    }
];

// Export for use in other modules
window.diseasesData = diseasesData;
