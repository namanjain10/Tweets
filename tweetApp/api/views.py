from tweetApp.models import Tweet
from .serializers import TweetSerializer
from rest_framework import generics, pagination

class page (pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000

class TweetList(generics.ListAPIView):
    serializer_class = TweetSerializer
    pagination_class = page
    def get_queryset(self) :
        return Tweet.objects.all().order_by('-dataCreated')

class TweetCreate(generics.CreateAPIView):
    serializer_class = TweetSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
