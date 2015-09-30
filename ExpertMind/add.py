__author__ = 'YUN'

from db_connect import ConnectDB
import json


class Add(object):
    def __init__(self, node, add_at):
        self.node = node
        self.addAt = add_at

    def create(self):
        client = ConnectDB().connect()
        response = client.post('users', {
            "node": self.node,
            "addAt": self.addAt
        })