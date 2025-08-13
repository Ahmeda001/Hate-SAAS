import numpy as np
import os
import re
import string
import emoji
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model

# Load the trained model
# Get the directory of the current script (models folder)
current_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the full path to model.keras
model_path = os.path.join(current_dir, 'model.keras')
model = load_model(model_path)


# Load the tokenizer
current_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the full path to tokenizer.pkl
tokenizer_path = os.path.join(current_dir, 'tokenizer.pkl')

# Load the tokenizer
with open(tokenizer_path, 'rb') as f:
    tokenizer = pickle.load(f)

# Preprocessing functions
def clean_text(text):
    text = text.lower()
    text = re.sub(r'http\S+|www\S+|https\S+|http\s+', '', text)
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r'\(.*?\)', '', text)
    text = re.sub(r'\w*\d\w*', '', text)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n', ' ', text)
    text = re.sub(r'\"+', '', text)
    text = re.sub(r'“|”', '', text)
    text = re.sub(r'’', '', text)
    text = re.sub(r'&amp;', '', text)
    text = re.sub(r'@[^\s]+', '', text)
    text = re.sub(r'#[^\s]+', '', text)
    text = re.sub(r'\brt\b', '', text)
    text = re.sub(r'[%s]' % re.escape(string.punctuation), '', text)

    # Replacing common abbreviations
    replace_dict = {
        r'\bthx\b': 'thanks',
        r'\bpls\b': 'please',
        r'\bplz\b': 'please',
        r'\bbtw\b': 'by the way',
        r'\bomg\b': 'oh my god',
        r'\bidk\b': 'i dont know',
        r'\bstfu\b': 'shut the fuck up',
        r'\blmao+\b': 'laughing my ass off',
        r'\bidc\b': 'i dont care',
        r'\bwtf\b': 'what the fuck',
        r'\baf\b': 'as fuck',
        r'\blol\b': 'laugh out loud',
        r'\bgtfo\b': 'get the fuck out',
        r'\bnvm\b': 'never mind',
        r'\brip\b': 'rest in peace'
    }
    for pattern, repl in replace_dict.items():
        text = re.sub(pattern, repl, text)
    return text

def clean_demojized_text(text):
    return emoji.demojize(text).replace(":", " ").strip()

def preprocess_text(text, max_len=75):
    cleaned = clean_text(text)
    cleaned = clean_demojized_text(cleaned)
    sequence = tokenizer.texts_to_sequences([cleaned])
    padded = pad_sequences(sequence, maxlen=max_len)
    return padded

# Prediction function
def predict_text(text):
    input_vector = preprocess_text(text)
    prediction = model.predict(input_vector)[0]

    # If binary classification
    label = "Hate Speech Detected" if prediction >= 0.5 else "No Hate Speech"

    return {
        'prediction': label,
        'probability': float(prediction)
    }
