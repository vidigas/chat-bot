
filePathShape = draw2d.shape.note.PostIt.extend({

	NAME: "filePathShape",
	
    init : function(attr)
    {
    	this._super({text: "input"});
        var output= this.createPort("output");
        output.setName("output_"+this.id);
        this.addPort(output);
    },
    getPersistentAttributes : function()
    {
        var memento= this._super();
        memento.Portname = this.getPorts().data[0].name
        return memento;
    },
    setPersistentAttributes : function(memento)
    {
        this._super(memento);
        this.getPorts().data[0].name = memento.Portname;
       
        return this;
    },
});

outputShape = draw2d.shape.note.PostIt.extend({

	NAME: "outputShape",
	
    init : function(attr)
    {
    	this._super({text: "output"});
        var output= this.createPort("input");
        output.setName("input_"+this.id);
        this.addPort(output);
    },
    getPersistentAttributes : function()
    {
        var memento= this._super();
        memento.Portname = this.getPorts().data[0].name
        return memento;
    },
    setPersistentAttributes : function(memento)
    {
        this._super(memento);
        this.getPorts().data[0].name = memento.Portname;
       
        return this;
    },
});

scriptShape = draw2d.shape.note.PostIt.extend({

	NAME: "scriptShape",
	
    init : function(attr)
    {
    	this._super({
            text:"script",
            fontFamily:"Curier New",
            fontSize:12,
            bgColor:"#f0f0f0",
      });
        var output= this.createPort("output");
        output.setName("output_"+this.id);
        this.addPort(output);
    },
    getPersistentAttributes : function()
    {
        var memento= this._super();
        memento.Portname = this.getPorts().data[0].name
        memento.userData = this.userData;
        return memento;
    },
    setPersistentAttributes : function(memento)
    {
        this._super(memento);
        this.getPorts().data[0].name = memento.Portname;
        this.userData = memento.userData;
        return this;
    },
});

commentShape =draw2d.shape.basic.Text.extend({

    NAME: "commentShape",
	
    init : function(attr)
    {
    	this._super({
            text:"Inserir comentário",
            fontFamily:"Curier New",
            fontSize:12,
            bgColor:"#ffee93",
      });
    }
});