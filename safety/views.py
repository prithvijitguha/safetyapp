"""
Views module for safety
"""

# pylint: disable=invalid-name,
# pylint: disable=consider-using-f-string,
# pylint: disable=import-error,
# pylint: disable=missing-function-docstring,
# pylint: disable=redefined-outer-name,
# pylint: disable=bare-except
# flake8: noqa: E303,E501,E722

import os
import json
import dotenv


from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.db.models import Avg
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from .models import Place


def index(request):
    user = request.user
    dotenv.read_dotenv()
    API_KEY = os.environ.get("API_KEY")
    OAUTH_KEY = os.environ.get("OAUTH_KEY")

    return render(
        request,
        "safety/index.html",
        {"user": user, "API_KEY": API_KEY, "OAUTH_KEY": OAUTH_KEY},
    )


# Check average ratings of review
def review(request, place_id):
    try:
        placesafety = round(
            float(
                Place.objects.filter(placeid=place_id).aggregate(Avg("safety"))[
                    "safety__avg"
                ]
            ),
            2,
        )
    except:
        placesafety = Place.objects.filter(placeid=place_id).aggregate(Avg("safety"))[
            "safety__avg"
        ]

    try:
        placehygiene = round(
            float(
                Place.objects.filter(placeid=place_id).aggregate(Avg("hygiene"))[
                    "hygiene__avg"
                ]
            ),
            2,
        )
    except:
        placehygiene = Place.objects.filter(placeid=place_id).aggregate(Avg("hygiene"))[
            "hygiene__avg"
        ]

    try:
        placesingle = "{:.0%}".format(
            Place.objects.filter(placeid=place_id, single="True").count()
            / Place.objects.filter(placeid=place_id).count()
        )
    except ZeroDivisionError:
        placesingle = "0%"

    try:
        placecouple = "{:.0%}".format(
            Place.objects.filter(placeid=place_id, couple="True").count()
            / Place.objects.filter(placeid=place_id).count()
        )
    except ZeroDivisionError:
        placecouple = "0%"

    try:
        placegroup = "{:.0%}".format(
            Place.objects.filter(placeid=place_id, group="True").count()
            / Place.objects.filter(placeid=place_id).count()
        )
    except ZeroDivisionError:
        placegroup = "0%"

    try:
        placelgbtq = "{:.0%}".format(
            Place.objects.filter(placeid=place_id, lgbtq="True").count()
            / Place.objects.filter(placeid=place_id).count()
        )
    except ZeroDivisionError:
        placelgbtq = "0%"

    placereview = Place.objects.filter(placeid=place_id).values_list(
        "review", flat=True
    )
    rev = []
    for place in placereview:
        rev.append(place)

    test = json.dumps(rev)
    total = Place.objects.filter(placeid=place_id).count()

    return JsonResponse(
        {
            "placesafety": placesafety,
            "placehygiene": placehygiene,
            "placesingle": placesingle,
            "placecouple": placecouple,
            "placegroup": placegroup,
            "placelgbtq": placelgbtq,
            "test": test,
            "total": total,
            "status": 200,
        }
    )


# get the review data for reviewpage
def reviewpage(request, place_id):
    if request.method == "GET":
        user = request.user
        try:
            place = Place.objects.get(user=user, placeid=place_id)

            return JsonResponse(
                {
                    "placesaf": place.safety,
                    "placehyg": place.hygiene,
                    "placesing": place.single,
                    "placecoup": place.couple,
                    "placegrp": place.group,
                    "placelgbtq": place.lgbtq,
                    "placereview": place.review,
                    "status": 200,
                }
            )
        except:
            return JsonResponse(
                {
                    "placesaf": 0,
                    "placehyg": 0,
                    "placesing": 0,
                    "placecoup": 0,
                    "placegrp": 0,
                    "placelgbtq": 0,
                    "status": 200,
                }
            )

    if request.method == "PUT":
        user = request.user
        try:
            place2 = Place.objects.get(user=user, placeid=place_id)
        except:
            place = Place()
            place.user = user
            place.placeid = place_id
            place.save()

        data = json.loads(request.body)
        if data.get is not None:
            place2 = Place.objects.get(user=user, placeid=place_id)
            place2.name = data.get("placename")
            place2.safety = data.get("safrat")
            place2.hygiene = data.get("hygrat")
            place2.single = data.get("singrat")
            place2.couple = data.get("couprat")
            place2.group = data.get("grprat")
            place2.lgbtq = data.get("lgbrat")
            place2.review = data.get("txtreview")
            place2.save()
            return JsonResponse({}, status=200)

    if request.method == "DELETE":
        data = json.loads(request.body)
        user = request.user
        review = Place.objects.get(user=user, placeid=data)
        review.delete()
        return JsonResponse({}, status=200)

    return redirect("index")


@login_required
def profile(request):
    user = request.user
    profile = Place.objects.filter(user=user).order_by("-timestamp")
    paginator = Paginator(profile, 5)
    page = request.GET.get("page", 1)
    try:
        profile = paginator.page(page)
    except PageNotAnInteger:
        profile = paginator.page(1)
    except EmptyPage:
        profile = paginator.page(paginator.num_pages)

    return render(request, "safety/profile.html", {"profile": profile})
