__author__ = 'YUN'

from db_connect import ConnectDB
import json


class Vote(object):
    def __init__(self, vote_type, description, vote_user, vote_at, vote_on_node):
        self.type = vote_type
        self.description = description
        self.voteUser = vote_user
        self.voteAt = vote_at
        self.voteOnNode = vote_on_node

    # Create a vote record to db
    # Return True if insert vote record success, else False
    def create(self):
        client = ConnectDB().connect()
        response = client.post('votes', {
            "type": self.type,
            "description": self.description,
            "voteUser": self.voteUser,
            "voteAt": self.voteAt,
            "voteOnNode": self.voteOnNode
        })
        status = response.status_code
        if status == 201:
            return True
        else:
            return False

    # Retrieve vote by vote key
    # Return vote object if find, else return None
    @staticmethod
    def retrieveById(vote_key):
        client = ConnectDB().connect()
        response = client.get('votes', vote_key)
        status = response.status_code
        if status == 200:
            vote = Vote(response['type'], response['description'], response['voteUser'], response['voteAt'],
                        response['voteOnNode'])
            return vote
        else:
            return None

    # Retrieve all vote
    # Return a list of vote object
    @staticmethod
    def retrieveAll():
        client = ConnectDB().connect()
        vote_list =[]
        vote_list_response = client.list('votes').all()
        for vote_res in vote_list_response:
            value = vote_res['value']
            vote = Vote(value['type'], value['description'], value['voteUser'], value['voteAt'], value['voteOnNode'])
            vote_list.append(vote)
        return vote_list
        # return vote_list_response

    # Update a specific vote with vote key and a vote object
    # Return True if update record success, else False
    @staticmethod
    def update(vote_key, vote):
        client = ConnectDB().connect()
        response = client.put('votes', vote_key, {
            "type": vote.type,
            "description": vote.description,
            "voteUser": vote.voteUser,
            "voteAt": vote.voteAt,
            "voteOnNode": vote.voteOnNode
        })
        status = response.status_code
        if status == 201:
            return True
        else:
            return False

    # Retrieve votes for a specific node key and vote type
    # Return the vote number
    @staticmethod
    def retrieve_numb_vote_by_node_id(node_key, vote_type):
        client = ConnectDB().connect()
        vote_list = client.search('votes', 'voteOnNode:'+node_key + ' AND type:'+vote_type).all()
        return len(vote_list)
    
