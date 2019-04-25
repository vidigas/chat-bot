import {mapHasDuplicateName,getContentFromInput,hasAttr,lastItem} from './ctlib';
import {CreateUUID} from './ctlib';
import {parsePorts,portMap,portMapEntities} from './ctlib';
import {TextInput} from './textInput';
import {Output} from './output';
import {Script} from './script';
import {Router} from './router';
import {Module} from './module';
import {Vocab} from './vocab';
import {Interpreter} from './interpret';

export class ChatTree{
  constructor(obj){
    this.name = obj? obj.name || 'myChatTree':'myChatTree';
    this.id = obj ? obj.id || CreateUUID():CreateUUID();
    this.logstack = obj ? obj.logstack || [] : []; //log all actions da chatTree
    this.init = obj ? obj.init || 'not built':'not built' ;
    this.find = obj ? obj.find || new Map():new Map ();
    this.objects = obj ? obj.objects || new Map():new Map();
    this.vocabulary = obj ? obj.vocabulary || new Vocab():new Vocab();
    this.runcount = 0;
    this.ready = false;
}
    About(){
        console.log('This is the ChatTree Object. It hold all the logic built for the chat tree  \n It has preparing methods, constructing with a json object from the chat tree UI . \n  after being constructed, it may add other objects with the AddObject method \n After declaration of all objects and logic, Build method garanteed the objects are up to date and prepared.\n Run takes (RichMessage) input and through Objects until it reaches a object that returns a wrapper response (with responseWrapper)  \n **FUTURE : BUILD A METHOD TO CONSTRUCT CHAT TREE WITHOUT JSON \n')
        console.log(Object.getOwnPropertyNames(this));
        console.log(this.objects);
      }
    Check(){
      var checklog = []
      this.init=='not built'?checklog.push('no init'):checklog.push('init declared');
      this.objects['defaultVocab']?checklog.push('no default vocabulary'):checklog.push('default vocab ok;')
      this.objects['moduleErrOutput']?checklog.push('no default err module'):checklog.push('default err module ok;')
      this.objects['moduleDefaultOutput']?checklog.push('no default module'):checklog.push('default module ok;')
      mapHasDuplicateName(this.find)?checklog.push('has duplicate Names!!'):checklog.push('No duplicate names, good thing!')
      checklog.push('Numero de objetos:' ,this.objects.length);
      this.log(checklog);
      return checklog;
    }
    log(){
      var args = Array.from(arguments);
      switch (args.length){
        case 0:
        this.logstack.forEach(log =>{console.log(log)});return this.logstack;break;
        case 1:
        this.logstack.push(args[0]);break;
        default:
        var str = '';
        args.forEach(arg => {str += ',' + arg} );
        this.logstack.push(str);break;
      }
    } 

  
      Run(inputObj){
        this.runcount += 1;
        this.log('Starting run...',this.runcount);
        this.CheckInput(inputObj);
          try{
            // check if built, if not, try.
              if(this.ready==false){this.Build();}
              if(this.ready==true){
                  var way = []; //cria o waystack
                  way.push(this.init);
                  this.log('Initial Step added to way',way)
                  var next = this.objects[this.init]; //coloca a função inicial na var next
                  while(typeof next !== "undefined"){
                      way.push(next.run(inputObj));
                      this.log('Step added to way ->', way );
                      next = this.objects[lastItem(way)]; //get last object
                  }
                  this.log('run Succesful',way );
                  this.log('run Succesful',this.arrayFind(way));
                  console.log('run Succesful',this.arrayFind(way));
              return way;
              } 
          } catch(err) {this.log('buildError',err);throw err}
      }
  
      // builds all objects that have build function. Finds object in init and check if its build and it's method "run" is a function // If ok, returns buildOk
      Build(){
          for (var key in this.objects) {
              var obj = this.objects[key];
              if(typeof obj.Build === "function"){obj.Build(this.objects)} // any way to acess Build objects?
          }
          if(typeof(this.objects[this.init].run)=='function'){
              this.ready = true;
              this.log('Successfully built ',this.name, 'Ready to go');
          } else {
              this.ready=false;
              this.log('Building ',this.name, 'has failed - init is not a function');
              throw 'Building tree Failed - init is not a function'
          }
      }
      AddObject(id,obj){
          obj.parent = this;
          this.objects[id]=obj;
          this.find.set(id,obj.name);
            var stack = [id];
            if(this.find.get(obj.name)!=undefined){
            stack.pushArray(this.find.get(obj.name));
          } 
            this.find.set(obj.name,stack); //concatena em arrays os nomes duplicados
          //check for dup object name here?
          this.log('Object Added:', obj.name);
      }
      AddVocabulary(id,func){ // no futuro fazer essa funcao poder receber array
        if(typeof(func)=='function'){
          this.vocabulary[id]=func;
          this.log('Vocabulary Added:', id);
          } else {
            throw 'Vocabulary not function - err'
          }
      }
      CheckInput(inputObj){ //pode ser uma função que recebe dois valores, um input valido e checa se o outro é invalido
          if(!inputObj.hasOwnProperty('input')){
              throw "Input invalid:input";
          }
          if(!inputObj.hasOwnProperty('context')){
            throw "Input invalid:context";
          }
      }
    parseJson(jsonref){
      this.jsonref = jsonref;
      var connMap = this.parseConnectionMap(jsonref);
      this.jsonPortMap = connMap; //to be deprecated soon
      var pholder;
  
      jsonref.forEach((obj,idx) => {
        this.log('Parsing...',obj.type);
  
        if(hasAttr(obj,'text') && obj.text==='start'){
          this.init = connMap[obj.ports[0].name];
        }
  
        switch(obj.type){
          case 'TableShape': pholder = this.parseRouter(obj); break;
          case 'filePathShape': pholder = new TextInput(obj); break;
          case 'ScriptShape': pholder = new Script(obj); break;
          case 'ModuleShape': pholder = this.parseModuleJson(obj,connMap); break;
          case 'outputShape': pholder = new Output(obj);break;
          default:
        }  
  
        this.AddObject(pholder.id,pholder);
        this.log(pholder.name,'built object sucessfully'); 
      })
  
    this.log('JSON objects parsed sucessfully');
    
    }
    parseModuleJson (obj,connMap){
      var connMap = connMap || this.jsonPortMap;
      this.log('parsing module...', obj.name)
          var modul = new Module(obj); //pega as entidades
          modul.entities = obj.entities; // pega sa portas por id dela e nome da entidade que tá
          modul.portList = parsePorts(obj.ports);
          modul.portMap = portMap(modul.portList,connMap);
          modul.portMapEnt = portMapEntities(modul.portMap,modul.entities); //parse inputs
          modul.portMapEnt.inputs.forEach((item,idx) => {
              switch(item.name){
                  case 'inputObj':modul.inputObj = item.objectConn; break;
                  case 'vocab': modul.vocab = item.objectConn || modul.vocab; break;
                  case 'script': modul.script = item.objectConn; break;
                  case 'action':modul.action = item.objectConn || modul.action; break;
                  case 'default': modul.default = item.objectConn || modul.default; break; //this is supposed to go to output in future UI versions
                  case 'err': modul.err = item.objectConn || modul.err; break; //this is supposed to go to output in future UI versions
              }
          });
        return modul;
        }
    parseRouter (obj,connMap,json){
      var connMap = connMap || this.jsonPortMap;
      var json = json || this.jsonref;
      this.log('parsing router', obj.name);
          //get names and id
          var route = new Router(obj);
          route.entities = obj.entities;
          // pega sa portas por id dela e nome da entidade que tá
          //console.log('chatTree 180',obj.ports);
          route.portList = parsePorts(obj.ports);
          route.portMap = portMap(route.portList,connMap);
          route.portMapEnt = portMapEntities(route.portMap,route.entities);
          route.portMapEnt.inputs.forEach((item,idx) => {
              switch(item.name){
                  case 'inputObj':route.inputObj = item.objectConn; break;                // input obj do nothing
                  case 'interpreter': route.interpreter = item.objectConn;break;  // parse interpreter
                  case 'script':route.script = item.objectConn; break;
              }
          });
          route.portMapEnt.outputs.forEach((item,idx) => {
              switch(item.name){
                  case 'default': route.default = item.objectConn || route.default; break;//output
                  case 'err':route.err = item.objectConn || route.err; break;//output   
                  default:
                      if(item.objectConn){ //se tem conexão entra
                          if(route.portMapEnt.inputs[idx].objectConn){ //se tem conexao no input cria um array
                              var caseInputs = [];
                              caseInputs.push(item.name);
                              caseInputs.push(getContentFromInput(json,route.portMapEnt.inputs[idx].objectConn)) //pega o input apartir da lista mestra
                              route.addCase(caseInputs,item.objectConn)
                          } else {
                            console.log('chatTree.js 201',obj.name,item.name,item.objectConn);
                            route.addCase(item.name,item.objectConn)
                          }
                      }
              }
          });
      return route;
      }
      
//parse all conections and make a port - object map
  parseConnectionMap(json) {
    var connectionMap = [];
    json.forEach(obj => {
        if(obj.type =="draw2d.Connection"){
            var port = obj.source.port;
            var to = obj.target.node;
            connectionMap[port] = to
            port = obj.target.port;
            to = obj.source.node;
            connectionMap[port] = to
        }
    });
    return connectionMap;
    }
    arrayFind(way){
        var names =way.map((item)=>{return this.find.get(item) || item});
        return names;
    }
    getObject(name){
        return this.find.get(name);
    }
}