from django.shortcuts import render
from django.views.generic import DetailView, ListView, CreateView, DeleteView, UpdateView
from django.views import View
from .models import Tweet
from django.contrib.auth import get_user_model
from .forms import TweetForm
from .mixins import FormLoginMixin, UserOwnerMixin
from django.contrib.auth.mixins import LoginRequiredMixin

class index (View) :
    def get (self, request) :
        return render(request, 'tweetApp/index.html')

class TweetDetailView(DetailView):
    def get_object(self, **kwargs) :
        return Tweet.objects.get(id = self.kwargs['id'])

class TweetListView(LoginRequiredMixin, ListView):
    User = get_user_model()
    model = Tweet
    login_url = '/admin/login/'
    def get_context_data(self, *args, **kwargs) :
        context = super(TweetListView, self).get_context_data(*args, **kwargs)
        context['create_form'] = TweetForm()
        context['action_url'] = '/list'
        return context

class TweetCreateView(FormLoginMixin, CreateView):
    form_class = TweetForm
    template_name = 'tweetApp/tweet_create.html'
    success_url = '/list/'

class TweetUpdateView(LoginRequiredMixin, UserOwnerMixin, UpdateView):
    model = Tweet
    form_class = TweetForm
    template_name = 'tweetApp/tweet_update.html'
    success_url = '/list/'
    login_url = '/admin/login/'

# how to make delete only for user of that tweet
class TweetDeleteView (LoginRequiredMixin, DeleteView):
    model = Tweet
    form_class = TweetForm
    success_url = '/list/'
    template_name = 'tweetApp/tweet_delete.html'
    login_url = '/admin/login/'
