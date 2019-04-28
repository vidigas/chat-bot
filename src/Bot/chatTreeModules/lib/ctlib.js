import {Logger} from '../../helper/'

export function CreateUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

export function getSafe(fn) {
    try {
        return fn();
    } catch (e) {
        return undefined;
    }
}

export function parsePorts(ports){
    var inputs = [];
    var outputs = [];
    ports.forEach(port => {
        var item = {id:port.id,address:port.name}
        switch(port.cssClass){
            case "draw2d_InputPort":
            inputs.push(item);
            break;
            case "draw2d_OutputPort":
            outputs.push(item);
            break;
        }
    });
    return {inputs,outputs};
}

export function portMap(portList,connectionMap){
    // port list has obj with port id and port name, on inputs and on outputs.
    //connectionmap has port/object map.
    portList.inputs.forEach(item =>{
        try{item.objectConn = connectionMap[item.address]}
        catch {item.objectConn = 'null'}
    });
    portList.outputs.forEach(item =>{
        try{item.objectConn = connectionMap[item.address]}
        catch {item.objectConn = 'null'}
    });
    return portList;
}

//

export function portMapEntities(portList,entitiesMap){
    portList.inputs.forEach((item,idx) =>{
        try{item.name = entitiesMap[idx].text;}
        catch {item.name = 'null';}
    });
    portList.outputs.forEach((item,idx) =>{
        try{item.name = entitiesMap[idx].text;}
        catch {item.name = 'null';}
    });
    return portList;
}

export function mapHasDuplicateName(map){
var check = [];
map.forEach(val => {check.push(val)});
return new Set(check).size !== check.length;
}

//recebe o conteudo e coloca em array separado por virgula
//declara as classes e constructors (o ideal era ter uma classe object e outra que extendia ela. Além diso, e se fosse tud dentro da calasse chattree?)

export function hasAttr(obj,str){
if(obj.hasOwnProperty(str)){
return true;
} else{return false;}
}
export function lastItem(obj){
return obj[obj.length-1];
}


Array.prototype.pushArray = function() {
    var toPush = this.concat.apply([], arguments);
    for (var i = 0, len = toPush.length; i < len; ++i) {
        this.push(toPush[i]);
    }
};
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};


export function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
//

export function getContentFromInput(objects,objectId){ //has to deprecate in the future
    var obj = objects[findWithAttr(objects,'id',objectId)]
    switch(obj.type){
        case 'filePathShape':
        return obj.text;
        case 'scriptShape':
        return obj.text;
        default:
        return obj.text;
    };
}
export function rWrapper (text,action,newContext) {
    if(typeof(text) != 'string'){text = text[0]} //pegar o caso do texto não ter passado por uma função.
    const response = {
        message: newContext._id,
        phone : newContext.phone,
        action: JSON.stringify(action2Obj(action)),
        text: text,
        state: newContext.state,
        confirm: 'false'
    }
    return response;
}
function action2Obj(actionInput){
    console.log(typeof actionInput);
    var actions={};
    if(typeof actionInput == 'object'){
        actionInput.forEach((item,idx) => {
            let action ={};
            let item2 = item.split('=')
            action.action=item2[0];
            action.obj = eval('action.obj = '+ item2[1]) || 'empty';
            actions[idx]=action;
        });
        return actions
    }
    else return actions;
 } 

// buildFunctions.Js


//function builds a dispatch function from a dictionary of aliases (two levels allowed, only)
// array of functions
//output default e outputerr são funções simples
function dispatchBuilder (condArray,outputArray,outputDefault) {
    // check if both arrays are same length, if not, throw err
    if(condArray.length!=Object.keys(outputArray).length){
        return { 'err' : 'Objects not matching'};
    }
    Logger(condArray)
    var redirect ={}
    //index to map output array
    var idx=0;
    //loops thorugh dict mapping
    condArray.forEach(condition => {
        if(condition.constructor === Array){
            condition.forEach(alias => {

                redirect[alias] = outputArray[idx];
            });

        } else
        {

            redirect[condition] = outputArray[idx];
        }

        idx = idx + 1;

    });
 
    var dispatchFunction = (inputObj) => {
        try{
            var redir = redirect[inputObj.context.interpret]
            if(typeof(redir)=='undefined'){
                return outputDefault;
            } else {
            return redir;
            } 
        }
        catch{
            return outputDefault;
        }
    }

  return dispatchFunction;
}


export function routerBuilder (interpreter,condArray,outputArray,outputDefault,outputErr){
    try{
        var dispatcher = dispatchBuilder(condArray,outputArray,outputDefault)
            var router = (inputObj) =>{
                try{
                    if(typeof interpreter !='function'){Logger('ERROR: Interpreter not a function');console.log('interpreter :', interpreter)}
                    var interpreted_caso = interpreter(inputObj,condArray);
                    inputObj.context.interpret = interpreted_caso;
                    var route = dispatcher(inputObj);
                    return route;
                } catch(err){
                    console.log('outputErr Coming...')
                    console.log(outputErr);
                    return [outputErr];
                }
            }
        return router;
    } catch (build_err){
        throw build_err;
    }
}
export function moduleBuilder(action,vocab,outputDefault,outputErr){
    try{
        var modul = (inputObj) =>{
            try{
            // aqui entra a criação de ações do banco de dados
            if(typeof(vocab)=='function'){
              vocab = vocab(inputObj.context);
            }
            var response = rWrapper(vocab,action,inputObj.context)
            return response;
        }catch(err){
          console.log(err);
            return outputErr;
        }
    }
    return modul;
} catch (build_err){
        throw build_err;
    }
}
