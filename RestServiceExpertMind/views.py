from django.http.response import HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt
import data_checker
from ExpertMind.nodes import Nodes


# Create your views here.
class JSONResponse(HttpResponse):
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


@csrf_exempt
# POST /expertmind_service/create_new_node/
# Accept application/json and the following keys:
#   nodeDisplay
#   nodeDescription
def create_new_node(request):
    if request.method == 'POST':
        print request
        try:
            data = JSONParser().parse(request)
            data_checker.check_create_new_node(data)
        except Exception, e:
            error = dict(success="false", data={}, error_message=str(e))
            return JSONResponse(error)
        node = Nodes().create(data["nodeDisplay"], data["nodeDescription"], data["nodeTags"], data["nodeParents"],
                              data["nodeChildren"], data["nodeVotes"], data["nodeStatus"])
        create_node_response = {
            "success": "true",
            "data": node
        }
        return JSONResponse(create_node_response)
    else:  # only allow POST
        error = dict(success="false", data={}, error_message="Only POST allowed for node creation.")
        return JSONResponse(error)


@csrf_exempt
# POST /expertmind_service/add_child_node/
# Accept application/json and the following keys:
#   nodeDisplay
#   nodeDescription
#   nodeParents [ {"_id" : "..." } ]
def add_child_node(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            data_checker.check_add_child_node(data)

            node_tags = data["nodeTags"]
            if 'nodeTags' not in data:
                node_tags = []  # not required

            node_children = []
            node_votes = []
            node_status = 1
            created_node = Nodes().create(data["nodeDisplay"], data["nodeDescription"], node_tags, data["nodeParents"],
                                          node_children, node_votes, node_status)

            add_new_child_response = {
                "success": "true",
                "data": created_node
            }
            return JSONResponse(add_new_child_response)
        except Exception, e:
            error = dict(success="false", data={}, error_message=str(e))
            return JSONResponse(error)
    else:  # only allow POST
        error = dict(success="false", data={}, error_message="Only POST allowed for adding a child node.")
        return JSONResponse(error)


@csrf_exempt
# GET /expertmind_service/get_node_by_id/[node_id]
def get_node_by_id(request, node_id):
    if request.method == 'GET':
        try:
            if node_id == '':
                error = dict(success="false", data={}, error_message="No ID was given when getting node by ID.")
                return JSONResponse(error)

            node_got = Nodes().retrieveById(node_id)
            if 'code' in node_got and node_got['code'] == 'items_not_found': # not found in database
                no_node_response = {
                    "success": "true",
                    "data": "No node found with _id = %s" % node_id
                }
                return JSONResponse(no_node_response)

            get_node_by_id_response = {
                "success": "true",
                "data": node_got
            }
            return JSONResponse(get_node_by_id_response)
        except Exception, e:
            error = dict(success="false", data={}, error_message=str(e))
            return JSONResponse(error)
    else:  # only allow GET
        error = dict(success="false", data={}, error_message="Only GET allowed for getting a node by ID.")
        return JSONResponse(error)


@csrf_exempt
# GET /expertmind_service/get_descendant_nodes/[node_id]
def get_descendant_nodes(request, node_id):
    if request.method == 'GET':
        try:
            if node_id == '':
                error = dict(success="false", data={}, error_message="No ID was given when getting descendant nodes of"
                                                                     "a node by its ID.")
                return JSONResponse(error)

            descendant_nodes_list = Nodes().retrieveDescendent(node_id)
            get_descendant_nodes_response = {
                "success": "true",
                "data": descendant_nodes_list
            }
            return JSONResponse(get_descendant_nodes_response)
        except Exception, e:
            error = dict(success="false", data={}, error_message=str(e))
            return JSONResponse(error)
    else:  # only allow GET
        error = dict(success="false", data={}, error_message="Only GET allowed for getting descendant nodes of"
                                                             "a node by its ID.")
        return JSONResponse(error)


@csrf_exempt
# GET /expertmind_service/get_child_nodes/[node_id]
def get_child_nodes(request, node_id):
    if request.method == 'GET':
        try:
            if node_id == '':
                error = dict(success="false", data={}, error_message="No ID was given when getting children nodes of"
                                                                     "a node by its ID.")
                return JSONResponse(error)

            children_nodes_list = Nodes().retrieveChild(node_id)
            get_children_nodes_response = {
                "success": "true",
                "data": children_nodes_list
            }
            return JSONResponse(get_children_nodes_response)
        except Exception, e:
            error = dict(success="false", data={}, error_message=str(e))
            return JSONResponse(error)
    else:  # only allow GET
        error = dict(success="false", data={}, error_message="Only GET allowed for getting children nodes of"
                                                             "a node by its ID.")
        return JSONResponse(error)


@csrf_exempt
# GET /expertmind_service/get_mindmap/
def get_mindmap(request):
    if request.method == 'GET':
        print "hello world"
    else:  # only allow GET
        error = dict(success="false", data={}, error_message="Only GET allowed for getting the mindmap.")
        return JSONResponse(error)