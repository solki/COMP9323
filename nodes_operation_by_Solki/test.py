#!/usr/bin/python

from nodes import Nodes

"""
ndparents = '0cd470785320d6fc'
ndchildren = []
ndvotes = [{'_id': '118', 'type': '1'}, {'_id': '140', 'type': '-1'}, {'_id': '45', 'type': '1'}]
ndtags = ['23', '21']
count = 0
for ndvote in ndvotes:
    count += int(ndvote['type'])

input = {
    'nodeDisplay': 'TestNode4',
    'nodeDescription': 'Third node for Nodes Class',
    'nodeTags': ndtags,
    'nodeParents': ndparents,
    'nodeChildren': ndchildren,
    'nodeVotes': ndvotes,
    'nodeStatus': count
}
"""
client = Nodes()
# client.create(**input)

# node = client.retrieveById('0cd16aed4e20f18b')
# for ent in node:
#    print ent, ': ', node[ent]
'''
list = client.retrieveAll()
for node in list:
    for ent in node:
        print ent, ': ', node[ent]
    print
'''
'''
update_input = {
    '_id': '0cd16aed4e20f18b',
    'nodeDisplay': 'TestNode3_modified',
    'nodeDescription': 'Test for Nodes Class',
    'nodeTags': ndtags,
    'nodeParents': ndparents,
    'nodeChildren': ndchildren,
    'nodeVotes': ndvotes,
    'nodeStatus': count,
    'nodeCreateAt': node['nodeCreateAt']
}
client.update(**update_input)
'''
# nodeDisply is another attribute which can uniquely identify a node
# children = client.retrieveChild('0cd39ce2bd2095cb')
# print children
# client.delete('0cd16aed4e20f18b')
#_list = client.retrieveDescendent('0cd3cb4b9920f201')
# print _list
user_id = '4'
node_id = '0cd3cb4b9920f201'
node = client.downvoteNode(node_id, user_id)
print node
