//fazer aqui um função de construção de rich message
export class RichMessage{
    constructor(context,input){
        this.context = context;
        this.context._id = context._id;
        this.context.phone = context.phone;
        this.context.state = context.state;
        this.context.text = context.text;
        this.input = input;
        this.input._id = input._id;
        this.input.phone = input.phone;
        this.input.role = input.role;
    }
}
export class Response{
    constructor(text,action,newContext){
        this.message = newContext._id,
        thi.phone = newContext.phone,
        this.action = action, //atencao que aqui tem que ser a action preparada com action2obj e json stringify
        this.text = text,
        this.state = newContext.state,
        this.confirm = 'false'
    }
}