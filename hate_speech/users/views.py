from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
# from django.shortcuts import get_object_or_404
# from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.contrib import messages

# Create your views here.
# def signup(request):
#     return render(request, 'signup.html')



# def login(request):
#     return render(request, 'login.html')



# def logout(request):
#     return render(request, 'logout.html')

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid credentials.')
    return render(request, 'login.html')



def user_logout(request):
    logout(request)
    return redirect('home')



def user_signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password1']
        confirm = request.POST['password2']
        if password == confirm:
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username taken.')
            else:
                User.objects.create_user(username=username, email=email, password=password)
                return redirect('login')
        else:
            messages.error(request, 'Passwords do not match.')
    return render(request, 'signup.html')


# def user_register(request):
#     if request.method =="POST":
#         form = UserRegistrationForm(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)
#             user.set_password(form.cleaned_data['password1'])
#             user.save()
#             login(request, user)
#             return redirect('tweet_list') 
#     else:
#         form = UserRegistrationForm()
        
    
#     return render(request, 'registration/register.html', {'form': form})