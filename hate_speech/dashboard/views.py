from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
import requests
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.utils import timezone
from .models import ScanHistory
import datetime
import requests

# @login_required
# def dashboard(request):
#     context = {
#         'user_name': request.user.username if request.user.is_authenticated else 'Guest',
#         'user_analyses_this_month': 24,
#         'total': 86,
#         'hate': 19,
#         'safe': 67,
#     }
#     return render(request, 'newwww.html', context)


@login_required
def dashboard(request):

    today = timezone.now().date()
    limit = 15

    used = ScanHistory.objects.filter(
        user=request.user,
        created_at__date=today  # counts only today’s scans
    ).count()

    remaining = max(limit - used, 0)

    percentage = int((remaining / limit) * 100) if limit > 0 else 0

    credits = {
        "limit": limit,
        "used": used,
        "remaining": remaining,
        "percentage": percentage,
    }

     

    user_type = 'free'  # Replace this with your real user type logic
    context = {
        'metrics': {
            'overall_accuracy': 91.7,
            'total_analyses': 1247,
            'false_positives': 3.2,
            'active_users': 3
        },
        'user_metrics': [
            {'name': 'User 1', 'initial': 'U1', 'color': 'blue', 'color_from': 'blue-400', 'color_to': 'blue-600', 'analyses_count': 200, 'accuracy': 92.5, 'precision': 90.0, 'recall': 91.0, 'f1_score': 90.5},
            {'name': 'User 2', 'initial': 'U2', 'color': 'green', 'color_from': 'green-400', 'color_to': 'green-600', 'analyses_count': 150, 'accuracy': 89.0, 'precision': 88.0, 'recall': 90.0, 'f1_score': 89.0},
        ]
    }

    # credits  = {
    #     "count": count,
    #     "per_count": per_count,
    # }

    hate = ScanHistory.objects.filter(prediction="Hate Speech Detected").count()
    safe = ScanHistory.objects.filter(prediction="No Hate Speech").count()
    total = ScanHistory.objects.count()
    history = ScanHistory.objects.filter(user=request.user).order_by("-created_at")[:3]

    return render(request, 'dashboard.html',{**context, "history": history, "hate": hate, "safe": safe, "total": total,"user_type": user_type,"credits": credits})


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

            ScanHistory.objects.create(
                user=request.user,
                input_text=text,
                prediction=result.get('label'),
                probability=result.get('probability', 0.0)
            )

    return render(request, 'free.html', {"result": result, "message": message})





# def detect_view(request):
#     if request.method == "POST":
#         text = request.POST.get("text")
#         result = new(text)
#         return render(request, 'detect.html', {"result": result})
    
#     return render(request, 'detect.html', {"result":None})



# def new2(request):
#     return render(request, 'new2.html')


