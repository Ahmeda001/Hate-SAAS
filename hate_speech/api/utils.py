# api/utils.py
from .models import lstm

def predict_text(text):
    """
    Predict using LSTM text model.
    """
    # Directly use LSTM's predict_text function
    result = lstm.predict_text(text)
    return result

