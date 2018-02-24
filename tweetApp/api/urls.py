from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^list/$', views.TweetList.as_view()),
    url(r'^create/$', views.TweetCreate.as_view()),
    url(r'^detail/', views.TweetDetail.as_view()),
]
