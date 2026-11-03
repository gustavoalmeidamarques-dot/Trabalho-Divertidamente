const personagens = {
    alegria: {
        nome: 'Alegria', tipo: 'EMOÇÃO POSITIVA', cor: '#ffe66d',
        descricao: 'Alegria é otimista, animada e está sempre tentando encontrar o lado bom das situações. Ela gosta de manter Riley feliz e criar lembranças especiais.',
        funcao: 'Ajuda Riley a sentir felicidade, entusiasmo e esperança, além de incentivar momentos de diversão e conexão.'
    },
    medo: {
        nome: 'Medo', tipo: 'EMOÇÃO DE PROTEÇÃO', cor: '#c49aff',
        descricao: 'Medo é cuidadoso, preocupado e vive imaginando o que pode dar errado. Mesmo nervoso, está sempre tentando proteger Riley.',
        funcao: 'Ajuda a perceber perigos e situações arriscadas, fazendo Riley pensar antes de agir.'
    },
    nojinho: {
        nome: 'Nojinho', tipo: 'EMOÇÃO DE PROTEÇÃO', cor: '#8ee66f',
        descricao: 'Nojinho é sincera, exigente e cheia de atitude. Ela tem opiniões fortes e não tem medo de demonstrar quando não gosta de alguma coisa.',
        funcao: 'Ajuda Riley a evitar coisas desagradáveis e a reconhecer aquilo que não combina com ela.'
    },
    raiva: {
        nome: 'Raiva', tipo: 'EMOÇÃO INTENSA', cor: '#ff7777',
        descricao: 'Raiva é explosivo, impaciente e acredita muito no que é justo. Ele aparece quando Riley sente que algo está errado ou não saiu como esperado.',
        funcao: 'Ajuda Riley a reconhecer injustiças, defender seus limites e reagir quando algo a incomoda.'
    },
    tristeza: {
        nome: 'Tristeza', tipo: 'EMOÇÃO IMPORTANTE', cor: '#8fcaff',
        descricao: 'Tristeza é sensível, gentil e atenciosa. Às vezes parece desanimada, mas percebe sentimentos que os outros não conseguem enxergar.',
        funcao: 'Ajuda Riley a reconhecer quando precisa de apoio, acolhimento e conexão com outras pessoas.'
    },
    ansiedade: {
        nome: 'Ansiedade', tipo: 'EMOÇÃO DE ALERTA', cor: '#ffad70',
        descricao: 'Ansiedade é acelerada, organizada e pensa bastante no futuro. Ela tenta preparar Riley para tudo o que pode acontecer.',
        funcao: 'Tenta antecipar desafios e preparar Riley para mudanças, embora às vezes se preocupe mais do que o necessário.'
    },
    vergonha: {
        nome: 'Vergonha', tipo: 'EMOÇÃO SOCIAL', cor: '#f2a6cf',
        descricao: 'Vergonha é tímido, reservado e costuma ficar desconfortável quando recebe muita atenção. Apesar disso, é carinhoso e se importa com os outros.',
        funcao: 'Ajuda Riley a perceber situações sociais delicadas e a entender como suas atitudes podem afetar outras pessoas.'
    },
    inveja: {
        nome: 'Inveja', tipo: 'EMOÇÃO DE DESEJO', cor: '#8fe5d2',
        descricao: 'Inveja é curiosa, expressiva e admira aquilo que considera interessante nos outros. Ela sempre repara nas novidades e tendências.',
        funcao: 'Mostra coisas que Riley gostaria de ter ou experimentar e pode ajudar a descobrir novos interesses.'
    }
};

const chave = new URLSearchParams(window.location.search).get('nome')?.toLowerCase();
const personagem = personagens[chave];

if (personagem) {
    document.title = `${personagem.nome} | Central das Emoções`;
    document.getElementById('nome-personagem').textContent = personagem.nome;
    document.getElementById('tipo-emocao').textContent = personagem.tipo;
    document.getElementById('descricao-personagem').textContent = personagem.descricao;
    document.getElementById('funcao-personagem').textContent = personagem.funcao;
    document.querySelector('.informacoes').style.setProperty('--cor-personagem', personagem.cor);
} else {
    document.getElementById('nome-personagem').textContent = 'Emoção não encontrada';
    document.getElementById('descricao-personagem').textContent = 'Volte para a galeria e escolha um personagem para conhecer.';
}
