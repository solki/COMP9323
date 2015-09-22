var labelType, useGradients, nativeTextSupport, animate;

(function() {
	var ua = navigator.userAgent, iStuff = ua.match(/iPhone/i)
			|| ua.match(/iPad/i), typeOfCanvas = typeof HTMLCanvasElement, nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'), textSupport = nativeCanvasSupport
			&& (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
	//I'm setting this based on the fact that ExCanvas provides text support for IE
	//and that as of today iPhone/iPad current text support is lame
	labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native'
			: 'HTML';
	nativeTextSupport = labelType == 'Native';
	useGradients = nativeCanvasSupport;
	animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
	elem : false,
	write : function(text) {
		if (!this.elem)
			this.elem = document.getElementById('log');
		this.elem.innerHTML = text;
		this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
	}
};

function init() {
	//init data    
	var json = {
		"id" : "Node1",
		"name" : "Node1",
		"nodeChildren" : [ {
			"id" : "306208_1",
			"name" : "Node2",
			"nodeTags" : "Java",
			"nodeChildren" : []
		} ],
		"nodeTags" : "Security"
	};

	//init RGraph
	var rgraph = new $jit.RGraph({
		'injectInto' : 'infovis',
		//Optional: Create a background canvas
		//for painting concentric circles.
		'background' : {
			'CanvasStyles' : {
				'strokeStyle' : '#555',
				'shadowBlur' : 50,
				'shadowColor' : '#ccc'
			}
		},
		//Set Edge and Node colors.
		Node : {
			color : '#ddeeff',
			overridable : true
		},

		Edge : {
			overridable : true,
			color : '#C17878',
			lineWidth : 1.5
		},

		Events : {
			enable : true,
			onClick : function(node, eventInfo, e) {
				var parentId = document.getElementById('parentId');
				if(node.id) {
					parentId.value = node.id;
				}
			},
		},

		fps : 30,
		duration : 1000,
		hideLabels : true,

		//Add the node's name into the label
		//This method is called only once, on label creation.
		onCreateLabel : function(domElement, node) {
			domElement.innerHTML = node.name;
		},

		//Change the node's style based on its position.
		//This method is called each time a label is rendered/positioned
		//during an animation.
		onPlaceLabel : function(domElement, node) {
			var style = domElement.style;
			style.display = '';
			style.cursor = 'pointer';

			if (node._depth <= 1) {
				style.fontSize = "0.8em";
				style.color = "#ccc";

			} else if (node._depth == 2) {
				style.fontSize = "0.7em";
				style.color = "#494949";

			} else {
				style.display = 'none';
			}

			var left = parseInt(style.left);
			var w = domElement.offsetWidth;
			style.left = (left - w / 2) + 'px';
		}
	});
	//load JSON data.
	rgraph.loadJSON(json);

	//Compute positions and plot
	rgraph.refresh();

	//Add a Graph (Sum)
	button = $jit.id('sum');
	button.onclick = function() {
		//get graph to add.
		var nodeId = document.getElementById('nodeId');
		var nodeDisplay = document.getElementById('nodeDisplay');
		var nodeTags = document.getElementById('nodeTags');
		var nodeDescription = document.getElementById('nodeDescription');
		var parentId = document.getElementById('parentId');
		var graph = '[{id:"'+parentId.value+'", adjacencies:["'+nodeId.value+'"]}, {id:"'+nodeId.value+'", name:"'+nodeDisplay.value+'", nodeTags:"'+nodeTags.value+'", adjacencies:["'+parentId.value+'"]}]';
		
		var trueGraph = eval('(' + graph + ')');
		rgraph.op.sum(trueGraph, {
			type : 'fade:seq',
			onComplete : function() {
				Log.write("sum complete!");
				nodeId.value = null;
				nodeDisplay.value = null;
				nodeTags.value = null;
				nodeDescription.value = null;
				parentId.value = null;
			}
		});
	};
}
