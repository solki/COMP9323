__author__ = 'YUN'

from db_connect import ConnectDB
import json


class User(object):
    user_json = {}

    def __init__(self, user_name, login_token, email, intro, register_at):
        self.username = user_name
        self.loginToken = login_token
        self.email = email
        self.intro = intro
        self.registerAt = register_at

    # Translate user object to json
    def to_json(self):
        self.user_json = json.dumps(self, default=lambda o: o.__dict__)

    # def create_user(self):
    #     self.to_json()
    #     response = self.client.post('users', self.user_json)
    #     response = self.client.post(object.m)
    #     print response

    # Create a user record to db
    # Return True if insert record success, else return False
    def create_user(self):
        client = ConnectDB().connect()
        response = client.post('users', {
            "username": self.username,
            "loginToken": self.loginToken,
            "email": self.email,
            "intro": self.intro,
            "registerAt": self.registerAt
        })
        status = response.status_code
        if status == 201:
            return True
        else:
            return False
            # response.raise_for_status()

    # Retrieve a specific user by user key
    # Return a user object if find, else return None
    @staticmethod
    def retrieve_user_by_id(user_key):
        client = ConnectDB().connect()
        response = client.get('users', user_key)
        # user_json = response.json
        status = response.status_code
        if status == 200:
            user = User(response['username'], response['loginToken'], response['email'], response['intro'],
                        response['registerAt'])
            return user
        else:
            return None

    # Retrieve all users
    # Return a list of users
    @staticmethod
    def retrieve_all_users():
        client = ConnectDB().connect()
        user_list = []
        user_list_response = client.list('users').all()
        for user_res in user_list_response:
            value = user_res['value']
            user = User(value['username'], value['loginToken'], value['email'], value['intro'], value['registerAt'])
            user_list.append(user)
        # print len(user_list)
        return user_list

    # Update a specific user with user key and a user object
    # Return True if update record success, else False
    @staticmethod
    def update_user(user_key, user):
        client = ConnectDB().connect()
        response = client.put('users', user_key, {
            "username": user.username,
            "loginToken": user.loginToken,
            "email": user.email,
            "intro": user.intro,
            "registerAt": user.registerAt
        })
        status = response.status_code
        if status == 201:
            return True
        else:
            return False

    # delete_user a specific user with key
    @staticmethod
    def delete_user(user_key):
        client = ConnectDB().connect()
        response = client.delete('users', user_key)
        response.raise_for_status()
