import views

from django.conf.urls import url


urlpatterns = [
    url(r'^hello$', views.hello, name='hello'),
    url(r'^one_param/(?P<behavior>[0-9a-zA-Z\_]+)$', views.one_param, name='one_param'),
    url(r'^two_params/(?P<the_id>[0-9]+)/(?P<behavior>[0-9a-zA-Z\_]+)$', views.two_params, name='two_params'),
    url(r'^three_params/(?P<id_1>[0-9]+)/(?P<id_2>[0-9]+)/(?P<behavior>[0-9a-zA-Z\_]+)$', views.three_params, name='three_params'),
    url(r'^four_params/(?P<id_1>[0-9]+)/(?P<id_2>[0-9]+)/(?P<id_3>[0-9]+)/(?P<behavior>[0-9a-zA-Z\_]+)$', views.four_params, name='four_params'),

]
