from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"), 
    path("review/<str:place_id>", views.review, name="review"),
    path("reviewpage/<str:place_id>", views.reviewpage, name="reviewpage"),
    path("profile", views.profile, name="profile")
]