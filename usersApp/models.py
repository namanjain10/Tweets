from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings

class Followers(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='profile')
    following = models.ManyToManyField(settings.AUTH_USER_MODEL, blank= True, related_name='followed_by')

    def __str__(self) :
        return self.user + str(self.following.all().count())
