from django.db import models
from django.conf import settings

# Create your models here.
# dashboard/models.py

class ScanHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    input_text = models.TextField(blank=True, null=True)
    prediction = models.CharField(max_length=50)
    probability = models.FloatField()
    feedback = models.BooleanField(null=True, blank=True)  
    created_at = models.DateTimeField(auto_now_add=True)
    

    class Meta:
        ordering = ['-created_at']
