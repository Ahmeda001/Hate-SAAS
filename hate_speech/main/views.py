from django.http import HttpResponse
from django.shortcuts import render
import random
from django.shortcuts import redirect
from django.urls import reverse


def home(request):    
    return render(request, 'home.html')






def pricing(request):

    user_type = "non"  # Default user type

    if request.user.is_authenticated:
        # If user is authenticated, check session for user type
        if "user_type" in request.session:
            user_type = request.session["user_type"]
        else:
            user_type = "free"
            request.session["user_type"] = user_type
            


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

    context = {
        "user_type": user_type
    }

    return render(request, 'pricing.html',{"user_avatar": user_avatar, **context})


def about(request):   

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

    return render(request, 'about.html',{"user_avatar": user_avatar})
