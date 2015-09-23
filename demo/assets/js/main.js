// Generated by CoffeeScript 1.10.0
(function() {
  var init, render;

  init = function() {
    var stage;
    stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight
    });
    $.get('user-info-sample.json', function(userData) {
      return $.get('map-sample.json', function(mapData) {
        return render(stage, userData, mapData);
      });
    });
    return $(window).on('resize orientationchange', function() {
      stage.setWidth(window.innerWidth);
      return stage.setHeight(window.innerHeight);
    });
  };

  render = function(stage, userData, mapData) {
    var INFO_TEXT_SIZE, NODE_WIDTH, TITLE_TEXT_SIZE, active_node, buildNode, getNode, hideNodeTree, i, layer, len, map_nodes, node, nodeGroup, nodeId, ref, toggleNode;
    NODE_WIDTH = 300;
    TITLE_TEXT_SIZE = 32;
    INFO_TEXT_SIZE = 18;
    layer = new Konva.Layer();
    map_nodes = {};
    active_node = null;
    getNode = function(id) {
      return layer.findOne('#node-' + id);
    };
    hideNodeTree = function(rootNode) {
      var i, len, ref, subNodeId;
      ref = map_nodes[rootNode.getId()].sub_nodes;
      for (i = 0, len = ref.length; i < len; i++) {
        subNodeId = ref[i];
        hideNodeTree(getNode(subNodeId));
      }
      return rootNode.hide();
    };
    toggleNode = function(node) {
      if (!node.isVisible()) {
        return node.show();
      } else {
        return hideNodeTree(node);
      }
    };
    buildNode = function(node) {
      var infoBarHeight, nodeAuthorText, nodeDownVoteBtn, nodeGroup, nodeInfoBar, nodeInfoBarRect, nodeRect, nodeText, nodeUpVoteBtn, nodeVoteBtnGroup, voteBtnGroupWidth;
      nodeText = new Konva.Text({
        text: node.text,
        fontSize: TITLE_TEXT_SIZE,
        fontFamily: 'Calibri',
        fill: '#555',
        width: NODE_WIDTH,
        padding: 20,
        align: 'center'
      });
      nodeUpVoteBtn = new Konva.Text({
        text: "\u21e7" + node.up_vote,
        fontSize: INFO_TEXT_SIZE,
        fontFamily: 'Calibri',
        fill: '#555',
        padding: 9
      });
      nodeDownVoteBtn = new Konva.Text({
        text: "\u21e9" + node.down_vote,
        fontSize: INFO_TEXT_SIZE,
        fontFamily: 'Calibri',
        fill: '#555',
        padding: 9,
        x: nodeUpVoteBtn.getWidth()
      });
      nodeAuthorText = new Konva.Text({
        text: "by " + node.author.name,
        fontSize: INFO_TEXT_SIZE,
        fontFamily: 'Calibri',
        fill: '#555',
        width: NODE_WIDTH,
        padding: 9,
        align: 'left'
      });
      voteBtnGroupWidth = nodeUpVoteBtn.getWidth() + nodeDownVoteBtn.getWidth();
      nodeVoteBtnGroup = new Konva.Group({
        height: Math.max(nodeUpVoteBtn.getHeight(), nodeDownVoteBtn.getHeight()),
        width: voteBtnGroupWidth,
        x: NODE_WIDTH - voteBtnGroupWidth
      });
      nodeVoteBtnGroup.add(nodeUpVoteBtn);
      nodeVoteBtnGroup.add(nodeDownVoteBtn);
      infoBarHeight = Math.max(nodeVoteBtnGroup.getHeight(), nodeAuthorText.getHeight());
      nodeInfoBar = new Konva.Group({
        width: NODE_WIDTH,
        height: infoBarHeight,
        y: nodeText.getHeight()
      });
      nodeInfoBarRect = new Konva.Rect({
        width: NODE_WIDTH - 5,
        x: 2.5,
        height: infoBarHeight - 2,
        fill: "#bbb",
        cornerRadius: 10
      });
      nodeInfoBar.add(nodeInfoBarRect);
      nodeInfoBar.add(nodeAuthorText);
      nodeInfoBar.add(nodeVoteBtnGroup);
      nodeRect = new Konva.Rect({
        name: "node-bg",
        stroke: '#555',
        strokeWidth: 5,
        fill: '#ddd',
        width: NODE_WIDTH,
        height: nodeText.getHeight() + infoBarHeight,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: [10, 10],
        shadowOpacity: 0.2,
        cornerRadius: 10
      });
      nodeGroup = new Konva.Group({
        draggable: true,
        visible: false
      });
      nodeGroup.add(nodeRect);
      nodeGroup.add(nodeText);
      nodeGroup.add(nodeInfoBar);
      return nodeGroup;
    };
    ref = mapData.node_list;
    for (i = 0, len = ref.length; i < len; i++) {
      node = ref[i];
      nodeId = "node-" + node.id;
      map_nodes[nodeId] = node;
      nodeGroup = buildNode(node);
      nodeGroup.setId(nodeId);
      nodeGroup.on('mousedown touchstart', function() {
        this.moveToTop();
        if (active_node === null || active_node !== this) {
          this.findOne('.node-bg').stroke('#375A7F');
        }
        if (active_node !== null && active_node !== this) {
          active_node.findOne('.node-bg').stroke('#555');
        }
        active_node = this;
        return stage.draw();
      });
      nodeGroup.on('dblclick dbltap', function() {
        var currentNode, j, len1, ref1, subNodeId;
        currentNode = map_nodes[this.getId()];
        ref1 = currentNode.sub_nodes;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          subNodeId = ref1[j];
          toggleNode(getNode(subNodeId));
        }
        return stage.draw();
      });
      layer.add(nodeGroup);
    }
    getNode(mapData.root_node_id).show();
    return stage.add(layer);
  };

  init();

}).call(this);

//# sourceMappingURL=main.js.map
