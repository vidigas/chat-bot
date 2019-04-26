import { ChatTree, Interpret } from './chatTreeModules/';
import { Vocab } from './chatTreeModules/lib/vocab';


Array.prototype.last = function() {
    return this[this.length - 1];
}


export const buildChatTree = async (json) => {
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

export const RunTree = async (trees,chatTree,richMessage) => {


	var way = await chatTree.Run(richMessage);
	var response = way.last();
	if(!response.newTree){

		return response;

	} else {
		console.log('response newtree',response.newTree);
		var response = await RunTree(trees,trees[response.newTree],richMessage);
		return response;
	}
}


