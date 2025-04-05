
# WITHOUT THESE CONDITION


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

# import pickle as pkl
# import os
# import pandas as pd
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import time

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# # Load scaler and model **only once** at startup
# script_dir = os.path.dirname(os.path.abspath(__file__))
# scaler_path = os.path.join(script_dir, 'scaler.pkl')
# model_path = os.path.join(script_dir, 'bagging.pkl')  

# if not os.path.exists(scaler_path) or not os.path.exists(model_path):
#     raise FileNotFoundError("Error: 'scaler.pkl' or 'bagging.pkl' not found in the script directory")

# try:
#     with open(scaler_path, 'rb') as scaler_file:
#         scaler = pkl.load(scaler_file)
#     with open(model_path, 'rb') as model_file:
#         model = pkl.load(model_file)
# except Exception as e:
#     raise RuntimeError(f"Error loading model or scaler: {str(e)}")

# # Set threshold
# THRESHOLD = 0.5

# def predict(Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age):
#     start_time = time.time()  # Start timer

#     # Special condition: Age below 19, Glucose below 100, and BMI above 28
#     if Age < 19 and Glucose < 100 and Bmi > 28:
#         return {
#             'prediction': "You have low chances of Diabetes. Please maintain a healthy lifestyle.",
#             'probability': 0.0,
#             'threshold': THRESHOLD,
#             'gif_url': "https://media.giphy.com/media/W1GG6RYUcWxoHl3jV9/giphy.gif"
#         }

#     # If glucose is extremely high, assume high diabetes risk
#     if Glucose > 230:
#         return {
#             'prediction': "You have high chances of Diabetes! Please consult a Doctor.'POSITIVE'",
#             'probability': 1.0,
#             'threshold': THRESHOLD,
#             'gif_url': "https://media.giphy.com/media/3o6wrebnKWmvx4ZBio/giphy.gif"
#         }

#     # Prepare input data
#     input_data = pd.DataFrame([[Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age]],
#                               columns=['Glucose', 'BloodPressure', 'SkinThickness',
#                                        'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'])

#     # Scale input data
#     try:
#         input_scaled = scaler.transform(input_data)
#     except Exception as e:
#         return {'error': f"Scaling error: {str(e)}"}

#     # Predict probability
#     try:
#         probabilities = model.predict_proba(input_scaled)[0]
#         probability_positive = probabilities[1]
#         prediction = 1 if probability_positive >= THRESHOLD else 0
#     except Exception as e:
#         return {'error': f"Prediction error: {str(e)}"}

#     # Check execution time
#     execution_time = time.time() - start_time
#     if execution_time > 5:  # If prediction takes longer than 5 seconds, return an error
#         return {'error': 'Prediction is taking longer than expected. Please try again later.'}

#     # Return result
#     if prediction == 1:
#         return {
#             'prediction': "You have high chances of Diabetes! Please consult a Doctor.'POSITIVE'",
#             'probability': round(probability_positive, 4),
#             'threshold': THRESHOLD,
#             'gif_url': "https://media.giphy.com/media/3o6wrebnKWmvx4ZBio/giphy.gif"
#         }
#     else:
#         return {
#             'prediction': "You have low chances of Diabetes. Please maintain a healthy lifestyle.'NEGATIVE'",
#             'probability': round(probability_positive, 4),
#             'threshold': THRESHOLD,
#             'gif_url': "https://media.giphy.com/media/W1GG6RYUcWxoHl3jV9/giphy.gif"
#         }

# @app.route('/predict', methods=['POST'])
# def predictions():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400

#         # Required fields
#         required_fields = ['Age', 'Glucose', 'BloodPressure', 'Insulin', 'BMI', 'SkinThickness', 'DPF']
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

#         # Ensure non-negative values
#         if any(x < 0 for x in [Age, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf]):
#             return jsonify({'error': 'Input values cannot be negative'}), 400

#         # Run prediction
#         result = predict(Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age)
#         return jsonify(result)

#     except Exception as e:
#         return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8000, debug=True, threaded=True)  # Enable threading for faster responses


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
# model_path = os.path.join(script_dir, 'bagging.pkl')

# if not os.path.exists(scaler_path) or not os.path.exists(model_path):
#     print("Error: 'scaler.pkl' or 'bagging.pkl' not found")
#     exit(1)

# try:
#     scaler = pkl.load(open(scaler_path, 'rb'))
#     model = pkl.load(open(model_path, 'rb'))
# except Exception as e:
#     print(f"Error loading model or scaler: {str(e)}")
#     exit(1)

# # Prediction logic
# def predict(Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age):
#     input_data = pd.DataFrame([[Glucose, BloodPressure, SkinThickness, 
#                                 Insulin, Bmi, Dpf, Age]],
#                               columns=['Glucose', 'BloodPressure', 'SkinThickness',
#                                        'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'])
    
#     try:
#         input_scaled = scaler.transform(input_data)
#         probabilities = model.predict_proba(input_scaled)[0]
#         probability_positive = probabilities[1]
#     except Exception as e:
#         raise ValueError(f"Prediction error: {str(e)}")

#     # ✅ Print to console
#     print(f"Probabilities: {probabilities} Threshold: 0.5")

#     # Classification based on thresholds
#     if probability_positive >= 0.65:
#         status = "You have high chances of Diabetes! Please consult a doctor.'DIABETIC'."
#         message = "You have high chances of Diabetes! Please consult a doctor."
#         gif = "https://media.giphy.com/media/3o6wrebnKWmvx4ZBio/giphy.gif"
#     elif 0.5 <= probability_positive < 0.64:
#         status = "You might be in the prediabetes range. Keep monitoring your health.'PREDIABETIC'."
#         message = "You might be in the prediabetes range. Keep monitoring your health."
#         gif = "https://media.giphy.com/media/JFawGLFMCJNDi/giphy.gif"
#     else:
#         status = "You have low chances of Diabetes. Stay healthy!'NON-DIABETIC'."
#         message = "You have low chances of Diabetes. Stay healthy!"
#         gif = "https://media.giphy.com/media/W1GG6RYUcWxoHl3jV9/giphy.gif"

#     # Create response
#     result = {
#         'prediction': status,
#         'message': message,
#         'probability': round(probability_positive, 4),
#         'thresholds': {
#             'non_diabetic': '< 0.5',
#             'prediabetic': '0.5 - 0.65',
#             'diabetic': '>= 0.75'
#         },
#         'gif_url': gif,
#         'debug_probabilities': [round(p, 4) for p in probabilities]
#     }

#     # Add length of result
#     result['result_length'] = len(result)
#     return result

# # Prediction endpoint
# @app.route('/predict', methods=['POST'])
# def predictions():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400

#         required_fields = ['Age', 'Glucose', 'BloodPressure', 'Insulin', 'BMI', 'SkinThickness', 'DPF']
#         for field in required_fields:
#             if field not in data or data[field] is None:
#                 return jsonify({'error': f'Missing or null field: {field}'}), 400

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

#         if any(x < 0 for x in [Age, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf]):
#             return jsonify({'error': 'Input values cannot be negative'}), 400

#         result = predict(Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age)
#         return jsonify(result)

#     except Exception as e:
#         return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

# # Run the app
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8000, debug=True)


import pickle as pkl
import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for simplicity

# Load scaler and model
script_dir = os.path.dirname(os.path.abspath(__file__))
scaler_path = os.path.join(script_dir, 'scaler.pkl')
model_path = os.path.join(script_dir, 'bagging.pkl')

# Check if files exist and load them
try:
    if not os.path.exists(scaler_path):
        raise FileNotFoundError(f"Scaler file not found at {scaler_path}")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")

    with open(scaler_path, 'rb') as scaler_file:
        scaler = pkl.load(scaler_file)
    with open(model_path, 'rb') as model_file:
        model = pkl.load(model_file)
    logger.info("Scaler and model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load scaler or model: {str(e)}")
    raise  # Crash on startup if files can't load (Render will show this in logs)

# Threshold for prediction
THRESHOLD = 0.5

def predict(Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age):
    try:
        # Create input DataFrame
        input_data = pd.DataFrame(
            [[Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age]],
            columns=['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 
                     'BMI', 'DiabetesPedigreeFunction', 'Age']
        )

        # Scale input data
        input_scaled = scaler.transform(input_data)

        # Get probability prediction
        probabilities = model.predict_proba(input_scaled)[0]
        probability_positive = probabilities[1]  # Probability of class 1 (Diabetes)
        prediction = 1 if probability_positive >= THRESHOLD else 0

        debug_info = f"Probabilities: {probabilities}, Threshold: {THRESHOLD}, Prediction: {prediction}"
        logger.debug(debug_info)

        # Return result
        if prediction == 1:
            result = {
                'prediction': "You have high chances of Diabetes! Please consult a Doctor.'POSITIVE'",
                'probability': round(probability_positive, 4),
                'threshold': THRESHOLD,
                'gif_url': "https://media.giphy.com/media/3o6wrebnKWmvx4ZBio/giphy.gif",
                'debug': debug_info
            }
        else:
            result = {
                'prediction': "You have low chances of Diabetes. Please maintain a healthy lifestyle.'NEGATIVE'",
                'probability': round(probability_positive, 4),
                'threshold': THRESHOLD,
                'gif_url': "https://media.giphy.com/media/W1GG6RYUcWxoHl3jV9/giphy.gif",
                'debug': debug_info
            }
        return result

    except Exception as e:
        logger.error(f"Prediction function error: {str(e)}")
        raise

@app.route('/predict', methods=['POST'])
def predictions():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        required_fields = ['Age', 'Glucose', 'BloodPressure', 'Insulin', 'BMI', 'SkinThickness', 'DPF']
        for field in required_fields:
            if field not in data or data[field] is None:
                return jsonify({'error': f'Missing or null field: {field}'}), 400

        # Convert inputs to float and validate
        try:
            inputs = {field: float(data[field]) for field in required_fields}
            if any(x < 0 for x in inputs.values()):
                return jsonify({'error': 'Input values cannot be negative'}), 400
        except ValueError:
            return jsonify({'error': 'All inputs must be numeric'}), 400

        # Call prediction function
        result = predict(
            inputs['Glucose'], inputs['BloodPressure'], inputs['SkinThickness'],
            inputs['Insulin'], inputs['BMI'], inputs['DPF'], inputs['Age']
        )
        return jsonify(result)

    except Exception as e:
        logger.error(f"Prediction endpoint error: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

if __name__ == '__main__':
    # Use Render's PORT env var if available, else default to 8000
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)