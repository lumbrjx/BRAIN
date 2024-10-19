import requests

# API URL
url = "https://a730-41-99-25-112.ngrok-free.app/predict"

# Sample features to test (make sure they match your model's input size)
features = "0,7,7,1,6,6,36,3,1"

response = requests.get(url, params={'features': features})

# Print the response
if response.status_code == 200:
    print("Prediction:", response.json())
else:
    print("Error:", response.json())