from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
import requests
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.utils import timezone
from .models import ScanHistory
import datetime
from django.utils import timezone
import requests
import hashlib
from django.utils import timezone
from django.db.models import Count
from datetime import timedelta
from django.db.models import Count, Q


import random
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

    user_type = 'free'  # Replace this with your real user type logic

    avatar_list = [
        "avatar/2.jpg",
        "avatar/3.jpg",
        "avatar/1.jpg",
        "avatar/4.jpg",
        "avatar/5.jpg",
        "avatar/6.jpg",
        "avatar/7.jpg",
    ]

    if "user_avatar" in request.session:
        user_avatar = request.session["user_avatar"]
    else:
        # Pick a random one and save in session
        user_avatar = random.choice(avatar_list)
        request.session["user_avatar"] = user_avatar

    # stats = ScanHistory.objects.aggregate(
    #     hate=Count("id", filter=Q(prediction="Hate Speech Detected")),
    #     safe=Count("id", filter=Q(prediction="No Hate Speech")),
    #     total=Count("id")
    # )

    # hate = stats["hate"]
    # safe = stats["safe"]
    # total = stats["total"]

    history = ScanHistory.objects.filter(user=request.user).order_by("-created_at")[:3]

    limit = 15
    threshold_high = 0.8
    threshold_low = 0.5
    today = timezone.now().date()

    start_date = today - timedelta(days=6)  # last 7 days

    user_stats = ScanHistory.objects.filter(user=request.user).aggregate(
        total_scans=Count("id"),
        used_today=Count("id", filter=Q(created_at__date=today)),
        risk=Count("id", filter=Q(probability__gte=threshold_high)),
        safe_prob=Count("id", filter=Q(probability__lt=threshold_high, probability__gte=threshold_low)),
        today_risk=Count("id", filter=Q(probability__gte=threshold_high, created_at__date=today)), 
        today_safe=Count("id", filter=Q(probability__lt=threshold_high, probability__gte=threshold_low, created_at__date=today)),
        feedbacks_total=Count("id", filter=Q(feedback__isnull=False)),
        feedbacks_true=Count("id", filter=Q(feedback=True)),
    )
    total= user_stats['total_scans']
    used = user_stats["used_today"]
    risk_scans = user_stats["risk"]
    safe_scans = user_stats["safe_prob"]
    today_risk = user_stats["today_risk"]
    today_safe = user_stats["today_safe"]

    feedbacks_total = user_stats["feedbacks_total"]
    feedbacks_true = user_stats["feedbacks_true"]

    remaining = max(limit - used, 0)

    percentage = int((remaining / limit) * 100) if limit > 0 else 0

    week_ago = today - timedelta(days=7)

    # Filter scans in the last 7 days
    used_weekly = ScanHistory.objects.filter(
        user=request.user,
        created_at__date__gte=week_ago,  # greater than or equal to 7 days ago
        created_at__date__lte=today       # up to today
    ).count()

    # get all scans for the last 7 days
    scans = (
        ScanHistory.objects.filter(user=request.user, created_at__date__gte=start_date)
        .values("created_at__date", "prediction")
        .annotate(total=Count("id"))
    )
    
    # initialize labels & counts
    labels = []
    hate_counts = []
    safe_counts = []
    
    # build a dict for quick lookup
    scan_dict = {}
    for row in scans:
        date_str = row["created_at__date"].strftime("%Y-%m-%d")
        if date_str not in scan_dict:
            scan_dict[date_str] = {"hate": 0, "safe": 0}
        if row["prediction"].lower() == "hate speech detected":
            scan_dict[date_str]["hate"] = row["total"]
        else:
            scan_dict[date_str]["safe"] = row["total"]
    
    # loop through each day (so missing days get "0")
    for i in range(7):
        day = start_date + timedelta(days=i)
        day_str = day.strftime("%Y-%m-%d")
        labels.append(day_str)
        hate_counts.append(scan_dict.get(day_str, {}).get("hate", 0))
        safe_counts.append(scan_dict.get(day_str, {}).get("safe", 0))
    
    risk_per = risk_scans / total * 100 if total > 0 else 0
    safe_per = safe_scans / total * 100 if total > 0 else 0
    today_risk_per = today_risk / total * 100 if total > 0 else 0
    today_safe_per = today_safe / total * 100 if total > 0 else 0
        
    
    if feedbacks_total: 
        overall_accuracy = (feedbacks_true / feedbacks_total) * 100
    else:
        overall_accuracy = 0  # No feedback yet
       
    todays_feedbacks = ScanHistory.objects.filter(
        user=request.user,
        created_at__date=today
    ).exclude(feedback__isnull=True)

    if todays_feedbacks.exists():
        todays_accuracy = (todays_feedbacks.filter(feedback=True).count() / todays_feedbacks.count()) * 100
    else:
        todays_accuracy = 0

    credits = {
        "limit": limit,
        "used": used,
        "remaining": remaining,
        "percentage": percentage,
        "weekly_used": used_weekly,
    }

    chart = {
        "chart_labels": labels,
        "chart_hate": hate_counts,
        "chart_safe": safe_counts,
    }

    scan_threshold ={
        "risk_per":round(risk_per, 1), 
        "safe_per":round(safe_per, 1), 
        "today_risk_per":round(today_risk_per, 1),
        "today_safe_per":round(today_safe_per, 1),
    }
    
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

    accuracy = {
        "overall_accuracy": round(overall_accuracy, 1),
        "todays_accuracy": round(todays_accuracy, 1),
    }

    return render(request, 'dashboard.html',{**context,"user_avatar":user_avatar,"scan_threshold":scan_threshold ,"history": history, "hate": risk_scans, "safe": safe_scans ,"total": total,"user_type": user_type,"credits": credits,"chart": chart,"accuracy": accuracy,"percentage": percentage})



def api_call_text(text):
    response = requests.post(
        "http://127.0.0.1:9000/predict/",
        json={"text": text}
    )
    return response.json()


def detect(request):

    avatar_list = [
        "avatar/2.jpg",
        "avatar/3.jpg",
        "avatar/1.jpg",
        "avatar/4.jpg",
        "avatar/5.jpg",
        "avatar/6.jpg",
        "avatar/7.jpg",
    ]

    if "user_avatar" in request.session:
        user_avatar = request.session["user_avatar"]
    else:
        # Pick a random one and save in session
        user_avatar = random.choice(avatar_list)
        request.session["user_avatar"] = user_avatar


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

            auto_feedback = result.get('probability', 0.0) >= 0.7


            scan = ScanHistory.objects.create(
                user=request.user,
                input_text=text,
                prediction=result.get('label'),
                probability=result.get('probability', 0.0),
                feedback=auto_feedback
            )


            result['scan_id'] = scan.id

    return render(request, 'free.html', {"result": result, "message": message,"user_avatar": user_avatar})



@login_required
def give_feedback(request):
    if request.method == "POST":
        scan_id = request.POST.get("scan_id")
        feedback_value = request.POST.get("feedback", "").lower()  # normalize to lowercase

        scan = get_object_or_404(ScanHistory, id=scan_id, user=request.user)
        if feedback_value == "true":
            scan.feedback = True
        elif feedback_value == "false":
            scan.feedback = False
        else:
            scan.feedback = None  # fallback if something else is sent
        scan.save()

    return redirect("detect")





# def detect_view(request):
#     if request.method == "POST":
#         text = request.POST.get("text")
#         result = new(text)
#         return render(request, 'detect.html', {"result": result})
    
#     return render(request, 'detect.html', {"result":None})



# def new2(request):
#     return render(request, 'new2.html')


