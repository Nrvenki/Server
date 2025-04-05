# import pickle
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.naive_bayes import GaussianNB
# from sklearn.preprocessing import StandardScaler

# # Load dataset
# df = pd.read_csv("diabetes.csv")  # Ensure your dataset is available

# # Define features and labels
# X = df.drop(columns=["Outcome"])  # Assuming 'Outcome' is the target column
# y = df["Outcome"]

# # Split data
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Scale features
# scaler = StandardScaler()
# X_train_scaled = scaler.fit_transform(X_train)
# X_test_scaled = scaler.transform(X_test)

# # Train model
# model = GaussianNB()
# model.fit(X_train_scaled, y_train)  # Make sure model is trained before saving

# # Save the scaler
# with open("scaler.pkl", "wb") as f:
#     pickle.dump(scaler, f)

# # Save the trained model
# with open("nb.pkl", "wb") as f:
#     pickle.dump(model, f)

# print("Model and scaler saved successfully!")

import pickle
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import BaggingClassifier, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
from imblearn.over_sampling import SMOTE

# Load dataset
df = pd.read_csv("diabetes.csv")  

# Debugging: Check column names
print("Columns in diabetes.csv:", df.columns.tolist())

# Remove 'Pregnancies' if it exists
if "Pregnancies" in df.columns:
    df = df.drop(columns=["Pregnancies"])
    print("Dropped 'Pregnancies' column.")

# Define features and labels
X = df.drop(columns=["Outcome"])
y = df["Outcome"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Handle class imbalance using SMOTE
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train_scaled, y_train)

# Train Bagging model
bagging_model = BaggingClassifier(random_state=42)
bagging_model.fit(X_train_resampled, y_train_resampled)

# Reduce GridSearch complexity
param_grid = {
    'n_estimators': [50, 100],   # Reduced choices
    'learning_rate': [0.01, 0.1], # Reduced choices
    'max_depth': [3, 4]           # Reduced choices
}

# Use a smaller dataset for GridSearch to avoid long processing times
X_sample, _, y_sample, _ = train_test_split(X_train_resampled, y_train_resampled, test_size=0.9, random_state=42)

grid_search = GridSearchCV(GradientBoostingClassifier(random_state=42), param_grid, cv=3, n_jobs=2)
grid_search.fit(X_sample, y_sample)
boosting_model = grid_search.best_estimator_

# Feature Importance
feature_importances = boosting_model.feature_importances_
feature_names = X.columns
sorted_idx = np.argsort(feature_importances)[::-1]

print("\nFeature Importance Ranking:")
for idx in sorted_idx:
    print(f"{feature_names[idx]}: {feature_importances[idx]:.4f}")

# Model Evaluation
y_pred = boosting_model.predict(X_test_scaled)
print("\nGradient Boosting Model Performance:")
print(classification_report(y_test, y_pred))

# Save the scaler
with open("scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

# Save the models
with open("bagging.pkl", "wb") as f:
    pickle.dump(bagging_model, f)

with open("boosting.pkl", "wb") as f:
    pickle.dump(boosting_model, f)

print("Optimized Bagging & Boosting models saved successfully!")
