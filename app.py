from flask import Flask, render_template, request, jsonify, redirect, url_for, send_from_directory
import sqlite3
import json
import os
from datetime import datetime
import uuid
from reportlab.pdfgen import canvas

app = Flask(__name__,
            template_folder='templates',
            static_folder='static',
            static_url_path='/static')

# Folders
UPLOAD_FOLDER = os.path.join(app.static_folder, 'uploads')
USER_DATA_FOLDER = os.path.join(app.static_folder, 'user_data')
CHATBOT_UPLOAD_FOLDER = os.path.join(app.static_folder, 'chatbot_uploads')  # New folder for chatbot images
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(USER_DATA_FOLDER, exist_ok=True)
os.makedirs(CHATBOT_UPLOAD_FOLDER, exist_ok=True)  # Create chatbot uploads folder

# Correct Appointment folder path
APPOINTMENT_FOLDER = os.path.join(app.root_path, 'static', 'Appointment')
os.makedirs(APPOINTMENT_FOLDER, exist_ok=True)


# ---------- Database Setup ----------
def init_db():
    conn = sqlite3.connect('ehr.db')
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS diseases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        symptoms TEXT,
        causes TEXT,
        treatment TEXT,
        speciality TEXT)''')

    c.execute('''CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        specialty TEXT,
        location TEXT,
        phone TEXT,
        rating REAL)''')

    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'patient')''')

    # Seed data (unchanged)
    c.execute("SELECT COUNT(*) FROM diseases")
    if c.fetchone()[0] == 0:
        diseases = [
            ("Diabetes", "Increased thirst...", "Genetic, obesity", "Insulin, diet", "Endocrinologist"),
            ("Hypertension", "Headaches...", "Salt, stress", "Medications, diet", "Cardiologist"),
            ("Asthma", "Wheezing...", "Allergens", "Inhalers", "Pulmonologist")
        ]
        c.executemany("INSERT INTO diseases (name, symptoms, causes, treatment, speciality) VALUES (?, ?, ?, ?, ?)", diseases)

    c.execute("SELECT COUNT(*) FROM doctors")
    if c.fetchone()[0] == 0:
        doctors = [
            ("Dr. Sarah Johnson", "Neurologist", "2.3 km away", "+91-9876543210", 4.8),
            ("Dr. Michael Chen", "General Physician", "3.1 km away", "+91-8765432109", 4.6),
            ("Dr. Emily Rodriguez", "Internal Medicine", "4.7 km away", "+91-7654321098", 4.9)
        ]
        c.executemany("INSERT INTO doctors (name, specialty, location, phone, rating) VALUES (?, ?, ?, ?, ?)", doctors)

    conn.commit()
    conn.close()

# ---------- New Chatbot Image Upload Endpoints ----------
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_image_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS

@app.route('/api/chatbot/upload', methods=['POST'])
def chatbot_image_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_image_file(file.filename):
        # Generate unique filename
        ext = file.filename.rsplit('.', 1)[1].lower()
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = os.path.join(CHATBOT_UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # Here you would add your actual image analysis logic
        analysis_result = analyze_chatbot_image(filepath)
        
        return jsonify({
            'status': 'success',
            'filename': filename,
            'image_url': f'/static/chatbot_uploads/{filename}',
            'analysis': analysis_result
        })
    
    return jsonify({'error': 'Allowed file types: png, jpg, jpeg, gif, webp'}), 400

def analyze_chatbot_image(filepath):
    """Replace this with actual medical image analysis logic"""
    # Sample response - implement your actual analysis here
    return {
        'diagnosis': 'No abnormalities detected',
        'confidence': 0.92,
        'recommendation': 'Routine follow-up recommended'
    }

@app.route('/static/chatbot_uploads/<filename>')
def serve_chatbot_image(filename):
    return send_from_directory(CHATBOT_UPLOAD_FOLDER, filename)

# ---------- Existing Routes (unchanged) ----------
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/appointment')
def appointment():
    return render_template('appointment.html')


@app.route('/uploads')
def uploads():
    return render_template('uploads.html')

# Folder to store uploaded reports and PDFs
USER_DATA_FOLDER = 'static/user_data'
os.makedirs(USER_DATA_FOLDER, exist_ok=True)

@app.route('/save-profile', methods=['POST'])
def save_profile():
    name = request.form.get('name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    dob = request.form.get('dob')
    gender = request.form.get('gender')
    blood_group = request.form.get('blood_group')
    height = request.form.get('height')
    weight = request.form.get('weight')
    address = request.form.get('address')
    emergency_contact = request.form.get('emergency_contact')
    allergies = request.form.get('allergies')
    conditions = request.form.get('conditions')

    # Upload report file
    report = request.files.get('report')
    report_filename = ""
    if report and report.filename:
        report_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{report.filename}"
        report.save(os.path.join(USER_DATA_FOLDER, report_filename))

    # Data dictionary for writing to PDF
    data = {
        "Name": name,
        "Email": email,
        "Phone": phone,
        "Date of Birth": dob,
        "Gender": gender,
        "Blood Group": blood_group,
        "Height": height,
        "Weight": weight,
        "Address": address,
        "Emergency Contact": emergency_contact,
        "Allergies": allergies,
        "Conditions": conditions
    }

    # Create PDF file
    pdf_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{name.replace(' ', '_')}.pdf"
    pdf_path = os.path.join(USER_DATA_FOLDER, pdf_filename)
    c = canvas.Canvas(pdf_path)
    y = 800
    c.setFont("Helvetica", 12)
    c.drawString(50, y + 20, "Patient Profile Information")
    for key, value in data.items():
        c.drawString(50, y, f"{key}: {value}")
        y -= 20
    if report_filename:
        c.drawString(50, y, f"Report File: {report_filename}")
    c.save()

    print(f"✅ Profile PDF saved: {pdf_filename}")
    return redirect(url_for('profile'))

@app.route('/upload/<record_type>', methods=['POST'])
def upload_record(record_type):
    file = None
    if record_type == 'lab-reports':
        file = request.files.get('labReport')
    elif record_type == 'vaccination':
        file = request.files.get('vaccinationReport')
    elif record_type == 'prescription':
        file = request.files.get('prescription')

    if file and file.filename:
        filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{file.filename}"
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        print(f"✅ Uploaded: {filename}")
    else:
        print("❌ No file received.")

    return redirect(url_for('uploads'))

@app.route('/add/medical-history', methods=['POST'])
def add_medical_history():
    history = request.form.get('historyText')
    if history:
        filename = f"medical_history_{datetime.now().strftime('%Y%m%d%H%M%S')}.txt"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(history)
        print("✅ Medical history saved to uploads.")
    else:
        print("❌ No history text found.")
    return redirect(url_for('uploads'))



@app.route('/save_appointment_pdf', methods=['POST'])
def save_appointment_pdf():
    print("📥 PDF save route hit")

    file = request.files.get('pdf')
    if not file or file.filename == '':
        return 'No PDF received', 400

    filename = file.filename
    save_path = os.path.join(APPOINTMENT_FOLDER, filename)
    file.save(save_path)

    print(f"✅ Saved PDF: {save_path}")
    return 'PDF saved successfully', 200



# ---------- Existing APIs (unchanged) ----------
@app.route('/api/diseases')
def get_diseases():
    conn = sqlite3.connect('ehr.db')
    c = conn.cursor()
    c.execute("SELECT * FROM diseases")
    diseases = c.fetchall()
    conn.close()
    return jsonify([
        {'id': d[0], 'name': d[1], 'symptoms': d[2], 'causes': d[3], 'treatment': d[4], 'speciality': d[5]}
        for d in diseases
    ])

@app.route('/api/doctors')
def get_doctors():
    conn = sqlite3.connect('ehr.db')
    c = conn.cursor()
    c.execute("SELECT * FROM doctors")
    doctors = c.fetchall()
    conn.close()
    return jsonify([
        {'id': doc[0], 'name': doc[1], 'specialty': doc[2], 'location': doc[3], 'phone': doc[4], 'rating': doc[5]}
        for doc in doctors
    ])

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    if 'headache' in user_message.lower():
        response = "Please consult a neurologist."
    else:
        response = "I recommend consulting a specialist."
    return jsonify({'response': response})

@app.route('/api/login', methods=['POST'])
def login_api():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if email and password:
        conn = sqlite3.connect('ehr.db')
        c = conn.cursor()
        c.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
        user = c.fetchone()
        conn.close()
        if user:
            return jsonify({'success': True, 'message': 'Login successful', 'redirect': url_for('profile')})
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    return jsonify({'success': False, 'message': 'Missing email/password'}), 400

@app.route('/api/signup', methods=['POST'])
def signup_api():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    if password != confirm_password:
        return jsonify({'success': False, 'message': 'Passwords do not match'}), 400
    try:
        conn = sqlite3.connect('ehr.db')
        c = conn.cursor()
        c.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", (username, email, password))
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'redirect': url_for('login')})
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'message': 'Email or username already exists'}), 409

# ---------- Start ----------
if __name__ == '__main__':
    init_db()
    app.run(debug=True)