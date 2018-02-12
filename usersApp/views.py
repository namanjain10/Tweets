from django.shortcuts import render
from django.views.generic import DetailView, ListView, CreateView, DeleteView, UpdateView
from tweetApp.models import Tweet
from .models import Followers

class UserDetailView(DetailView):
    template_name = 'usersApp/user_detail_view.html'
    def get_object(self, **kwargs) :
        return Tweet.objects.filter(user_id = self.kwargs['id'])
# Create your views here.
