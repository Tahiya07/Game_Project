from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import RaceResult

# @login_required
def game_page(request):
    return render(request, 'gameapp/game.html')

# @login_required
def submit_score(request):
    if request.method == 'POST':
        score = int(request.POST.get('score'))
        RaceResult.objects.create(user=request.user, score=score)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'failed'}, status=400)
