var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};

function init() {
	// init data
	var json = {
		"id" : "190_0",
		"name" : "What makes a good Programmer?",
		"data" : {
			"$nodeDescription" : "Here we investigate what are the essential properties that a good Programmer must have.?",
			"$nodeStatus" : "1",
			"$nodeCreateAt" : "19:00 21/9/15",
			"$nodeVotes" : [],
			"$author" : {
				"userid" : 1,
				"username" : "Admin"
			},
			"$nodeTags" : [ {
				"_id" : "7"
			}, {
				"_id" : "21"
			}, {
				"_id" : "158"
			}, ],
			"$up_vote" : 120,
			"$down_vote" : 15,
		},
		"children" : [
				{
					"id" : "Node2",
					"name" : "Good at Programming",
					"data" : {
						"$nodeDescription" : "I think programming is the most important skill that a programmer must have.",
						"$nodeStatus" : "1",
						"$nodeCreateAt" : "19:00 21/9/15",
						"$nodeVotes" : [],
						"$author" : {
							"userid" : 1,
							"username" : "Admin"
						},
						"$nodeTags" : [ {
							"_id" : "7"
						}, {
							"_id" : "21"
						}, {
							"_id" : "158"
						}, ],
						"$up_vote" : 150,
						"$down_vote" : 0,
					},
					"children" : [
							{
								"id" : "Node5",
								"name" : "Good at Fundamental Programming Languages",
								"data" : {
									"$nodeDescription" : "Fundamental programming languages like C, C++, and Java are very basic but versatile languages, each good programmer should be able to use at least one of these languages.",
									"$nodeStatus" : "1",
									"$nodeCreateAt" : "19:00 21/9/15",
									"$nodeVotes" : [],
									"$author" : {
										"userid" : 4,
										"username" : "Andrew"
									},
									"$nodeTags" : [ {
										"_id" : "7"
									}, {
										"_id" : "21"
									}, {
										"_id" : "158"
									}, ],
									"$up_vote" : 190,
									"$down_vote" : 12,
								},
								"children" : [],
							},
							{
								"id" : "Node6",
								"name" : "Be familiar with Scripting Languages",
								"data" : {
									"$nodeDescription" : "Scripting languages like Python, Shell, Perl etc. are powerful tools and essential in complex enterprise systems, a good programmer should be familiar with at least one of them",
									"$nodeStatus" : "1",
									"$nodeCreateAt" : "19:00 21/9/15",
									"$nodeVotes" : [],
									"$author" : {
										"userid" : 2,
										"username" : "Mark"
									},
									"$nodeTags" : [ {
										"_id" : "7"
									}, {
										"_id" : "21"
									}, {
										"_id" : "158"
									}, ],
									"$up_vote" : 120,
									"$down_vote" : 15,
								},
								"children" : [],
							} ],
				},
				{
					"id" : "Node3",
					"name" : "Good at Learning new Stuff",
					"data" : {
						"$nodeDescription" : "Technology is changing so fast, as a good programmer, he or she must be an efficient learner.",
						"$nodeStatus" : "1",
						"$nodeCreateAt" : "20:00 21/9/15",
						"$nodeVotes" : [],
						"$author" : {
							"userid" : 1,
							"username" : "Admin"
						},
						"$nodeTags" : [ {
							"_id" : "7"
						}, {
							"_id" : "21"
						}, {
							"_id" : "158"
						}, ],
						"$up_vote": 120,
					    "$down_vote": 15,
					},
					"children" : [ {
						"id" : "Node7",
						"name" : "Good at Reading Documentations and Source Code",
						"data" : {
							"$nodeDescription" : "To master a new technology, the fastest and safe way is to read the official documentation and source code if available, a good programmer should be good at this",
							"$nodeStatus" : "1",
							"$nodeCreateAt" : "20:00 21/9/15",
							"$nodeVotes" : [],
							"$author" : {
								"userid" : 3,
								"username" : "Lancelot"
							},
							"$nodeTags" : [ {
								"_id" : "7"
							}, {
								"_id" : "21"
							}, {
								"_id" : "158"
							}, ],
							"$up_vote": 170,
						     "$down_vote": 32,
						},
						"children" : [],
					} ],

				},
				{
					"id" : "Node4",
					"name" : "Good at Cooperation & Teamwork",
					"data" : {
						"$nodeDescription" : "No single programmer can make a really big software system, teamwork is also essential for each programmer in a good team.",
						"$nodeStatus" : "1",
						"$nodeCreateAt" : "20:00 21/9/15",
						"$nodeVotes" : [],
						"$author" : {
							"userid" : 1,
							"username" : "Admin"
						},
						"$nodeTags" : [ {
							"_id" : "7"
						}, {
							"_id" : "21"
						}, {
							"_id" : "158"
						}, ],
						"$up_vote": 120,
					    "$down_vote": 15,
					},
					
					"children" : [],
				} ],
	};
    //init RGraph
	var rgraph = new $jit.RGraph({
		'injectInto' : 'infovis',
		// Optional: Create a background canvas
		// for painting concentric circles.
		'background' : {
			'CanvasStyles' : {
				'strokeStyle' : '#555',
				'shadowBlur' : 50,
				'shadowColor' : '#ccc'
			}
		},
		// Set Edge and Node colors.
		Node : {
			dim : 10,
			color : '#ddeeff',
			overridable : true
		},

		Edge : {
			overridable : true,
			color : '#C17878',
			lineWidth : 1.5
		},
		//Add tooltips
        Tips: {
          enable: true,
          type: 'Native',
          onShow: function(tip, node) {
            var html = "<div class=\"tip-title\">" + node.name+"<br/>"; 
              html += "<b>Description:</b> " + node.data.$nodeDescription+"<br/>"; 
              html += "<b>Author:</b> " + node.data.$author.username+"<br/>";
              html += "<b>Up vote:</b> " + node.data.$up_vote+"<br/>"; 
              html += "<b>Down vote:</b> " + node.data.$down_vote +"</div>";
            tip.innerHTML = html;
          }
        },

		Events : {
			enable : true,
			onClick : function(node, eventInfo, e) {
				var parentId = document.getElementById('parentId');
				var nodeName = document.getElementById('nodeName');
				if (node.id) {
					parentId.value = node.id;
					nodeName.value = node.name;
				}
			},
		},

		// Add the node's name into the label
		// This method is called only once, on label creation.
		onCreateLabel : function(domElement, node) {
			domElement.innerHTML = node.name;
		},

		// Change the node's style based on its position.
		// This method is called each time a label is rendered/positioned
		// during an animation.
		onPlaceLabel : function(domElement, node) {
			var style = domElement.style;
			style.display = '';
			style.cursor = 'pointer';

			if (node._depth <= 1) {
				style.fontSize = "0.8em";
				style.color = "#ccc";

			} else if (node._depth == 2 || node._depth == 3) {
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
	// load JSON data.
	rgraph.loadJSON(json);

	// Compute positions and plot
	rgraph.refresh();

	// Add a Graph (Sum)
	button = $jit.id('sum');
	button.onclick = function() {
		// get graph to add.
		var nodeId = document.getElementById('nodeId');
		var nodeDisplay = document.getElementById('nodeDisplay');
		var nodeTags = document.getElementById('nodeTags');
		var nodeDescription = document.getElementById('nodeDescription');
		var parentId = document.getElementById('parentId');
		var username = "NewUser";
		var userid = 10;
		var graph = '[{id:"' + parentId.value + '", adjacencies:["'
				+ nodeId.value + '"]}, {id:"' + nodeId.value + '", name:"'
				+ nodeDisplay.value + '",data:{"$nodeTags":"'+nodeTags.value+'","$nodeDescription":"'+nodeDescription.value+'","$up_vote":0,"$down_vote":0,"$author":{"userid":'+userid+',"username":"'+username+'"}}}]';
		
		var trueGraph = eval('(' + graph + ')');
		rgraph.op.sum(trueGraph, {
			type : 'fade:seq',
			fps: 30,
            duration: 1000,
            hideLabels: true,
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
	//Vote
    button = $jit.id('vote');
    button.onclick = function() {
        //get animation type.
    	var nodeId = document.getElementById("parentId").value;
        var stype = $jit.id('vote_type');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        if (type == "Up vote") {

        }else if(type == "Down vote"){
        	
        }
    };
}
