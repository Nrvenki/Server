
# # WITHOUT THESE CONDITION


# import pickle as pkl
# import os
# import pandas as pd
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# # Load scaler and model
# script_dir = os.path.dirname(os.path.abspath(__file__))
# scaler_path = os.path.join(script_dir, 'scaler.pkl')
# model_path = os.path.join(script_dir, 'bagging.pkl')  # Ensure this is the correct model file

# # Check if files exist before loading
# if not os.path.exists(scaler_path) or not os.path.exists(model_path):
#     print("Error: 'scaler.pkl' or 'bagging.pkl' not found in the script directory")
#     exit(1)

# try:
#     with open(scaler_path, 'rb') as scaler_file:
#         scaler = pkl.load(scaler_file)
#     with open(model_path, 'rb') as model_file:
#         model = pkl.load(model_file)
# except Exception as e:
#     print(f"Error loading model or scaler: {str(e)}")
#     exit(1)

# # Set threshold
# THRESHOLD = 0.5

# def predict(Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age):
#     # Create input DataFrame with the 7 features
#     input_data = pd.DataFrame([[Glucose, BloodPressure, SkinThickness,
#                                 Insulin, Bmi, Dpf, Age]],
#                               columns=['Glucose', 'BloodPressure', 'SkinThickness',
#                                        'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'])

#     # Scale the input data
#     try:
#         input_scaled = scaler.transform(input_data)
#     except Exception as e:
#         raise ValueError(f"Scaling error: {str(e)}")

#     # Get probability prediction
#     try:
#         probabilities = model.predict_proba(input_scaled)[0]  # Probability for both classes
#         probability_positive = probabilities[1]  # Probability of class 1 (Diabetes)
#         prediction = 1 if probability_positive >= THRESHOLD else 0

#         debug_info = f"DEBUG: Probabilities: {probabilities}, Threshold: {THRESHOLD}, Prediction: {prediction}"
#         print(debug_info)
#     except Exception as e:
#         raise ValueError(f"Prediction error: {str(e)}")

#     # Return result
#     if prediction == 1:
#         result = {
#             'prediction': "You have high chances of Diabetes! Please consult a Doctor.'POSITIVE'",
#             'probability': round(probability_positive, 4),
#             'threshold': THRESHOLD,
#             'gif_url': "https://media.giphy.com/media/3o6wrebnKWmvx4ZBio/giphy.gif",
#             'debug': debug_info
#         }
#     else:
#         result = {
#             'prediction': "You have low chances of Diabetes. Please maintain a healthy lifestyle.'NEGATIVE'",
#             'probability': round(probability_positive, 4),
#             'threshold': THRESHOLD,
#             'gif_url': "https://media.giphy.com/media/W1GG6RYUcWxoHl3jV9/giphy.gif",
#             'debug': debug_info
#         }
#     return result

# @app.route('/predict', methods=['POST'])
# def predictions():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400

#         required_fields = ['Age', 'Glucose', 'BloodPressure',
#                            'Insulin', 'BMI', 'SkinThickness', 'DPF']

#         for field in required_fields:
#             if field not in data or data[field] is None:
#                 return jsonify({'error': f'Missing or null field: {field}'}), 400

#         # Convert inputs to float
#         try:
#             Age = float(data['Age'])
#             Glucose = float(data['Glucose'])
#             BloodPressure = float(data['BloodPressure'])
#             Insulin = float(data['Insulin'])
#             Bmi = float(data['BMI'])
#             SkinThickness = float(data['SkinThickness'])
#             Dpf = float(data['DPF'])
#         except ValueError:
#             return jsonify({'error': 'All inputs must be numeric'}), 400

#         # Ensure non-negative values where appropriate
#         if any(x < 0 for x in [Age, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf]):
#             return jsonify({'error': 'Input values cannot be negative'}), 400

#         result = predict(Glucose, BloodPressure, SkinThickness,
#                          Insulin, Bmi, Dpf, Age)
#         return jsonify(result)

#     except Exception as e:
#         return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8000, debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

# Load model and scaler
model = joblib.load('bagging.pkl')
scaler = joblib.load('scaler.pkl')

# Define a threshold for classification
THRESHOLD = 0.5

def prediction(data):
    try:
        features = [
            data.get("Pregnancies", 0),
            data.get("Glucose", 0),
            data.get("BloodPressure", 0),
            data.get("SkinThickness", 0),
            data.get("Insulin", 0),
            data.get("BMI", 0.0),
            data.get("DiabetesPedigreeFunction", 0.0),
            data.get("Age", 0)
        ]

        # Prepare input for model
        input_array = np.array([features])
        input_scaled = scaler.transform(input_array)

        # Get predicted probabilities
        probabilities = model.predict_proba(input_scaled)[0]
        probability_positive = probabilities[1]  # Probability of being diabetic

        # Prediction based on threshold
        prediction_result = int(probability_positive >= THRESHOLD)

        # Debug information
        debug_info = {
            "input_features": features,
            "scaled_input": input_scaled.tolist(),
            "probabilities": probabilities.tolist()
        }

        # Chart data for frontend
        labels = [
            "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
            "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
        ]
        chartData = {
            "labels": labels,
            "datasets": [
                {
                    "data": features
                }
            ]
        }

        if prediction_result == 1:
            result = {
                'prediction': "You have high chances of Diabetes! Please consult a Doctor. 'POSITIVE'",
                'probability': round(probability_positive, 4),
                'threshold': THRESHOLD,
                'gif_url': "https://media.giphy.com/media/3o6wrebnKWmvx4ZBio/giphy.gif",
                'chartData': chartData,
                'debug': debug_info
            }
        else:
            result = {
                'prediction': "You have low chances of Diabetes. Please maintain a healthy lifestyle. 'NEGATIVE'",
                'probability': round(probability_positive, 4),
                'threshold': THRESHOLD,
                'gif_url': "https://media.giphy.com/media/W1GG6RYUcWxoHl3jV9/giphy.gif",
                'chartData': chartData,
                'debug': debug_info
            }

        return result

    except Exception as e:
        return {"error": str(e)}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        result = prediction(data)
        if "error" in result:
            return jsonify(result), 500

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
