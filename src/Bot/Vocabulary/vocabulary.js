



export const rWrapper = (text,action,newContext)  => {
    console.log('rWrapper');
	const response = {
        message: newContext._id,
        phone : newContext.phone,
		action: action,
        text: text,
        state: newContext.state,
        confirm: 'false'
	}
    return response;
}

export const newUserGreeting = (user) => {
    var msgBody = 'Oii NAME*, nós somos o Plantão do Zap!! \n \n \n Uma rede incrivel de professores que ta aqui pra te ajudar a passar no ENEM  \n\n\n Voce pergunta, agente responde. \n\n Simples assim. \n Pra fazer uma pergunta, é só mandar uma mensagem escrito NOVA PERGUNTA (em "CAPSLOCK"). Em seguida voce manda uma foto do exercício e um audio explicando sua dúvida. \n\n\n A sua pergunta vai ser enviada na hora para a nossa rede de professores e em poucos minutos agente te envia a solução com uma pequena aula sobre aquele exercício. \n No final, voce poderá avaliar nosso serviço :) \n Obrigadx'	
    return msgBody.replace('NAME*', user);
}
export const askQuestion = (user) => {
    //no bom dia podemos colocar um datetime que controla isso
    var msgBody = 'Bom dia, NAME*! Por favor, prossiga com sua pergunta. Estamos escutando. Quando terminar de enviar a pergunta, envia a frase: "Pergunta Concluída"!'	
    return msgBody.replace('NAME*', user);
}
export const getName = () => {
	var msgBody = 'Para finalizar o seu cadastro gostaríamos de faze mais algumas perguntinhas ... \n Qual o seu nome?'
	return msgBody;
	
}
export const tudoBem = () => {
    var x = Math.random();
    var msgBody = '';
    console.log(x)
    switch(true){
        case x<0.100:
            msgBody = 'Tudo médio, na verdade. Passei a tarde inteira trabalhando, respondendo uma turma de alunos que na verdade só queriam bater papo. /n você vai querer perguntar algo? responda NOVA PERGUNTA';
            break;
        case x<0.300:
            msgBody='Tudo indo';
            break;
        default:
            msgBody = 'Tudo bem, obrigado!';
    }
	return msgBody;
}
export const aboutUs = () => {
	var msgBody = 'Vidigal é doidão'
	return msgBody;
}
export const interact = () => {
	var msgBody = 'Você pode interagir conosco dizendo mandando uma mensagem escrita: NOVA PERGUNTA'
	return msgBody;
}

export const backToIdle = () => {
	var msgBody = 'Você está de volta ao início \n' + interact();
	return msgBody;
}
export const help = () => {
	var msgBody = 'Aguarde que alguem entrará em contato!';
	return msgBody;
}