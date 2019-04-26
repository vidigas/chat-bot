

var teste = ['send','update={state:idle}']


function action2Obj(actionInput){
   var actions={};
        actionInput.forEach((item,idx) => {
            let action ={};
            let item2 = item.split('=')
            console.log(item2);
            action.action=item2[0];
            console.log(action)
            action.obj = item2[1] || 'empty';
            actions[idx]=action;
        });
        return actions
}
action2Obj(teste)
