const doctorsData = [
    {
        name: "Dr. Sarah Johnson",
        specialty: "Neurologist",
        location: "6.2 km away",
        phone: "+91-9876543210",
        rating: 4.8,
        address: "123 Ambadi Road, Vasai West, Mumbai"
    },
    {
        name: "Dr. Michael Chen",
        specialty: "General Physician",
        location: "4.5 km away",
        phone: "+91-9123456789",
        rating: 4.6,
        address: "56 Central Park Road, Nalasopara East, Mumbai"
    },
    {
        name: "Dr. Emily Rodriguez",
        specialty: "Internal Medicine",
        location: "12.3 km away",
        phone: "+91-9988776655",
        rating: 4.9,
        address: "789 Global City, Virar West, Mumbai"
    },
    {
        name: "Dr. James Wilson",
        specialty: "Cardiologist",
        location: "38.0 km away",
        phone: "+91-9876001234",
        rating: 4.7,
        address: "321 Lokhandwala Complex, Andheri West, Mumbai"
    },
    {
        name: "Dr. Priya Desai",
        specialty: "Pediatrician",
        location: "58.2 km away",
        phone: "+91-9898989898",
        rating: 4.8,
        address: "12 Breach Candy Hospital Road, South Mumbai"
    },
    {
        name: "Dr. Arjun Mehta",
        specialty: "Orthopedic Surgeon",
        location: "29.6 km away",
        phone: "+91-9611223344",
        rating: 4.5,
        address: "34 Carter Road, Bandra West, Mumbai"
    },
    {
        name: "Dr. Kavita Rao",
        specialty: "Dermatologist",
        location: "33.2 km away",
        phone: "+91-9012345678",
        rating: 4.7,
        address: "56 Juhu Tara Road, Juhu, Mumbai"
    },
    {
        name: "Dr. Rohan Singh",
        specialty: "ENT Specialist",
        location: "42.1 km away",
        phone: "+91-9765432100",
        rating: 4.6,
        address: "78 SV Road, Malad West, Mumbai"
    },
    {
        name: "Dr. Aisha Khan",
        specialty: "Gynecologist",
        location: "3.1 km away",
        phone: "+91-9090909090",
        rating: 4.9,
        address: "90 Veer Savarkar Marg, Vasai East, Mumbai"
    },
    {
        name: "Dr. Varun Kapoor",
        specialty: "Pulmonologist",
        location: "40.0 km away",
        phone: "+91-9333322222",
        rating: 4.4,
        address: "12 Chembur East, Mumbai"
    },
    {
        name: "Dr. Sneha Sharma",
        specialty: "Psychiatrist",
        location: "6.8 km away",
        phone: "+91-9876549876",
        rating: 4.6,
        address: "22 Yashwant Nagar, Virar East, Mumbai"
    },
    {
        name: "Dr. Manish Patel",
        specialty: "Oncologist",
        location: "51.3 km away",
        phone: "+91-9900990099",
        rating: 4.3,
        address: "35 BKC Complex, Bandra East, Mumbai"
    },
    {
        name: "Dr. Neha Verma",
        specialty: "Dentist",
        location: "36.5 km away",
        phone: "+91-7777888899",
        rating: 4.7,
        address: "42 Versova, Andheri West, Mumbai"
    },
    {
        name: "Dr. Harshita Nair",
        specialty: "Endocrinologist",
        location: "48.0 km away",
        phone: "+91-9666778899",
        rating: 4.8,
        address: "23 Tilak Nagar, Chembur West, Mumbai"
    },
    {
        name: "Dr. Rajeev Bansal",
        specialty: "Nephrologist",
        location: "32.4 km away",
        phone: "+91-9091919191",
        rating: 4.5,
        address: "16 Mulund West, Mumbai"
    },
    {
        name: "Dr. Alisha D’Costa",
        specialty: "Rheumatologist",
        location: "52.9 km away",
        phone: "+91-9151515151",
        rating: 4.4,
        address: "27 Charni Road, South Mumbai"
    },
    {
        name: "Dr. Nikhil Sinha",
        specialty: "Hematologist",
        location: "30.0 km away",
        phone: "+91-9822223333",
        rating: 4.6,
        address: "13 Bhandup West, Mumbai"
    },
    {
        name: "Dr. Meenakshi Goyal",
        specialty: "Allergist",
        location: "22.5 km away",
        phone: "+91-9345671234",
        rating: 4.8,
        address: "50 Borivali East, Mumbai"
    },
    {
        name: "Dr. Tarun Joshi",
        specialty: "Gastroenterologist",
        location: "59.3 km away",
        phone: "+91-9876767676",
        rating: 4.7,
        address: "67 Marine Lines, South Mumbai"
    },
    {
        name: "Dr. Ishita Shah",
        specialty: "Urologist",
        location: "46.0 km away",
        phone: "+91-9988998899",
        rating: 4.5,
        address: "11 Matunga Road, Mumbai"
    },
    {
        name: "Dr. Yash Gupta",
        specialty: "Ophthalmologist",
        location: "61.0 km away",
        phone: "+91-9011990011",
        rating: 4.9,
        address: "98 Colaba Causeway, South Mumbai"
    },
    {
        name: "Dr. Anjali Rawat",
        specialty: "Plastic Surgeon",
        location: "60.5 km away",
        phone: "+91-9123567890",
        rating: 4.3,
        address: "63 Marine Drive, South Mumbai"
    },
    {
        name: "Dr. Ramesh Kulkarni",
        specialty: "Radiologist",
        location: "27.0 km away",
        phone: "+91-9871001100",
        rating: 4.6,
        address: "44 Goregaon East, Mumbai"
    },
    {
        name: "Dr. Preeti Tiwari",
        specialty: "Immunologist",
        location: "34.0 km away",
        phone: "+91-9988771122",
        rating: 4.5,
        address: "30 Santacruz West, Mumbai"
    },
    {
        name: "Dr. Ajay Thakur",
        specialty: "Infectious Disease Specialist",
        location: "50.3 km away",
        phone: "+91-9443322110",
        rating: 4.7,
        address: "15 Wadala East, Mumbai"
    },
    {
        name: "Dr. Simran Kaur",
        specialty: "Anesthesiologist",
        location: "35.8 km away",
        phone: "+91-9878888888",
        rating: 4.8,
        address: "29 Vile Parle East, Mumbai"
    },
    {
        name: "Dr. Vivek Anand",
        specialty: "Pathologist",
        location: "8.5 km away",
        phone: "+91-9090901122",
        rating: 4.6,
        address: "17 Agarwal Nagar, Vasai East, Mumbai"
    },
];

// Export for use in other modules
window.doctorsData = doctorsData;


