from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)

# Admin Panel
admin = Admin(app, name='Admin Panel', template_mode='bootstrap4')

# Database Models
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

# Add Models to Admin Panel
admin.add_view(ModelView(Review, db.session))
admin.add_view(ModelView(Message, db.session))

# Initialize the database
with app.app_context():
    db.create_all()

# API to submit reviews
@app.route('/submit-review', methods=['POST'])
def submit_review():
    data = request.json
    name = data.get('name')
    message = data.get('message')

    if not name or not message:
        return jsonify({"error": "Name and message are required"}), 400

    new_review = Review(name=name, message=message)
    db.session.add(new_review)
    db.session.commit()

    return jsonify({"message": "Review submitted successfully!"})

# API to get all reviews
@app.route('/get-reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.with_entities(Review.name, Review.message).all()
    return jsonify(reviews)

# API to handle contact form submissions
@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    contact = data.get('contact')
    message = data.get('message')

    if not name or not contact or not message:
        return jsonify({"error": "All fields are required"}), 400

    new_message = Message(name=name, contact=contact, message=message)
    db.session.add(new_message)
    db.session.commit()

    return jsonify({"message": "Message sent successfully!"})

@app.route('/')
def home():
    return "Backend is running!"

if __name__ == '__main__':
    app.run(debug=True, port=1808)
