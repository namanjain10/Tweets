# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-02-12 11:01
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usersApp', '0004_auto_20180211_1349'),
    ]

    operations = [
        migrations.AlterField(
            model_name='followers',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL),
        ),
    ]