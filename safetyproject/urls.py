"""
Register your main project URLS here
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("safety.urls")),
    path("accounts/", include("allauth.urls")),
]
