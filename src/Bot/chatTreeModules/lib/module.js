import {CreateUUID,moduleBuilder} from './ctlib';

export class Module{
    constructor(obj){
        this.name = obj? obj.name || 'noname': 'noname';
        this.id = obj? obj.id || CreateUUID():  CreateUUID();
        this.default = obj? obj.default || 'moduleDefaultOutput': 'moduleDefaultOutput';
        this.err = obj? obj.err || 'moduleErrOutput': 'moduleErrOutput';
        this.vocab = obj? obj.vocab || 'defaultVocab': 'defaultVocab';
        this.script = obj? obj.script || 'none': 'none';
        this.action = obj? obj.action || 'default': 'default';
        this.run = 'not built';

        this.jsonref = obj || 'none';
    }
    Build(){
      this.vocab = this.parent.objects[this.vocab]? this.parent.objects[this.vocab].content || this.vocab : this.vocab; //pega o nome do vocab
      this.vocab = this.parent.vocabulary[this.vocab] || this.vocab;
      this.action = this.parent.objects[this.action]? this.parent.objects[this.action].content || this.action : this.action;
      this.run = moduleBuilder(this.action,this.vocab,this.default,this.err);
    }
  }