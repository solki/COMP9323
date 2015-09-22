init = ()->
  stage = new Konva.Stage
    container: 'container'
    width: window.innerWidth
    height: window.innerHeight
  $.get 'user-info-sample.json', (userData)->
    $.get 'map-sample.json', (mapData)->
      render(stage, userData, mapData)

  $(window).on 'resize orientationchange', ()->
    stage.setWidth(window.innerWidth)
    stage.setHeight(window.innerHeight)

render = (stage, userData, mapData)->
  NODE_WIDTH = 300
  TITLE_TEXT_SIZE = 32
  INFO_TEXT_SIZE = 18
  layer = new Konva.Layer()
  map_nodes = {}
  getNode = (id)->
    layer.findOne('#node-'+id)
  hideNodeTree = (rootNode)->
    for subNodeId in map_nodes[rootNode.getId()].sub_nodes
      hideNodeTree(getNode(subNodeId))
    rootNode.hide()
  toggleNode = (node)->
    if not node.isVisible()
      node.show()
    else
      hideNodeTree(node)
  buildNode = (node)->
    nodeText = new Konva.Text
      text: node.text
      fontSize: TITLE_TEXT_SIZE
      fontFamily: 'Calibri'
      fill: '#555'
      width: NODE_WIDTH
      padding: 20
      align: 'center'
    nodeUpVoteBtn = new Konva.Text
      text: "\u21e7#{node.up_vote}"
      fontSize: INFO_TEXT_SIZE
      fontFamily: 'Calibri'
      fill: '#555'
      padding: 9
    nodeDownVoteBtn = new Konva.Text
      text: "\u21e9#{node.down_vote}"
      fontSize: INFO_TEXT_SIZE
      fontFamily: 'Calibri'
      fill: '#555'
      padding: 9
      x: nodeUpVoteBtn.getWidth()
    nodeAuthorText = new Konva.Text
      text: "by #{node.author.name}"
      fontSize: INFO_TEXT_SIZE
      fontFamily: 'Calibri'
      fill: '#555'
      width: NODE_WIDTH
      padding: 9
      align: 'left'
    voteBtnGroupWidth = nodeUpVoteBtn.getWidth() + nodeDownVoteBtn.getWidth()
    nodeVoteBtnGroup = new Konva.Group
      height: Math.max(nodeUpVoteBtn.getHeight(), nodeDownVoteBtn.getHeight())
      width: voteBtnGroupWidth
      x: NODE_WIDTH - voteBtnGroupWidth
    nodeVoteBtnGroup.add(nodeUpVoteBtn)
    nodeVoteBtnGroup.add(nodeDownVoteBtn)
    infoBarHeight = Math.max(nodeVoteBtnGroup.getHeight(), nodeAuthorText.getHeight())
    nodeInfoBar = new Konva.Group
      width: NODE_WIDTH
      height: infoBarHeight
      y: nodeText.getHeight()
    nodeInfoBarRect = new Konva.Rect
      width: NODE_WIDTH - 5
      x: 2.5
      height: infoBarHeight - 2
      fill: "#bbb"
      cornerRadius: 10
    nodeInfoBar.add(nodeInfoBarRect)
    nodeInfoBar.add(nodeAuthorText)
    nodeInfoBar.add(nodeVoteBtnGroup)
    nodeRect = new Konva.Rect
      stroke: '#555'
      strokeWidth: 5
      fill: '#ddd'
      width: NODE_WIDTH
      height: nodeText.getHeight() + infoBarHeight
      shadowColor: 'black'
      shadowBlur: 10
      shadowOffset: [10, 10]
      shadowOpacity: 0.2
      cornerRadius: 10
    nodeGroup = new Konva.Group
      draggable: true
      visible: false
    nodeGroup.add(nodeRect)
    nodeGroup.add(nodeText)
    nodeGroup.add(nodeInfoBar)
    return nodeGroup
  for node in mapData.node_list
    nodeId = "node-" + node.id
    map_nodes[nodeId] = node
    nodeGroup = buildNode(node)
    nodeGroup.setId(nodeId)
    nodeGroup.on 'mousedown touchstart', ()->
      @.moveToTop()
      stage.draw()
    nodeGroup.on 'dblclick dbltap', ()->
      currentNode = map_nodes[@.getId()]
      for subNodeId in currentNode.sub_nodes
        toggleNode(getNode(subNodeId))
      stage.draw()
    layer.add(nodeGroup)
  getNode(mapData.root_node_id).show()
  stage.add(layer)

init()
