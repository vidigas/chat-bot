import { readFileSync, readFile } from 'fs';
import { ChatTree, Interpret } from './Bot/chatTreeModules/';
import { Vocab } from './Bot/chatTreeModules/lib/vocab';

var wait = ms => new Promise((r, j)=>setTimeout(r, ms))


export default class TreeComposer {
	constructor(trees = {}){

		this.trees = trees;
		this.buildedTrees = {};
		this.treeNames = ['push', 'profile']
	}

	async init() {
		this.parse().then(() =>{
			this.build().then(() => {
				  console.log( 'chatTree Builded');
			});
		})
		 
	}

	getTree(name) {
		wait(200);
		return this.buildedTrees[name]
	}


	async parse() {
		this.treeNames.forEach( async treeName => {
			try {
				this.trees[treeName] = await JSON.parse(readFileSync(__dirname+`/Bot/ChatUI/treeRepo/${treeName}`));
			} catch(er) { 	console.log(er) }
		})
	}

	async build() {
		this.treeNames.forEach( async treeName => {
			try {
				this.buildedTrees[treeName] = await this.buildChatTree(this.trees[treeName]);	
			} catch (e ) { console.log(e)}
		})
	}

	async buildChatTree (json) {
	
	var chatTree = new ChatTree();
	var interpret = new Interpret();
	var vocab = new Vocab(); //estou chamando direto na construção da chat tree, e ponho opcao de aumentar
	
	chatTree.parseJson(json);
	chatTree.AddObject('defaultInterpreter',interpret.intDefault);
	chatTree.AddObject('intFilter',interpret.intFilter);
	chatTree.AddObject('int2',interpret.int2);
	chatTree.AddObject('intMsg',interpret.intMsg);
	chatTree.AddVocabulary('questionRegistered', ()=>{return 'Pergunta Registrada!'});
	chatTree.AddVocabulary('startMenu', ()=>{return 'Você pode fazer uma PERGUNTA, FALAR conosco ou consultar seu SALDO'});
	chatTree.Build();
	return chatTree;
}

}


