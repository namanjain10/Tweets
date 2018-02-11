from rest_framework import serializers
from tweetApp.models import Tweet
from django.contrib.auth import get_user_model
from django.utils.timesince import timesince

class UserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = get_user_model()
        fields = [
            'id',
            'username',
        ]

class TweetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta :
        model = Tweet
        fields = [
            'user',
            'id',
            'content',
            'dataCreated',
            'dataUpdated',
        ]