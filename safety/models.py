from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    pass


class Place(models.Model):
    name = models.CharField(max_length=140)
    placeid = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    safety = models.IntegerField(blank=True, null=True)
    hygiene = models.IntegerField(blank=True, null=True)
    single = models.CharField(max_length=5, blank=True, null=True)
    couple = models.CharField(max_length=5, blank=True, null=True)
    group = models.CharField(max_length=5, blank=True, null=True)
    lgbtq = models.CharField(max_length=5, blank=True, null=True)
    review = models.TextField(max_length=140, blank=True, null=True)
    timestamp = models.DateTimeField(default=timezone.now)
