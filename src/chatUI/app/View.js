

example.View = draw2d.Canvas.extend({
	
	init:function(id)
    {
		this._super(id, 50000,50000);
		
		this.setScrollArea("#"+id);
	},

    
    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop : function(droppedDomNode, x, y, shiftKey, ctrlKey)
    {


        var type = $(droppedDomNode).data("shape");
        var figure;
        if(type=='TableShape'){
        var figure = eval("new "+type+"();");
        figure.addEntity("inputObj");
        figure.addEntity("interpreter");
        figure.addEntity("case");
        figure.addEntity("case2");
        figure.addEntity("err");
        figure.addEntity("default");
        figure.setName("RouterName");
        } else if(type=='scriptShape'){
            figure =  eval("new "+type+"();");
        } else if(type=='filePathShape'){
            figure =  eval("new "+type+"();");
        } else if(type=='outputShape'){
            figure =  eval("new "+type+"();");
        }else if(type=='ModuleShape'){
            var figure = eval("new "+type+"();");
            figure.addEntity("inputObj");
            figure.addEntity("action");
            figure.addEntity("vocab");
            figure.addEntity("err");
            figure.addEntity("default");
            figure.setName("ModuleName");
        }else if(type=='commentShape'){
            var figure = eval("new "+type+"();");
        } else if(type=='SpreaderShape'){
            var figure = eval("new "+type+"();");
            figure.addEntity("inputObj");
            figure.addEntity("out1");
            figure.addEntity("out2");
        }
        
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        this.getCommandStack().execute(command);
    }
});


var DblClickCanvasPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    init : function()
    {
        this._super();
    },

    /**
     * @method
     * Called by the canvas if the user double click on a figure.
     *
     * @param {draw2d.Figure} the figure under the double click event. Can be null
     * @param {Number} mouseX the x coordinate of the mouse during the click event
     * @param {Number} mouseY the y coordinate of the mouse during the click event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     */
    onDoubleClick: function(figure, mouseX, mouseY, shiftKey, ctrlKey)
    {
        console.log($(figure).data("shape"));
        if(figure!==null) {
            // do the rotation Either by Command with undo/redo support
            console.log(figure);
            if(figure.cssClass=="scriptShape"){
                var script = prompt("Please enter script label", figure.text);
                figure.setText(script);
                script = prompt("Please enter your script text", figure.userData);
                figure.setUserData(script);
        }
        if(figure.cssClass=="filePathShape" || "outputShape" || 'commentShape'){
            //no futuro colocar um prompt aqui
            var script = prompt("Please enter item", figure.text);
            figure.setText(script);
    }
        if(figure.cssClass=="draw2d_Connection"){
            alert('feature not implemented');
        }
    }
    }
});
