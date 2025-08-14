from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
import requests
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.utils import timezone
import datetime
import requests

# # Create your views here.
# def dashboard(request):    
#     return render(request, 'dashboard.html')


@login_required
def dashboard(request):
    context = {
        'user': request.user,
        'metrics': {
            'overall_accuracy': 91.7,
            'total_analyses': 1247,
            'false_positives': 3.2,
            'active_users': 3,
        },
        'user_metrics': [
            {'name': 'User A', 'initial': 'A', 'color': 'blue', 'color_from': 'blue-500', 'color_to': 'purple-600', 'accuracy': 95.2, 'analyses_count': 150, 'precision': 96.1, 'recall': 94.2},
            {'name': 'User B', 'initial': 'B', 'color': 'green', 'color_from': 'green-500', 'color_to': 'teal-600', 'accuracy': 88.7, 'analyses_count': 120, 'precision': 87.3, 'recall': 89.9},
            {'name': 'User C', 'initial': 'C', 'color': 'orange', 'color_from': 'orange-500', 'color_to': 'red-600', 'accuracy': 92.4, 'analyses_count': 180, 'precision': 91.8, 'recall': 93.1},
        ],
        'overview': {'total': 245, 'hate': 37, 'safe': 208},
        'recent_analyses': [
            {'text': 'You are an idiot', 'label': 'Hate', 'confidence': 85},
            {'text': 'Nice weather today', 'label': 'Safe', 'confidence': 92},
        ],
    }
    return render(request, 'dashboard.html', context)


def api_call_text(text):
    response = requests.post(
        "http://127.0.0.1:9000/predict/",
        json={"text": text}
    )
    return response.json()


def detect(request):
    result = None
    message = None

    # Only limit searches for anonymous users
    if not request.user.is_authenticated:
        today = timezone.now().date()
        last_used = request.session.get('last_used')
        count = request.session.get('search_count', 0)

        # Reset count if it's a new day
        if last_used != str(today):
            count = 0
            request.session['search_count'] = 0
            request.session['last_used'] = str(today)

        if request.method == "POST":
            if count < 5:
                text = request.POST.get("text")
                result = api_call_text(text)
                result['probability_percent'] = result['probability'] * 100

                count += 1
                request.session['search_count'] = count
                request.session['last_used'] = str(today)

                remaining = 5 - count
                if remaining > 0:
                    message = f"You have {remaining} free searches left today."
                else:
                    message = "You have reached 5 free searches for today. Please log in or sign up to continue."
            else:
                message = "You have reached 5 free searches for today. Please log in or sign up to continue."

    else:
        # Logged-in users: no free limit
        if request.method == "POST":
            text = request.POST.get("text")
            result = api_call_text(text)
            result['probability_percent'] = result['probability'] * 100

    return render(request, 'free.html', {"result": result, "message": message})





# def detect_view(request):
#     if request.method == "POST":
#         text = request.POST.get("text")
#         result = new(text)
#         return render(request, 'detect.html', {"result": result})
    
#     return render(request, 'detect.html', {"result":None})



# def new2(request):
#     return render(request, 'new2.html')


