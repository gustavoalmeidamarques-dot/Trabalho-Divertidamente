const usuarioLogado = localStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    alert('Você precisa se cadastrar e fazer login antes de acessar o chat.');
    window.location.href = 'cadastro.html';
} else {
const input = document.querySelector('#input');
const btnEnviar = document.querySelector('#btnEnviar');
const cChat = document.querySelector('#c_chat');


const logado = localStorage.getItem('usuarioLogado') || 'Visitante';
const historicoConversa = [];

// Personaliza a mensagem inicial com o nome da pessoa que fez login.
const mensagemBoasVindas = cChat.querySelector('.mensagem span');
if (mensagemBoasVindas) {
    mensagemBoasVindas.textContent = `Oi ${logado}, seja bem-vindo ao chat! 💙`;
}

function mensagemTela(autor, texto, tipo = '') {
    const mensagem = document.createElement('div');
    mensagem.className = `mensagem ${tipo}`.trim();

    const autorElemento = document.createElement('strong');
    autorElemento.textContent = `${autor}: `;

    const textoElemento = document.createElement('span');
    textoElemento.textContent = texto;

    mensagem.appendChild(autorElemento);
    mensagem.appendChild(textoElemento);
    cChat.appendChild(mensagem);
    cChat.scrollTop = cChat.scrollHeight;
}

async function enviarMensagem() {
    const textoMensagem = input.value.trim();

    if (!textoMensagem || btnEnviar.disabled) return;

    mensagemTela(logado, textoMensagem, 'usuario');
    historicoConversa.push({ role: 'user', content: textoMensagem });

    input.value = '';
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    try {
        const respostaServidor = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ historico: historicoConversa })
        });

        const dados = await respostaServidor.json();

        if (!respostaServidor.ok) {
            mensagemTela('Sistema', dados.erro || 'Não foi possível enviar a mensagem.');
            return;
        }

        const resposta = dados.resposta || 'Não consegui responder agora.';
        historicoConversa.push({ role: 'assistant', content: resposta });
        mensagemTela('Tristeza', resposta);
    } catch (erro) {
        console.error('Erro ao enviar mensagem:', erro);
        mensagemTela('Sistema', 'Erro ao conectar com o servidor. Verifique se o server1.js está rodando.');
    } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Enviar';
        input.focus();
    }
}

btnEnviar.addEventListener('click', enviarMensagem);

input.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        enviarMensagem();
    }
});

}
