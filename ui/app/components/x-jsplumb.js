/* global jsPlumb */

import Component from '@ember/component';
import { v4 as uuid } from 'ember-uuid';
import {inject as service} from '@ember/service';


export default Component.extend({
  state: service('global-state'),
  
  // template attributes:
  //   nodes: []
  //   connections: []

  //   addConnection: () => {}, 
  //   deleteConnection: () => {},
  //   nodeClick: () => {},
  //   updateNodePosition: () => {},

  jspInstance: null,
  

  actions: {
    clickOnNode: function(nodeId){
      this.get('state').set('activeNodeId', nodeId);
    }
  },


  connEvents: {

    // called when a connection is added
    jspEventConnection: function(connInfo, originalEvent, thisComponent) {
      thisComponent.debug('STARTED jspEventConnection');
      // check if the connection was established programatically (originalEvent is undefined)
      // or by using the mouse (originalEvent is defined)
      if (originalEvent) {
        connInfo.connection.endpoints.forEach(e=>thisComponent.debug(e.anchor.type));
        // add uuid to connection object
        let connId = uuid();
        connInfo.connection.connId = connId;
        thisComponent.debug("created connection through UI:", connInfo);

        let sourceAnchorType = connInfo.connection.endpoints[0].anchor.type;
        let targetAnchorType = connInfo.connection.endpoints[1].anchor.type;
        thisComponent.addConnection(connId, connInfo.sourceId, sourceAnchorType, connInfo.targetId, targetAnchorType);
      } else {
        thisComponent.debug("created connection from model:", connInfo.connection);
      }
    },

    jspEventClickDeleteLabel: function(overlay, originalEvent, thisComponent) {
      console.log("clicked on delete overlay:", overlay);
      let conn = overlay.component;
      window.jsp.deleteConnection(conn);           // delete it from the jsplumb instance
      thisComponent.deleteConnection(conn.connId);     // call the delete function that was passed in to the component
    },
    
    jspEventClickFilterLabel: function(/*overlay, originalEvent*/) {
      // console.log("ClickFilterLabel", connInfo);
      // console.log("originalEvent", originalEvent);
    }
  },

  init: function(){
    this._super(...arguments);
    
    let arrowConnOverlay = [ "Arrow", {
        location: 1,
        visible:true,
        width:15,
        length:13,
        foldback:1.0,
        id:"ARROW",
    } ];

    let deleteLabelConnOverlay = [ "Label", {
        label: "X",
        location: 0.5,
        id: "delete_label",
        cssClass: "diagramDeleteConnLabel",
        events:{ 
          click: (overlay, originalEvent) => this.connEvents.jspEventClickDeleteLabel(overlay, originalEvent, this) 
        }
    }];

    let filterLabelConnOverlay = [ "Label", {
        label: "",
        location: 0.2,
        id: "filter_label",
        cssClass: "diagramFilterConnLabel",
        events:{ click: this.connEvents.jspEventClickFilterLabel }
    }];

    let thisComponent = this;

    jsPlumb.ready(function () {
        var instance = window.jsp = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            ConnectionOverlays: [arrowConnOverlay, deleteLabelConnOverlay], //, filterLabelConnOverlay],
            Container: "canvas"
        });
        instance.bind("connection", 
          (connInfo, originalEvent) => thisComponent.connEvents.jspEventConnection(connInfo, originalEvent, thisComponent) );
        instance.bind("connectionDetached", 
          (connInfo, originalEvent) => thisComponent.connEvents.jspEventConnectionDetached(connInfo, originalEvent, thisComponent));
        
        jsPlumb.fire("jsPlumbLoaded", instance);
        thisComponent.jspInstance = instance;
    });
  },

  // TODO this needs to run only on the initial render. 
  // currently it runs every time a node is dragged or anything else is happening
  // causes error by recreating the connections
  didRender: function(){
    console.log("STARTED onDidRender");
    console.log("STARTED: onDidRender; connections: ", this.connections.length);
    // add connections to jsp instance  (this component only gets the connections
    // that belong to the currently visible flow so there's no need to filter or check against visible nodes)
    this.connections.forEach(function(connection){
      // get('sourceId') actually returns the source node
      let sourceId = connection.get('sourceId').get('id');
      let targetId = connection.get('targetId').get('id');

      let existingConnCount = this.jspInstance.getConnections({source: sourceId, target: targetId}).length;
      //console.log( 'getConnection', this.jspInstance.getConnections({source: sourceId, target: targetId}));
      if (existingConnCount == 0){
        let srcEndpointSelection = this.jspInstance.selectEndpoints({element: sourceId});
        let sourceEndpoint = null;
        for (let i=0; i<srcEndpointSelection.length; i++){
          let endp = srcEndpointSelection.get(i);
          if (endp.anchor.type == connection.get("sourceAnchorType")) {
            // found the endpoint we need to attach the connection source to
            //this.debug("connection add: FOUND ENDPOINT");
            sourceEndpoint = endp;
          }
        }

        let tgtEndpointSelection = this.jspInstance.selectEndpoints({element: targetId});
        let targetEndpoint = null;
        for (let i=0; i<tgtEndpointSelection.length; i++){
          let endp = tgtEndpointSelection.get(i);
          if (endp.anchor.type == connection.get("targetAnchorType")) {
            // found the endpoint we need to attach the connection target to
            //this.debug("connection add: FOUND ENDPOINT");
            targetEndpoint = endp;
          }
        }

        let newConn = this.jspInstance.connect({source: sourceEndpoint, target: targetEndpoint});
        newConn.connId = connection.get('id');
      }
    }, this);

  },

  setup_old: function(){
      jsPlumb.ready(function () {
          var instance = window.jsp = jsPlumb.getInstance({
              // default drag options
              DragOptions: { cursor: 'pointer', zIndex: 2000 },
              // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
              // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
              ConnectionOverlays: [
                  [ "Arrow", {
                      location: 1,
                      visible:true,
                      width:11,
                      length:11,
                      id:"ARROW",
                      events:{
                          click:function() { alert("you clicked on the arrow overlay")}
                      }
                  } ],
                  [ "Label", {
                      location: 0.1,
                      id: "label",
                      cssClass: "aLabel",
                      events:{
                          tap:function() { alert("hey"); }
                      }
                  }]
              ],
              Container: "canvas"
          });

          var basicType = {
              connector: "StateMachine",
              paintStyle: { stroke: "red", strokeWidth: 4 },
              hoverPaintStyle: { stroke: "blue" },
              overlays: [
                  "Arrow"
              ]
          };
          var endpoint_common = {
            endpoints: ["Dot","Rectangle"],
            isSource: true,
            isTarget: true,
            // connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
            connector: [ "Bezier", { radius: 30 } ],
            maxConnections: 10,
            anchors:[ "Left", "Right" ],
            paintStyle: {
                stroke: "#7AB02C",
                fill: "transparent",
                radius: 7,
                strokeWidth: 2
            },
          };

          // instance.addEndpoint("testnode", endpoint_common);
          // instance.addEndpoint("testnode2", endpoint_common);
          // instance.addEndpoint("fabbutton", endpoint_common);
          // instance.draggable("testnode");
          // instance.draggable("testnode2");
          // instance.draggable("fabbutton");
          // instance.connect({source: "testnode", taget: "testnode2"});
          // instance.connect({
          //   source:"testnode2",
          //   target:"fabbutton",
          //   anchors:["Bottom", "Left" ],
          //   endpoint:"Rectangle",
          //   endpointStyle:{ fill: "yellow" }
          // });

          instance.addEndpoint("77", endpoint_common, {anchor: "LeftMiddle"});
          instance.addEndpoint("77", endpoint_common, {anchor: "RightMiddle"});
          instance.addEndpoint("88", endpoint_common);
          instance.addEndpoint("99", endpoint_common);
          instance.draggable(instance.selectEndpoints([".diagramNode"]), { grid: [20, 20] });
          // instance.draggable("99");
          // instance.draggable("88");
          // instance.draggable("77");



          // instance.addEndpoint(["77", "88", "99"], endpoint_common);
          //instance.addEndpoint("99", endpoint_common);
          //instance.draggable("99");

          //instance.draggable(".diagramNode", {containment: "parent"});


          instance.registerConnectionType("basic", basicType);











          //
          // // this is the paint style for the connecting lines..
          // var connectorPaintStyle = {
          //         strokeWidth: 2,
          //         stroke: "#61B7CF",
          //         joinstyle: "round",
          //         outlineStroke: "white",
          //         outlineWidth: 2
          //     },
          // // .. and this is the hover style.
          //     connectorHoverStyle = {
          //         strokeWidth: 3,
          //         stroke: "#216477",
          //         outlineWidth: 5,
          //         outlineStroke: "white"
          //     },
          //     endpointHoverStyle = {
          //         fill: "#216477",
          //         stroke: "#216477"
          //     },
          // // the definition of source endpoints (the small blue ones)
          //     sourceEndpoint = {
          //         endpoint: "Dot",
          //         paintStyle: {
          //             stroke: "#7AB02C",
          //             fill: "transparent",
          //             radius: 7,
          //             strokeWidth: 1
          //         },
          //         isSource: true,
          //         connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
          //         connectorStyle: connectorPaintStyle,
          //         hoverPaintStyle: endpointHoverStyle,
          //         connectorHoverStyle: connectorHoverStyle,
          //         dragOptions: {},
          //         overlays: [
          //             [ "Label", {
          //                 location: [0.5, 1.5],
          //                 label: "Drag",
          //                 cssClass: "endpointSourceLabel",
          //                 visible:false
          //             } ]
          //         ]
          //     },
          // // the definition of target endpoints (will appear when the user drags a connection)
          //     targetEndpoint = {
          //         endpoint: "Dot",
          //         paintStyle: { fill: "#7AB02C", radius: 7 },
          //         hoverPaintStyle: endpointHoverStyle,
          //         maxConnections: -1,
          //         dropOptions: { hoverClass: "hover", activeClass: "active" },
          //         isTarget: true,
          //         overlays: [
          //             [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
          //         ]
          //     },
          //     init = function (connection) {
          //         connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
          //     };
          //
          // var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
          //     for (var i = 0; i < sourceAnchors.length; i++) {
          //         var sourceUUID = toId + sourceAnchors[i];
          //         instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
          //             anchor: sourceAnchors[i], uuid: sourceUUID
          //         });
          //     }
          //     for (var j = 0; j < targetAnchors.length; j++) {
          //         var targetUUID = toId + targetAnchors[j];
          //         instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
          //     }
          // };
          //
          // // suspend drawing and initialise.
          // instance.batch(function () {
          //
          //     _addEndpoints("Window4", ["TopCenter", "BottomCenter"], ["LeftMiddle", "RightMiddle"]);
          //     _addEndpoints("Window2", ["LeftMiddle", "BottomCenter"], ["TopCenter", "RightMiddle"]);
          //     _addEndpoints("Window3", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
          //     _addEndpoints("Window1", ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);
          //
          //     // listen for new connections; initialise them the same way we initialise the connections at startup.
          //     instance.bind("connection", function (connInfo, originalEvent) {
          //         init(connInfo.connection);
          //     });
          //
          //     // make all the window divs draggable
          //     instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });
          //     // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
          //     // method, or document.querySelectorAll:
          //     //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });
          //
          //     // connect a few up
          //     instance.connect({uuids: ["Window2BottomCenter", "Window3TopCenter"], editable: true});
          //     instance.connect({uuids: ["Window2LeftMiddle", "Window4LeftMiddle"], editable: true});
          //     instance.connect({uuids: ["Window4TopCenter", "Window4RightMiddle"], editable: true});
          //     instance.connect({uuids: ["Window3RightMiddle", "Window2RightMiddle"], editable: true});
          //     instance.connect({uuids: ["Window4BottomCenter", "Window1TopCenter"], editable: true});
          //     instance.connect({uuids: ["Window3BottomCenter", "Window1BottomCenter"], editable: true});
          //     //
          //
          //     //
          //     // listen for clicks on connections, and offer to delete connections on click.
          //     //
          //     instance.bind("click", function (conn, originalEvent) {
          //        // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
          //          //   instance.detach(conn);
          //         conn.toggleType("basic");
          //     });
          //
          //     instance.bind("connectionDrag", function (connection) {
          //         console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
          //     });
          //
          //     instance.bind("connectionDragStop", function (connection) {
          //         console.log("connection " + connection.id + " was dragged");
          //     });
          //
          //     instance.bind("connectionMoved", function (params) {
          //         console.log("connection " + params.connection.id + " was moved");
          //     });
          // });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
          this.jspInstance = instance;

      });
    },//.on('didInsertElement')
});
