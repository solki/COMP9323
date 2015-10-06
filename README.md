# ExpertMind (formerly COMP

[![Join the chat at https://gitter.im/solki/COMP9323](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/solki/COMP9323?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
project of comp9323

*I love md!*
*Hey, guys. Seems no way to modify the name of this project. Why not create a new one?*

# ExpertMind REST Service ("the service" in the following contents) Deployment, Startup and Usage
Before deploy and use ExpertMind REST Service codes on your computer, please make sure that you have Python 2.7 and PIP installed. Use [SetupTools](https://pypi.python.org/pypi/setuptools) to setup and manage package index of python is highly recommended here.
- 1. Deployment
  - Pull from branch *expertmind_services_hansmong* to your computer
  - Use PIP to install Django framework
      *pip install Django &#35; see https://docs.djangoproject.com/en/1.8/topics/install/#installing-official-release*
  - Use PIP to install Django REST framework support
      *pip install djangorestframework*
      *pip install markdown*
      *pip install django-filter &#35; see http://www.django-rest-framework.org/#installation*
- 2. Startup
  - Go into the root folder of *the service* in a Terminal or &#42;nix shell environment
  - In the Terminal or &#42;nix shell environment, type the following command:
      *python manage.py runserver
  - In a browser, type *http://localhost:8000/expertmind_services/* to test if the services have been started up successfully.
- 3. Usage
  - a. Node operation
    - Create a new node by the following
    *POST /expertmind_service/create_new_node/*
      with the JSON body like
      {
        "nodeDisplay": "This is a test Node name",
        "nodeDescription": "This is a test Node description"
      }
    - Add a child node to an existed node
    *POST /expertmind_service/add_child_node/*
      with the JSON body like
      {
        "nodeDisplay": "this is a test child node name",
        "nodeDescription": "this is a test child node description",
        "nodeParents"0: [
          {"_id": "someParentId"}
        ]
      }
    *Note: in current version of the services, only one parent for each node will be taken into consideration. That means if you pass a JSON body with multiple nodeParents, the services will take the first parent as the parent of the child node to be added.*
    - (working on the GET ones...)
