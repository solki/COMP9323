from porc import Client

__author__ = 'Solki'


class ConnectDB:
    def __init__(self):
        self.USR_KEY = "26c829ff-8b90-4914-a031-e4219f6d3718"

    def connect(self):
        client = Client(self.USR_KEY)
        client.ping().raise_for_status()
        return client
