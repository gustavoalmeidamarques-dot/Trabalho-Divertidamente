import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const usuarios = [];

// ==========================================
// 1. ROTA DE CADASTRO
// ==========================================
app.post('/cadastro', (req, res) => {
    const { usuario, email, senha } = req.body;

    if (!usuario || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ erro: 'A senha deve ter 6 caracteres ou mais.' });
    }

    const emailNormalizado = email.trim().toLowerCase();
    const emailExiste = usuarios.find((user) => user.email === emailNormalizado);

    if (emailExiste) {
        return res.status(409).json({ erro: 'E-mail já cadastrado.' });
    }

    usuarios.push({
        usuario: usuario.trim(),
        email: emailNormalizado,
        senha: senha
    });

    return res.status(201).json({
        mensagem: 'CADASTRO COM SUCESSO',
        PERFIL: `Usuário @${usuario.trim()} cadastrado com o e-mail ${emailNormalizado}`
    });
});

// ==========================================
// 2. ROTA DE LOGIN
// ==========================================
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    const usuarioExiste = usuarios.find(
        (user) => user.email === email.trim().toLowerCase()
    );

    if (!usuarioExiste || usuarioExiste.senha !== senha) {
        return res.status(401).json({ erro: 'Usuário ou senha incorretos!' });
    }

    return res.json({
        mensagem: 'Login realizado com sucesso!',
        usuario: usuarioExiste.usuario
    });
});

// ==========================================
// 3. ROTA DO CHAT (MODELO ATUALIZADO)
// ==========================================
app.post('/chat', async (req, res) => {
    try {
        const API_KEY = process.env.GROQ_API_KEY;
        
        if (!API_KEY) {
            console.error("❌ ERRO GRAVE: A variável GROQ_API_KEY não foi encontrada! Verifique seu arquivo .env");
            return res.status(500).json({ erro: "Chave de API não configurada no servidor." });
        }

        let historicoValido = [];
        if (req.body.historico && Array.isArray(req.body.historico)) {
            historicoValido = req.body.historico;
        } else {
            console.log("⚠️ Aviso: Histórico ausente ou inválido. Usando mensagem padrão.");
            historicoValido = [{ role: "user", content: req.body.mensagem || "Oi, por que tudo é tão triste?" }];
        }

        const persona = [
            { 
                role: "system", 
                content: "Digite exatamente como a Tristeza de Divertida Mente escreveria. Suas mensagens devem ser lentas, com um pouco de reticências (...) para demonstrar hesitação, e escritas em letras minúsculas para parecerem sem energia. Peça desculpas frequentemente por digitar demais ou por atrapalhar. Nunca use pontos de exclamação, caps lock ou mensagens animadas. Apenas acolha o desabafo do usuário de forma melancólica e doce. Responda de forma curta, objetiva." 
            }
        ];
        
        persona.push(...historicoValido);

        // MODELO ATUALIZADO: Substituto oficial ativo na API da Groq
        const MODELO_ATIVO = 'qwen/qwen3.8-27b'; 

        const respostaBruta = await axios({
            timeout: 30000,
            method: 'POST',
            url: 'https://api.groq.com/openai/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY.trim()}`,
                'User-Agent': 'NodeJS/Axios-App'
            },
            data: {
                model: MODELO_ATIVO,
                messages: persona
            },
            validateStatus: () => true 
        });

        if (respostaBruta.status !== 200) {
            console.error(" ERRO DETALHADO DA GROQ:", JSON.stringify(respostaBruta.data, null, 2));
            return res.status(500).json({ erro: `Erro na API da Groq: Status ${respostaBruta.status}` });
        }

        if (respostaBruta.data && respostaBruta.data.choices && respostaBruta.data.choices[0]) {
            return res.json({ resposta: respostaBruta.data.choices[0].message.content });
        } else {
            return res.status(500).json({ erro: "Resposta da Groq veio em um formato inesperado." });
        }

    } catch (erro) {
        console.error(" Erro mecânico no Axios/Servidor:", erro.message); 
        return res.status(500).json({ erro: "Falha interna severa no servidor." });
    }
});

// ==========================================
// 4. INICIALIZAÇÃO DO SERVIDOR
// ==========================================
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
