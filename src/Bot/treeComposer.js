import { readFileSync } from 'fs';
import { ChatTree, Interpret } from './chatTreeModules';
import { Vocab } from './chatTreeModules/lib/vocab';
import * as path from 'path'

var treeRepoPath = path.join(__dirname,'../chatUI/treeRepo/')

export default class TreeComposer {
	constructor(treeNames){

		this.trees = {}
		this.treesJson = {}
		this.treeNames = treeNames;
	}

	async init() {
		this.parse().then(() =>{
			this.build().then(() => {
				  console.log( 'chatTree Builded');
			});
		})
		 
	}

	async parse() {
		this.treeNames.forEach( async treeName => {
			try {
				this.treesJson[treeName] = await JSON.parse(readFileSync(`${treeRepoPath}/${treeName}`));
			} catch(er) { throw er }
		})
	}

	async build() {
		this.treeNames.forEach( async treeName => {
			try {
				this.trees[treeName] = await this.buildChatTree(treeName,this.treesJson[treeName]);	
			} catch (e ) { throw e}
		})
	}

	async buildChatTree (treeName,json) {
	
	var chatTree = new ChatTree();
	var interpret = new Interpret();
	var vocab = new Vocab(); //estou chamando direto na construção da chat tree, e ponho opcao de aumentar
	
	chatTree.name = treeName;
	chatTree.parseJson(json);
	//chatTree.AddInterpreter('defaultInterpreter',interpret.intDefault);
	//chatTree.AddInterpreter('intFilter',interpret.intFilter);
	//chatTree.AddInterpreter('int2',interpret.int2);
	//chatTree.AddInterpreter('intMsg',interpret.intMsg);
	//chatTree.AddVocabulary('questionRegistered', ()=>{return 'Pergunta Registrada!'});
	//chatTree.AddVocabulary('startMenu', ()=>{return 'Você pode fazer uma PERGUNTA, FALAR conosco ou consultar seu SALDO'});
	chatTree.Build();
	return chatTree;
}

}


