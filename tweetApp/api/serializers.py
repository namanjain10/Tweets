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
    timesince = serializers.SerializerMethodField()
    dataCreated = serializers.SerializerMethodField()

    class Meta :
        model = Tweet
        fields = [
            'user',
            'id',
            'content',
            'timesince',
            'dataCreated',
        ]

    def get_timesince (self, obj) :
        return timesince(obj.dataCreated) + " ago"

    def get_dataCreated (self, obj) :
        return obj.dataCreated.strftime("%b %d %Y, %I:%M %p")    
