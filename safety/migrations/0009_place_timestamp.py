# Generated by Django 3.1.5 on 2021-02-27 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("safety", "0008_place_lgbtq"),
    ]

    operations = [
        migrations.AddField(
            model_name="place",
            name="timestamp",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
