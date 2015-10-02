__author__ = 'hansmong'

from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^create_new_node/$', views.create_new_node, name='create_new_node'),
    url(r'^add_child_node/$', views.add_child_node, name='add_child_node'),
    url(r'^get_node_by_id/(?P<node_id>.+)/$', views.get_node_by_id, name='get_node_by_id'),
    url(r'^get_descendant_nodes/(?P<node_id>.+)$', views.get_descendant_nodes, name='get_descendant_nodes'),
    url(r'^get_child_nodes/(?P<node_id>.+$)', views.get_child_nodes, name='get_child_nodes'),
    url(r'^get_mindmap/$', views.get_mindmap, name='get_mindmap'),
]