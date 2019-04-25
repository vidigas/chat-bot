import {CreateUUID} from './ctlib';
import { timingSafeEqual } from 'crypto';


export class Output {
    constructor(obj){
        this.name = obj? obj.text || 'noname':'noname';
        this.id = obj ?obj.id || CreateUUID():CreateUUID();
        this.content =obj ? obj.text.split(",") || "nocontent":"nocontent";
    }
    Build(){
        var response = {newTree:this.name}
        this.run = () => {return response};
    }
}