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
  NODE_WIDTH = 200
  TITLE_TEXT_SIZE = 18
  INFO_TEXT_SIZE = 12
  layer = new Konva.Layer()
  map_nodes = {} # map from nodeId to node data object
  active_node = null

  getNode = (id)->
    layer.findOne('#node-'+id)

  hideNodeTree = (rootNode)->
    subNodes = map_nodes[rootNode.getId()].sub_nodes
    for subNodeId in subNodes
      hideNodeTree(getNode(subNodeId))
    if subNodes.length > 0
      for bg in rootNode.find('.node-collapsed-bg')
        bg.show()
    rootNode.hide()
    layer.findOne(".to-#{rootNode.getId()}").hide()

  toggleNode = (node) ->
    nodeObj = map_nodes[node.getId()]
    collapsed = false
    for subNodeId in nodeObj.sub_nodes
      subNode = getNode(subNodeId)
      if not subNode.isVisible()
        subNode.show()
        layer.findOne(".to-#{subNode.getId()}").show()
      else
        collapsed = true
        hideNodeTree(subNode)
    if nodeObj.sub_nodes.length > 0
      for bg in node.find('.node-collapsed-bg')
        if collapsed
          bg.show()
        else
          bg.hide()

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
      name: "node-bg"
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
      width: nodeRect.width()
      height: nodeRect.height()
      draggable: true
      visible: false
    if node.sub_nodes.length > 0
      nodeRect2 = new Konva.Rect
        x: 10
        y: 10
        name: "node-bg node-collapsed-bg"
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
      nodeRect3 = new Konva.Rect
        x: 20
        y: 20
        name: "node-bg node-collapsed-bg"
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
      nodeGroup.add(nodeRect3)
      nodeGroup.add(nodeRect2)
    nodeGroup.add(nodeRect)
    nodeGroup.add(nodeText)
    nodeGroup.add(nodeInfoBar)
    return nodeGroup

  layoutLevel = (level, angleStart, parentNodes)->
    spaceCount = 0
    if parentNodes.length > 1
      spaceCount = parentNodes.length
    spaceStart = 0
    for parentNode, ind in parentNodes
      subNodeCount = map_nodes[parentNode.getId()].sub_nodes.length
      spaceCount += subNodeCount
      if ind == 0 and subNodeCount > 0
          spaceStart = -(subNodeCount - 1) / 2.0
    angleStep = 2 * Math.PI / spaceCount
    angle = angleStart + spaceStart * angleStep
    base_offset_x = (stage.getWidth() - NODE_WIDTH) / 2
    childNodes = []
    first_angle = 0
    for parentNode in parentNodes
      for subNodeId in map_nodes[parentNode.getId()].sub_nodes
        subNode = getNode(subNodeId)
        subNode.setPosition
          x: base_offset_x + Math.cos(angle) * NODE_WIDTH * level * 1.2
          y: (stage.getHeight() - subNode.getHeight()) / 2 + Math.sin(angle) * NODE_WIDTH * level * 0.8
        childNodes.push(subNode)
        if childNodes.length == 1
          first_angle = angle
        angle += angleStep
      angle += angleStep
    if childNodes.length > 0
      layoutLevel(level+1, first_angle, childNodes)

  layout = (rootNode)->
    rootNode.show()
    rootNode.setPosition
      x: (stage.getWidth() - NODE_WIDTH) / 2
      y: (stage.getHeight() - rootNode.getHeight()) / 2
    layoutLevel(1, - Math.PI / 2, [rootNode])

  computeLinkPoints = (startNode, endNode)->
    x1 = startNode.x()
    y1 = startNode.y()
    w1 = startNode.width()
    h1 = startNode.height()
    x2 = endNode.x()
    y2 = endNode.y()
    w2 = endNode.width()
    h2 = endNode.height()
    if x1 > x2 + w2 # sub node at left side
      return [
        x1, y1 + h1 / 2,
        x2 + w2, y2 + h2 / 2
      ]
    if x1 + w1 < x2 # sub node at right side
      return [
        x1 + w1, y1 + h1 / 2,
        x2, y2 + h2 / 2
      ]
    if y1 > y2 + h2 # sub node at top side
      return [
        x1 + w1 / 2, y1,
        x2 + w2 / 2, y2 + h2
      ]
    if y1 + h1 < y2 # sub node at bottom side
      return [
        x1 + w1 / 2, y1 + h1,
        x2 + w2 / 2, y2
      ]
    return []

  buildLinks = (parentNode)->
    for subNodeId in map_nodes[parentNode.getId()].sub_nodes
      subNode = getNode(subNodeId)
      points = computeLinkPoints(parentNode, subNode)
      link = new Konva.Arrow
        name: "from-#{parentNode.getId()} to-#{subNode.getId()}"
        points: points
        pointerLength: 12
        pointerWidth : 12
        fill: 'black'
        stroke: 'black'
        strokeWidth: 4
        visible: false
      layer.add(link)
      buildLinks(subNode)

  for node in mapData.node_list
    nodeId = "node-" + node.id
    map_nodes[nodeId] = node
    nodeGroup = buildNode(node)
    nodeGroup.setId(nodeId)
    nodeGroup.on 'mousedown touchstart', ()->
      @.moveToTop()
      if active_node == null or active_node != @
        for bg in @.find('.node-bg')
          bg.stroke('#375A7F')
      if active_node != null and active_node != @
        for bg in active_node.find('.node-bg')
          bg.stroke('#555')
      active_node = @
      stage.draw()
    nodeGroup.on 'dragmove', ()->
      links = []
      for link in layer.find(".from-#{@.getId()}")
        links.push(link)
      for link in layer.find(".to-#{@.getId()}")
        links.push(link)
      for link in links
        startPoint = null
        endPoint = null
        for name in link.name().split(' ')
          if name.indexOf('from-') == 0
            startPoint = layer.findOne("#"+name.substr(5))
          else if name.indexOf('to-') == 0
            endPoint = layer.findOne("#"+name.substr(3))
        if startPoint != null and endPoint != null
          link.points(computeLinkPoints(startPoint, endPoint))
    nodeGroup.on 'dblclick dbltap', ()->
      toggleNode(@)
      stage.draw()
    layer.add(nodeGroup)
  rootNode = getNode(mapData.root_node_id)
  layout(rootNode)
  buildLinks(rootNode)
  stage.add(layer)

init()
