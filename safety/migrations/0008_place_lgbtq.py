# Generated by Django 3.1.5 on 2021-02-26 06:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("safety", "0007_auto_20210211_1650"),
    ]

    operations = [
        migrations.AddField(
            model_name="place",
            name="lgbtq",
            field=models.CharField(blank=True, max_length=5, null=True),
        ),
    ]
