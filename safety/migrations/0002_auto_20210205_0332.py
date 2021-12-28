# Generated by Django 3.1.4 on 2021-02-04 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("safety", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="place",
            name="hygiene",
            field=models.IntegerField(
                blank=True,
                choices=[("1", "1"), ("2", "2"), ("3", "3"), ("4", "4"), ("5", "5")],
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="place",
            name="safety",
            field=models.IntegerField(
                blank=True,
                choices=[("1", "1"), ("2", "2"), ("3", "3"), ("4", "4"), ("5", "5")],
                null=True,
            ),
        ),
    ]
