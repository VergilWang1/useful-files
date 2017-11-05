# -*- coding: utf-8 -*-
from . import views
from django.conf.urls import include, url

urlpatterns = [
        url(r'^$',views.startindex,name='start'),
        #url(r'^views/(?P<htmlfile>.*)',views.statictemplates,name='statictemplates'),
        url(r'^add/',views.add, name='addproject'),
]