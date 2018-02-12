from django.conf.urls import url, include
from . import views

urlpatterns = [
    # url(r'^deta/(?P<id>\d+)/$',views.UserDetailView.as_view()),
    url(r'^detail/(?P<id>\d+)/$',views.UserDetailView.as_view()),
    ]
