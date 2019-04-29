const natural = require('Natural');
import { Logger } from '../../helper';
import {flattenArray} from './ctlib';

export function decideBestMatch(sentence,searchArray,returnScores=false,minMatch = 0.9){
var flatArray = flattenArray(searchArray)
var tokenizer = new natural.WordTokenizer();
var tokens = sentence.split(/\s+/);
var scores = flatArray.map((item) => scoreFromTokens(tokens,item))
if(returnScores) {return [flatArray,scores];}
if(Math.max(...scores)<minMatch){return 0}
else return flatArray[scores.indexOf(Math.max(...scores))];
}

function scoreFromTokens(tokens,cas){
    var scores = tokens.map((token) => natural.JaroWinklerDistance(cas,token, undefined, true));
    return Math.max(...scores);
}
//flatten array
// function flattenArray(arrayObj){
//     var holder = [];
//     arrayObj.forEach(item => {
//         if(Array.isArray(item)){ holder2 = flattenArray(item);} 
//         else var holder2= item;
//         holder = holder.concat(holder2);
//     }); 
//     return holder;
// }
export function searchNegation(sentence){
    var searchArray = ['não','nao','nem','nada'];
    var result = decideBestMatch(sentence,searchArray,false,0.95)
    return (result != 0)
}