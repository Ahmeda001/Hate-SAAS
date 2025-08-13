from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

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

def new(request):
    return render(request, 'new.html')


# def pricing(request):    
#     return render(request, 'pricing.html')


# def about(request):    
#     return render(request, 'about.html')from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

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

def new(request):
    return render(request, 'new.html')


# def pricing(request):    
#     return render(request, 'pricing.html')


# def about(request):    
#     return render(request, 'about.html')