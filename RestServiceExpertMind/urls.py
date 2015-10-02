__author__ = 'hansmong'

from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^add_child_node/$', views.add_child_node, name='add_child_node'),
    url(r'^get_node_by_id/?P<node_id>.+/$', views.get_node_by_id, name='get_node_by_id'),
]