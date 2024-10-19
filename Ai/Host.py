from flask import Flask, request, jsonify
import torch
import numpy as np
from Training.model import FailureWatch


# Initialize Flask app
app = Flask(__name__)
# Model parameters
num_features, num_classes, drop = 9, 1, 0.0

# Load the model
model = FailureWatch(num_features, num_classes, drop)
model.load_state_dict(torch.load("Ai/model/acc_0.93_weights.pt"))
model.eval()  # Set model to evaluation mode

# Prediction endpoint
@app.route('/predict', methods=['GET'])
def predict():
    Labels_map = ["Fail","no Fail"]
    try:
        # Extract features from query parameters
        features_str = request.args.get('features')
        if features_str is None:
            return jsonify({'error': 'No features provided'}), 400

        # Convert the features to a tensor
        features = [float(f) for f in features_str.split(',')]
     
        features_tensor = torch.tensor(features).unsqueeze(0)  # Add batch dimension

        features_tensor = features_tensor - torch.mean(features_tensor) / torch.std(features_tensor)

        # Make prediction (for now, hardcoded probability for testing)
        with torch.no_grad():
            prediction = model(features_tensor)
           
        
        if prediction > 0.5 :
            pred = Labels_map[1]
            poss = prediction
        else :
            pred = Labels_map[0]
            poss = 1 - prediction

        return jsonify({'predicted': pred, 'percentage': float(poss)})

    except Exception as e:
        print("Error during prediction:", str(e))  # Log the error
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("App started...")
    app.run(debug=True, host='0.0.0.0',port=3000)