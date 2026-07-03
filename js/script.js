// ================= SISTEMA DE LOGS DIAGNÓSTICOS (MELHORADO) =================
let nomeDoAluno = "Aluno Anônimo";
let dataInicio = "";
let dataInicioMS = 0; 
let passoAtivoGlobal = { f: 1, p: 1 }; 
const logDiagnostico = {};

for(let f=1; f<=15; f++) {
    logDiagnostico[f] = {};
    for(let p=1; p<=4; p++) {
        logDiagnostico[f][p] = { 
            erros: 0, 
            usouDica: false,
            dicaExata: "", 
            usouCalculadora: false, 
            linhaTempo: [], 
            tempoInicio: null, 
            tempoGastoSegundos: 0, 
            concluido: false,
            dicaAutoExibida: false,
            dicaManual: false
        };
    }
}   

// ================= DICIONÁRIO DE REGRAS (O CÉREBRO DO JOGO) =================
const regrasDoJogo = {
    1: {
        1: { id: "resposta-esboco", feedId: "feedback-esboco", btnId: "btn-esboco", tipo: "exato", esp: ["ii", "2", "i i"], msgOk: "Correto! O esboço II respeita as normas.", msgErro: "Incorreto! O esboço correto é o II." },
        2: { id: "resposta-nome", feedId: "feedback-nome", btnId: "btn-nome", tipo: "flexivel", esp: ["hipotenusa"], msgOk: "Perfeito! Fase 1 concluída.", msgErro: "Incorreto. Dica: é o maior lado do triângulo. Tente novamente." }
    },
    2: {
        1: { id: "f2-resp-altura", feedId: "f2-feedback-1", btnId: "f2-btn-1", tipo: "numero", esp: 4, msgOk: "Exato! 12m - 8m = 4m de altura.", msgErro: "Dica: Subtraia a torre menor da maior." },
        2: { id: "f2-resp-catetos", feedId: "f2-feedback-2", btnId: "f2-btn-2", tipo: "flexivel", esp: ["catetos", "cateto"], msgOk: "Muito bem! Eles são os pilares do nosso triângulo.", msgErro: "Lembre-se do nome dos lados menores..." },
        3: { id: "f2-resp-hipotenusa", feedId: "f2-feedback-3", btnId: "f2-btn-3", tipo: "flexivel", esp: ["hipotenusa"], msgOk: "Exatamente! O cabo é o lado mais longo.", msgErro: "Incorreto. É o mesmo nome da rampa na Fase 1!" },
        4: { id: "f2-resp-final", feedId: "f2-feedback-4", btnId: "f2-btn-4", tipo: "range", esp: [20.3, 20.5], msgOk: "Sensacional! Projeto validado e esticado.", msgErro: "Erro de cálculo. Verifique o seu Pitágoras na calculadora!" }
    },
    3: {
        1: { id: "f3-resp-catetos", feedId: "f3-feedback-1", btnId: "f3-btn-1", tipo: "flexivel", esp: ["catetos", "cateto"], msgOk: "Correto! Eles formam a base do nosso triângulo.", msgErro: "Incorreto. Pense nos lados que formam o ângulo de 90°." },
        2: { id: "f3-resp-soma", feedId: "f3-feedback-2", btnId: "f3-btn-2", tipo: "numero", esp: 225, msgOk: "Exato! 81 + 144 = 225.", msgErro: "Tente calcular 9² e 12² na calculadora e some os dois." },
        3: { id: "f3-resp-hipotenusa", feedId: "f3-feedback-3", btnId: "f3-btn-3", tipo: "numero", esp: 15, msgOk: "Peça finalizada perfeitamente! 15 cm.", msgErro: "Extraia a raiz quadrada de 225." }
    },
    4: {
        1: { id: "f4-resp-base", feedId: "f4-feedback-1", btnId: "f4-btn-1", tipo: "numero", esp: 2, msgOk: "Correto! A base do triângulo lateral é 2 m.", msgErro: "Dica: (10 - 6) dividido por 2." },
        2: { id: "f4-resp-soma", feedId: "f4-feedback-2", btnId: "f4-btn-2", tipo: "numero", esp: 20, msgOk: "Exato! 4 + 16 = 20.", msgErro: "Dica: Calcule 2² + 4²." },
        3: { id: "f4-resp-final", feedId: "f4-feedback-3", btnId: "f4-btn-3", tipo: "exato", esp: ["c", "2√5", "2raiz5", "2√5m", "2raizde5"], msgOk: "Sensacional! √20 fatorado é 2√5.", msgErro: "Fatore o 20 como produto de um quadrado perfeito por outro número. Qual quadrado perfeito divide 20?" }
    },
    5: {
        1: { id: "f5-resp-diametro", feedId: "f5-feedback-1", btnId: "f5-btn-1", tipo: "flexivel", esp: ["diametro"], msgOk: "Correto! A linha que cruza o centro do círculo é o diâmetro.", msgErro: "Incorreto. Qual o nome da reta que vai de um lado ao outro passando pelo centro?" },
        2: { id: "f5-resp-soma", feedId: "f5-feedback-2", btnId: "f5-btn-2", tipo: "numero", esp: 52, msgOk: "Exato! 36 + 16 = 52.", msgErro: "Dica: Calcule 6² e 4² na calculadora e some os dois." },
        3: { id: "f5-resp-final", feedId: "f5-feedback-3", btnId: "f5-btn-3", tipo: "exato", esp: ["a", "√13", "raiz13", "raizde13", "√13m"], msgOk: "Sensacional! O raio é a metade do diâmetro: √(13) metros.", msgErro: "Tente novamente! Se o diâmetro é 2√(13), divida por 2 → √(13)." }
    },
    6: {
        1: { id: "f6-resp-1", feedId: "f6-feed-1", btnId: "f6-btn-1", tipo: "numero", esp: 180, msgOk: "144 + 36 = 180.", msgErro: "Calcule 12² + 6²." },
        2: { id: "f6-resp-2", feedId: "f6-feed-2", btnId: "f6-btn-2", tipo: "exato", esp: ["nao", "n"], msgOk: "Não existe inteiro.", msgErro: "Use a calculadora para tirar a raiz de 180. O resultado tem casas decimais finitas ou infinitas?" },
        3: { id: "f6-resp-3", feedId: "f6-feed-3", btnId: "f6-btn-3", tipo: "exato", esp: ["6√5", "6raiz5", "6√5m", "6raizde5"], msgOk: "√180 = √(36×5) = 6√5.", msgErro: "Fatore 180: 180 = 36 × 5. A raiz de 36 é 6..." },
        4: { id: "f6-resp-4", feedId: "f6-feed-4", btnId: "f6-btn-4", tipo: "parcial", esp: ["b", "irracional"], msgOk: "Irracional!", msgErro: "Lembre-se: números que não podem ser escritos como fração e têm representação decimal infinita não periódica são chamados de..." }
    },
    7: {
        1: { id: "f7-resp-1", feedId: "f7-feed-1", btnId: "f7-btn-1", tipo: "exato", esp: ["nao", "n"], msgOk: "Exato.", msgErro: "Calcule √200 na calculadora. O resultado é um número decimal exato ou uma dízima não periódica?" },
        2: { id: "f7-resp-2", feedId: "f7-feed-2", btnId: "f7-btn-2", tipo: "parcial", esp: ["b", "irracional"], msgOk: "É irracional.", msgErro: "Mesma lógica da piscina." }
    },
    8: {
        1: { id: "f8-resp-1", feedId: "f8-feed-1", btnId: "f8-btn-1", tipo: "numero", esp: 3.2, msgOk: "3,2 km.", msgErro: "Some todos os 4 lados." },
        2: { id: "f8-resp-2", feedId: "f8-feed-2", btnId: "f8-btn-2", tipo: "numero", esp: 3200, msgOk: "3200 m.", msgErro: "Multiplique 3.2 por 1000." },
        3: { id: "f8-resp-3", feedId: "f8-feed-3", btnId: "f8-btn-3", tipo: "numero", esp: 9600, msgOk: "Material comprado!", msgErro: "Multiplique 3200 por 3 voltas." }
    },
    9: {
        1: { id: "f9-resp-1", feedId: "f9-feed-1", btnId: "f9-btn-1", tipo: "numero", esp: 8, msgOk: "Aresta = 8 cm.", msgErro: "Use a raiz cúbica de 512." },
        2: { id: "f9-resp-2", feedId: "f9-feed-2", btnId: "f9-btn-2", tipo: "numero", esp: 12, msgOk: "12 arestas.", msgErro: "Conte as linhas de um cubo." },
        3: { id: "f9-resp-3", feedId: "f9-feed-3", btnId: "f9-btn-3", tipo: "numero", esp: 96, msgOk: "Enfeite montado!", msgErro: "Multiplique 8 por 12." }
    },
    10: {
        1: { id: "f10-resp-1-num", id2: "f10-resp-1-den", feedId: "f10-feed-1", btnId: "f10-btn-1", tipo: "fracaoDupla", esp: [[2,3], [6,9]], msgOk: "Perfeito! Fração geratriz correta.", msgErro: "Lembre-se: o número que se repete é o 6, e vai um 9 para o denominador." },
        2: { id: "f10-resp-2", feedId: "f10-feed-2", btnId: "f10-btn-2", tipo: "numero", esp: 6, msgOk: "Verniz aplicado!", msgErro: "Calcule: 9 * 2 / 3." }
    },
    11: {
        1: { id: "f11-resp-1", feedId: "f11-feed-1", btnId: "f11-btn-1", tipo: "compararFracao", esp: [2, 3], msgOk: "Perfeito.", msgErro: "Lembre do passo anterior." },
        2: { id: "f11-resp-2", feedId: "f11-feed-2", btnId: "f11-btn-2", tipo: "compararFracao", esp: [1, 3], msgOk: "Invertido.", msgErro: "Inverta a base 3." },
        3: { id: "f11-resp-3", feedId: "f11-feed-3", btnId: "f11-btn-3", tipo: "numero", esp: 2, msgOk: "Motor ajustado!", msgErro: "(2/3) dividido por (1/3)." }
    },
    12: {
        1: { id: "f12-resp-1", feedId: "f12-feed-1", btnId: "f12-btn-1", tipo: "compararFracao", esp: [4, 3], msgOk: "Raiz exata.", msgErro: "Raiz de 16 e raiz de 9." },
        2: { id: "f12-resp-2", feedId: "f12-feed-2", btnId: "f12-btn-2", tipo: "compararFracao", esp: [9, 4], msgOk: "Isso mesmo.", msgErro: "Inverta para 3/2 e eleve ao quadrado." },
        3: { id: "f12-resp-3", feedId: "f12-feed-3", btnId: "f12-btn-3", tipo: "exato", esp: ["d", "3"], msgOk: "Cofre aberto! A senha é 3.", msgErro: "Multiplique as duas frações simplificadas que você encontrou e veja qual alternativa corresponde." }
    },
    13: {
        1: { id: "f13-resp-1", feedId: "f13-feed-1", btnId: "f13-btn-1", tipo: "numero", esp: 12, msgOk: "Total = 12m.", msgErro: "Raiz de 144." },
        2: { id: "f13-resp-2", feedId: "f13-feed-2", btnId: "f13-btn-2", tipo: "numero", esp: 4.75, msgOk: "Gasto = 4,75m.", msgErro: "Some 2.5 + 0.75 + 1.5." },
        3: { id: "f13-resp-3", feedId: "f13-feed-3", btnId: "f13-btn-3", tipo: "exato", esp: ["a", "7.25", "7,25"], msgOk: "Estoque salvo!", msgErro: "Subtraia o consumo do total." }
    },
    14: {
        1: { id: "f14-resp-1", feedId: "f14-feed-1", btnId: "f14-btn-1", tipo: "exato", esp: ["m"], msgOk: "Ponto M.", msgErro: "Que raízes quadradas exatas estão próximas de √22? Localize entre dois números inteiros." },
        2: { id: "f14-resp-2", feedId: "f14-feed-2", btnId: "f14-btn-2", tipo: "exato", esp: ["o"], msgOk: "Ponto O.", msgErro: "Compare o numerador com o denominador. O valor é maior ou menor que 1?" },
        3: { id: "f14-resp-3", feedId: "f14-feed-3", btnId: "f14-btn-3", tipo: "exato", esp: ["p"], msgOk: "Ponto P.", msgErro: "Faça a divisão 193 ÷ 90 e veja entre quais inteiros está o resultado." },
        4: { id: "f14-resp-4", feedId: "f14-feed-4", btnId: "f14-btn-4", tipo: "exato", esp: ["b", "mop", "m,o,p"], msgOk: "Sequência M, O, P.", msgErro: "A sequência correta é M, O, P." }
    },
    15: {
        1: { id: "f15-resp-1", feedId: "f15-feed-1", btnId: "f15-btn-1", tipo: "numero", esp: 226, msgOk: "226 minutos.", msgErro: "Some 216 com 10." },
        2: { id: "f15-resp-2-h", id2: "f15-resp-2-m", feedId: "f15-feed-2", btnId: "f15-btn-2", tipo: "horasMinutos", esp: [3, 46], msgOk: "3h e 46min.", msgErro: "180 min = 3 horas. Sobra quanto?" },
        3: { id: "f15-resp-3", feedId: "f15-feed-3", btnId: "f15-btn-3", tipo: "exato", esp: ["c", "00h56", "00:56"], msgOk: "Cinema concluído!", msgErro: "Converta o tempo total para horas e minutos e adicione ao horário inicial, cuidando para passar da meia-noite." }
    }
};

// ================= SISTEMA DE PERSISTÊNCIA (LOCALSTORAGE) =================
function salvarEstado() {
    if (nomeDoAluno === "Aluno Anônimo") return;
    const estado = { nomeDoAluno, dataInicio, dataInicioMS, passoAtivoGlobal, logDiagnostico };
    localStorage.setItem('cidadePitagorica_estado', JSON.stringify(estado));
}

function restaurarEstado() {
    try {
        const estadoSalvoStr = localStorage.getItem('cidadePitagorica_estado');
        if (!estadoSalvoStr) return;
        const estadoSalvo = JSON.parse(estadoSalvoStr);

        if (!estadoSalvo || !estadoSalvo.passoAtivoGlobal || !estadoSalvo.passoAtivoGlobal.f) {
            localStorage.removeItem('cidadePitagorica_estado'); return;
        }

        nomeDoAluno = estadoSalvo.nomeDoAluno || "Engenheiro";
        dataInicio = estadoSalvo.dataInicio || new Date().toLocaleString();
        dataInicioMS = estadoSalvo.dataInicioMS || Date.now();
        passoAtivoGlobal = estadoSalvo.passoAtivoGlobal;

        for (let f = 1; f <= 15; f++) {
            if(estadoSalvo.logDiagnostico && estadoSalvo.logDiagnostico[f]) {
                Object.assign(logDiagnostico[f], estadoSalvo.logDiagnostico[f]);
            }
        }

        const faseAtual = passoAtivoGlobal.f;
        const passoAtual = passoAtivoGlobal.p;

        document.getElementById('tela-inicio').style.display = "none";
        document.getElementById('container-progresso').style.display = "block";
        atualizarProgresso(faseAtual, passoAtual > 1 ? passoAtual - 1 : 0);

        const faseElement = document.getElementById(`fase-${faseAtual}`);
        if (faseElement) {
            faseElement.style.display = "block";
            faseElement.classList.add("fade-in");
        } else throw new Error(`Fase ${faseAtual} não encontrada.`);

        // Remonta interface consultando o Dicionário de Regras
        for (let p = 1; p <= passoAtual; p++) {
            const regra = regrasDoJogo[faseAtual][p];
            let caixaId = `f${faseAtual}-caixa-${p}`;
            if (faseAtual === 1) caixaId = `caixa-pergunta-${p}`;

            let caixa = document.getElementById(caixaId);
            if (caixa) { caixa.style.display = "block"; caixa.classList.add("fade-in"); }

            const logDoPasso = logDiagnostico[faseAtual] && logDiagnostico[faseAtual][p];
            if (p < passoAtual || (logDoPasso && logDoPasso.concluido)) {
                let inputs = [];
                if (regra.id) inputs.push(document.getElementById(regra.id));
                if (regra.id2) inputs.push(document.getElementById(regra.id2));

                inputs.forEach(inp => {
                    if (inp) {
                        inp.disabled = true;
                        inp.style.borderColor = "#4cd137";
                        const btnCalc = document.querySelector(`button[onclick*="'${inp.id}'"]`);
                        if (btnCalc) btnCalc.style.display = "none";
                    }
                });

                const btn = document.getElementById(regra.btnId);
                if (btn) btn.style.display = "none";

                const btnDica = document.querySelector(`button[onclick*="mostrarDica(${faseAtual}, ${p})"]`);
                if(btnDica) btnDica.style.display = "none";

                const feed = document.getElementById(regra.feedId);
                if (feed) { feed.innerHTML = "✅ Concluído em sessão anterior."; feed.className = "feedback success-text"; }
            }
        }

        if (logDiagnostico[faseAtual] && logDiagnostico[faseAtual][passoAtual] && logDiagnostico[faseAtual][passoAtual].concluido) {
            if (faseAtual === 15) {
                document.getElementById('fase-15').style.display = "none";
                document.getElementById('tela-relatorio').style.display = "block";
            } else {
                let btnProx = document.getElementById(`btn-proxima-fase-${faseAtual}`);
                if (faseAtual === 1) btnProx = document.getElementById('btn-proxima-fase');
                if (btnProx) btnProx.style.display = "inline-block";
            }
        }
    } catch (erro) {
        localStorage.removeItem('cidadePitagorica_estado');
        location.reload(); 
    }
}

// === API DE RASTREAMENTO E TEMPO ===
function formatarSegundos(s) {
    const m = Math.floor(s / 60); const r = Math.floor(s % 60); return `${m}m ${r}s`;
}
function iniciarPassoLog(f, p) {
    passoAtivoGlobal = { f, p };
    if (logDiagnostico[f] && logDiagnostico[f][p] && !logDiagnostico[f][p].tempoInicio) {
        logDiagnostico[f][p].tempoInicio = Date.now();
        registrarAcaoLog(f, p, "Iniciou a leitura do passo.");
    } else salvarEstado(); 
}
function registrarAcaoLog(f, p, acao) {
    if (logDiagnostico[f] && logDiagnostico[f][p]) {
        const tempoInicio = logDiagnostico[f][p].tempoInicio || Date.now();
        const segRel = (Date.now() - tempoInicio) / 1000;
        logDiagnostico[f][p].linhaTempo.push(`[${formatarSegundos(segRel)}] ${acao}`);
        salvarEstado(); 
    }
}
function finalizarPassoLog(f, p, respostaDigitada) {
    if (logDiagnostico[f] && logDiagnostico[f][p]) {
        const log = logDiagnostico[f][p];
        if (log.tempoInicio) log.tempoGastoSegundos = Math.floor((Date.now() - log.tempoInicio) / 1000);
        log.concluido = true;
        registrarAcaoLog(f, p, `🟢 Acertou! (Digitou: ${respostaDigitada})`);
    }
}

// ================= UTILITÁRIOS MATEMÁTICOS E VALIDAÇÃO DE TEXTO =================
const somAcerto = new Audio('sons/somAcerto.mp3');
somAcerto.onerror = () => { /* ignora */ };
const somErro = new Audio('sons/somErro.mp3');
somErro.onerror = () => { /* ignora */ };
const somVazio = new Audio('sons/somVazio.mp3');
somVazio.onerror = () => { /* ignora */ };
const somLigado = new Audio('sons/somLigado.wav');
somLigado.onerror = () => { /* ignora */ };

// ================= CONTROLE DE SOM (MUDO) =================
let somAtivado = (localStorage.getItem('cidadePitagorica_somAtivado') !== 'false');

function tocarSom(audioEl) {
    if (!somAtivado) return;
    audioEl.currentTime = 0;
    audioEl.play();
}

function alternarSom() {
    somAtivado = !somAtivado;
    localStorage.setItem('cidadePitagorica_somAtivado', somAtivado);
    atualizarBotaoSom();
    if (somAtivado) tocarSom(somLigado);
}

function atualizarBotaoSom() {
    const btn = document.getElementById('btn-mudo');
    if (!btn) return;
    btn.textContent = somAtivado ? '🔊 Som Ligado' : '🔇 Som Desligado';
    btn.setAttribute('aria-pressed', (!somAtivado).toString());
    btn.classList.toggle('mudo-ativo', !somAtivado);
}

function compararFracao(inputStr, numEsperado, denEsperado) {
    const limpo = inputStr.replace(/\s/g, ''); 
    const partes = limpo.split('/');
    if (partes.length !== 2) return false;
    const num = parseFloat(partes[0]), den = parseFloat(partes[1]);
    if (isNaN(num) || isNaN(den) || den === 0) return false;
    return Math.abs(num/den - numEsperado/denEsperado) < 0.001;
}

function calcularLevenshtein(a, b) {
    const matriz = [];
    for (let i = 0; i <= b.length; i++) matriz[i] = [i];
    for (let j = 0; j <= a.length; j++) matriz[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) matriz[i][j] = matriz[i - 1][j - 1];
            else matriz[i][j] = Math.min(matriz[i - 1][j - 1] + 1, matriz[i][j - 1] + 1, matriz[i - 1][j] + 1);
        }
    }
    return matriz[b.length][a.length];
}

function verificarTextoFlexivel(digitado, esperado, margemErro = 2) {
    const limpoD = digitado.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const limpoE = esperado.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    if (limpoD === limpoE) return true;
    let erroPermitido = limpoE.length <= 5 ? 1 : margemErro;
    return calcularLevenshtein(limpoD, limpoE) <= erroPermitido;
}

// ================= CALCULADORA =================
let calcValorAtual = "0", calcValorAnterior = "", calcOp = undefined, campoAlvo = null; 
function abrirCalculadora(idDoCampo) {
    campoAlvo = document.getElementById(idDoCampo);
    calcLimpar(); 
    document.getElementById('calculadora').style.display = 'block';
    let { f, p } = passoAtivoGlobal;
    logDiagnostico[f][p].usouCalculadora = true;
    registrarAcaoLog(f, p, "🖩 Abriu a Calculadora");
}
function fecharCalculadora() { document.getElementById('calculadora').style.display = 'none'; }
function calcAtualizar() { document.getElementById('calc-visor').value = calcValorAtual; }
function calcNum(num) { calcValorAtual = (calcValorAtual === "0") ? num.toString() : calcValorAtual + num.toString(); calcAtualizar(); }
function calcDecimal() { if (!calcValorAtual.includes(".")) { calcValorAtual += "."; calcAtualizar(); } }
function calcLimpar() { calcValorAtual = "0"; calcValorAnterior = ""; calcOp = undefined; calcAtualizar(); }
function calcOperacao(op) { if (calcValorAtual === "") return; if (calcValorAnterior !== "") calcIgual(); calcOp = op; calcValorAnterior = calcValorAtual; calcValorAtual = "0"; }
function calcRaiz() { const atual = parseFloat(calcValorAtual); if(atual >= 0) { calcValorAtual = parseFloat(Math.sqrt(atual).toFixed(4)).toString(); calcAtualizar(); } }
function calcRaizCubica() { calcValorAtual = parseFloat(Math.cbrt(parseFloat(calcValorAtual)).toFixed(4)).toString(); calcAtualizar(); }
function calcIgual() {
    let res; const ant = parseFloat(calcValorAnterior), atu = parseFloat(calcValorAtual);
    if (isNaN(ant) || isNaN(atu)) return;
    switch (calcOp) {
        case '+': res = ant + atu; break;
        case '-': res = ant - atu; break;
        case '*': res = ant * atu; break;
        case '/': if (atu === 0) { calcValorAtual = "Erro"; calcAtualizar(); return; } res = ant / atu; break;
        case '^': res = Math.pow(ant, atu); break;
        default: return;
    }
    calcValorAtual = parseFloat(res.toFixed(4)).toString(); calcOp = undefined; calcValorAnterior = ""; calcAtualizar();
    registrarAcaoLog(passoAtivoGlobal.f, passoAtivoGlobal.p, `🖩 Calculou igual a: ${calcValorAtual}`);
}
function calcUsarResultado() {
    if (campoAlvo) {
        // Copia o valor
        campoAlvo.value = calcValorAtual;
        campoAlvo.style.boxShadow = "0 0 10px #4cd137";
        setTimeout(() => { campoAlvo.style.boxShadow = "none"; }, 500);

        // Altera o texto do botão temporariamente
        const btn = document.querySelector('.btn-usar-calc');
        const textoOriginal = btn.textContent;
        btn.textContent = "✅ Copiado!";
        btn.style.backgroundColor = "#4cd137";
        btn.disabled = true; // evita múltiplos cliques

        // Fecha a calculadora e restaura o botão após 1s
        setTimeout(() => {
            fecharCalculadora();
            btn.textContent = textoOriginal;
            btn.style.backgroundColor = "";
            btn.disabled = false;
        }, 1000);

        // Registra no log
        registrarAcaoLog(passoAtivoGlobal.f, passoAtivoGlobal.p, `🖩 Exportou '${calcValorAtual}' para a resposta.`);
    }
}

// ================= SISTEMA DE PROGRESSO =================
const STEPS_POR_FASE = {1:2, 2:4, 3:3, 4:3, 5:3, 6:4, 7:2, 8:3, 9:3, 10:2, 11:3, 12:3, 13:3, 14:4, 15:3};
const TOTAL_STEPS = Object.values(STEPS_POR_FASE).reduce((a, b) => a + b, 0);

function atualizarProgresso(fase, passoConcluido) {
    let soma = 0; for (let i = 1; i < fase; i++) soma += (STEPS_POR_FASE[i] || 0);
    const pct = Math.min(100, Math.round(((soma + passoConcluido) / TOTAL_STEPS) * 100));
    document.getElementById('barra-progresso').style.width = pct + "%";
    document.getElementById('porcentagem-texto').textContent = pct + "%";
}

// ================= INICIO =================
function iniciarJogo() {
    const inputNome = document.getElementById('nome-aluno').value.trim();
    const feedNome = document.getElementById('feedback-nome-aluno');
    if(inputNome === "") {
        tocarSom(somVazio);
        if (feedNome) { feedNome.innerHTML = "⚠️ Engenheiro, assine seu nome no projeto!"; feedNome.className = "feedback warning-text"; }
        document.getElementById('nome-aluno').classList.remove('shake');
        setTimeout(() => { document.getElementById('nome-aluno').classList.add('shake'); }, 10);
        document.getElementById('nome-aluno').focus();
        return;
    }
    if (feedNome) { feedNome.innerHTML = ""; feedNome.className = "feedback"; }
    localStorage.removeItem('cidadePitagorica_estado');
    nomeDoAluno = inputNome; dataInicio = new Date().toLocaleString(); dataInicioMS = Date.now(); 

    document.getElementById('tela-inicio').style.display = "none";
    document.getElementById('container-progresso').style.display = "block";
    document.getElementById('fase-1').style.display = "block";
    document.getElementById('fase-1').classList.add("fade-in");
    
    iniciarPassoLog(1, 1);
    setTimeout(() => { document.getElementById(regrasDoJogo[1][1].id).focus({ preventScroll: true }); document.querySelector('.game-container').scrollTop = 0; }, 100);
}

// ================= NOVO MOTOR DE VALIDAÇÃO INTELIGENTE =================
function verificarCampoVazio(idInput, fase, passo, mensagem = "Preencha a resposta antes de validar!") {
    const input = document.getElementById(idInput);
    if (!input) return false;
    if (input.value.trim() === "") {
        tocarSom(somVazio);
        const feed = document.getElementById(regrasDoJogo[fase][passo].feedId);
        if (feed) { feed.innerHTML = "⚠️ " + mensagem; feed.className = "feedback warning-text"; }
        return true;
    }
    return false;
}

function validarPasso(fase, passo) {
    const regra = regrasDoJogo[fase][passo];
    const proxPasso = regrasDoJogo[fase][passo + 1] ? passo + 1 : 'fim';
    let valor, valor2;
    let passou = false;

    // Checa campos múltiplos ou únicos
    if (regra.tipo === "fracaoDupla" || regra.tipo === "horasMinutos") {
        if (verificarCampoVazio(regra.id, fase, passo, "Preencha o primeiro campo!")) return;
        if (verificarCampoVazio(regra.id2, fase, passo, "Preencha o segundo campo!")) return;
        valor = parseFloat(document.getElementById(regra.id).value.replace(',', '.'));
        valor2 = parseFloat(document.getElementById(regra.id2).value.replace(',', '.'));
        
        if (regra.tipo === "fracaoDupla") passou = regra.esp.some(par => valor === par[0] && valor2 === par[1]);
        else if (regra.tipo === "horasMinutos") passou = (valor === regra.esp[0] && valor2 === regra.esp[1]);
    } else {
        if (verificarCampoVazio(regra.id, fase, passo)) return;
        valor = document.getElementById(regra.id).value;

        if (regra.tipo === "numero") {
            const num = parseFloat(valor.replace(',', '.'));
            passou = (!isNaN(num) && Math.abs(num - regra.esp) < 0.01);
        } else if (regra.tipo === "range") {
            const num = parseFloat(valor.replace(',', '.'));
            passou = (num >= regra.esp[0] && num <= regra.esp[1]);
        } else if (regra.tipo === "exato") {
            const str = valor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s/g, '');
            passou = regra.esp.includes(str);
        } else if (regra.tipo === "flexivel") {
            passou = regra.esp.some(palavra => verificarTextoFlexivel(valor, palavra, 2));
        } else if (regra.tipo === "parcial") {
            const str = valor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
            passou = regra.esp.some(palavra => str.includes(palavra) || str === palavra);
        } else if (regra.tipo === "compararFracao") {
            passou = compararFracao(valor, regra.esp[0], regra.esp[1]);
        }
    }

    if (passou) sucesso(fase, passo, proxPasso, regra.msgOk);
    else erro(fase, passo, regra.msgErro);
}

function sucesso(fase, passo, proxPasso, textoFeed) {
    tocarSom(somAcerto);
    const regra = regrasDoJogo[fase][passo];
    let inputs = [];
    if (regra.id) inputs.push(document.getElementById(regra.id));
    if (regra.id2) inputs.push(document.getElementById(regra.id2));
    
    let respostasAprovadas = [];
    inputs.forEach(inp => { 
        if(inp) {
            inp.classList.remove('shake'); inp.style.borderColor = "#4cd137"; inp.disabled = true; 
            respostasAprovadas.push(inp.value);
            const btnCalc = document.querySelector(`button[onclick*="'${inp.id}'"]`);
            if(btnCalc) btnCalc.style.display = "none";
        }
    });
    
    finalizarPassoLog(fase, passo, respostasAprovadas.join(' / '));
    
    const btnDica = document.querySelector(`button[onclick*="mostrarDica(${fase}, ${passo})"]`);
    if(btnDica) btnDica.style.display = "none";
    
    const btnPrincipal = document.getElementById(regra.btnId);
    if(btnPrincipal) btnPrincipal.style.display = "none";

    const feed = document.getElementById(regra.feedId);
    if(feed) { feed.innerHTML = "✅ " + textoFeed; feed.className = "feedback success-text"; }

    atualizarProgresso(fase, passo);

    if (proxPasso === 'fim') {
        const badge = document.getElementById(`badge-f${fase}`);
        if(badge) { badge.style.display = "inline-block"; badge.classList.add("fade-in"); }
        
        if (fase === 15) {
            document.getElementById('fase-15').style.display = "none";
            document.getElementById('tela-relatorio').style.display = "block";
            document.getElementById('tela-relatorio').classList.add("fade-in");
            document.querySelector('.game-container').scrollTop = 0;
        } else {
            let btnId = `btn-proxima-fase-${fase}`;
            if(fase === 1) btnId = 'btn-proxima-fase';
            const btnProx = document.getElementById(btnId);
            if(btnProx) { btnProx.style.display = "inline-block"; btnProx.classList.add("fade-in"); btnProx.focus(); }
        }
    } else {
        let caixaId = `f${fase}-caixa-${proxPasso}`;
        if(fase === 1) caixaId = `caixa-pergunta-${proxPasso}`;
        const caixa = document.getElementById(caixaId);
        if(caixa) { caixa.style.display = "block"; caixa.classList.add("fade-in"); }
        
        iniciarPassoLog(fase, proxPasso);

        setTimeout(() => { 
            const regraProx = regrasDoJogo[fase][proxPasso];
            if(regraProx && regraProx.id) {
                const nextInput = document.getElementById(regraProx.id);
                if(nextInput) nextInput.focus(); 
            }
        }, 100);
    }
}

function erro(fase, passo, textoFeed, silenciarSom = false) {
    if (!silenciarSom) tocarSom(somErro);
    const regra = regrasDoJogo[fase][passo];
    
    let inputs = [];
    if (regra.id) inputs.push(document.getElementById(regra.id));
    if (regra.id2) inputs.push(document.getElementById(regra.id2));

    let errosNoPasso = 0;
    if (logDiagnostico[fase] && logDiagnostico[fase][passo]) {
        logDiagnostico[fase][passo].erros++;
        errosNoPasso = logDiagnostico[fase][passo].erros;
        let valoresDigitados = [];
        inputs.forEach(inp => { if(inp && inp.value.trim() !== "") valoresDigitados.push(inp.value); });
        
        if (valoresDigitados.length > 0) registrarAcaoLog(fase, passo, `❌ Errou (Digitou: ${valoresDigitados.join(' / ')})`);
        else registrarAcaoLog(fase, passo, `❌ Errou (Tentativa em branco/inválida)`);
    }

    inputs.forEach(inp => {
        if (inp) { inp.classList.remove('shake'); setTimeout(() => { inp.classList.add('shake'); }, 10); }
    });

    const feed = document.getElementById(regra.feedId);
    if (feed) { feed.innerHTML = "❌ " + textoFeed; feed.className = "feedback error-text"; }

    // Nudge pedagógico: após 3 erros seguidos no mesmo passo, mostra a dica
    // automaticamente em vez de esperar o aluno clicar em "Dica" por conta própria.
    const jaMostrouDicaAuto = logDiagnostico[fase][passo].dicaAutoExibida;
    if (errosNoPasso >= 3 && !jaMostrouDicaAuto) {
        logDiagnostico[fase][passo].dicaAutoExibida = true;
        setTimeout(() => { mostrarDica(fase, passo, true); }, 900);
    }
}

function irParaFaseGenerica(faseAtual, proxFase) {
    document.getElementById(`fase-${faseAtual}`).style.display = "none";
    const divNova = document.getElementById(`fase-${proxFase}`);
    divNova.style.display = "block"; divNova.classList.add("fade-in");
    
    atualizarProgresso(proxFase, 0); iniciarPassoLog(proxFase, 1);

    setTimeout(() => { 
        document.querySelector('.game-container').scrollTop = 0; 
        const regra = regrasDoJogo[proxFase][1];
        if(regra && regra.id) {
            const firstInput = document.getElementById(regra.id);
            if(firstInput) firstInput.focus({ preventScroll: true }); 
        }
    }, 100);
}

// ================= MOTOR DE DICAS (COM LOG) =================
function mostrarDica(fase, passo, veioAutomatico = false) {
    const dicionarioDicas = {
        '1-1': 'Observe a altura (30 cm) e a parte inclinada (60 cm). Qual dos esboços coloca essas medidas nos lugares corretos?',
        '1-2': 'O lado que fica de frente para o ângulo reto recebe um nome especial. Começa com H.',
        '2-1': 'A torre maior tem 12m e a menor tem 8m. A altura do triângulo que se forma no ar é a diferença (12 - 8).',
        '2-2': 'Os dois lados menores que formam o ângulo de 90 graus recebem um nome específico na geometria.',
        '2-3': 'Assim como na rampa de skate, o lado maior do triângulo retângulo recebe que nome?',
        '2-4': 'Eleve os catetos ao quadrado (20² e 4²), some os resultados e tente extrair a raiz.',
        '3-1': 'Eles são os lados que formam o ângulo reto. Mesma palavra usada na Fase 2.',
        '3-2': 'Eleve o 9 ao quadrado e o 12 ao quadrado. Depois, some os dois resultados.',
        '3-3': 'Use a calculadora para encontrar qual número multiplicado por ele mesmo dá 225.',
        '4-1': 'O topo tem 10m e o fundo tem 6m. Como o trapézio é isósceles, divida a sobra por 2.',
        '4-2': 'Você encontrou a base (2m) e a altura é 4m. Eleve os dois ao quadrado e some os resultados.',
        '4-3': 'Lembre-se da fatoração: 20 pode ser escrito como 4 × 5. A raiz de 4 é exata e vai para fora.',
        '5-1': 'É a linha reta que vai de uma ponta à outra da circunferência, passando bem no centro.',
        '5-2': 'Os catetos são 6 e 4. Faça 6² e 4². Depois, some os resultados na calculadora.',
        '5-3': 'O diâmetro inteiro mede 2√13. O raio é exatamente a metade disso.',
        '6-1': 'A diagonal divide a piscina em um triângulo retângulo. Calcule 12² + 6².',
        '6-2': 'Tente achar a raiz quadrada de 180 na calculadora. Dá um número inteiro?',
        '6-3': 'Para simplificar, pense que 180 é o mesmo que 36 × 5. Qual é a raiz quadrada exata de 36?',
        '6-4': 'Números que não têm raiz exata e resultam em dízimas não periódicas pertencem a qual conjunto?',
        '7-1': 'Use a calculadora para tirar a raiz de 200. O resultado não tem padrão. É uma fração?',
        '7-2': 'Assim como a raiz de 180 na fase da piscina, a raiz de 200 não é exata.',
        '8-1': 'O perímetro é o contorno de toda a figura. Some os quatro lados indicados no mapa.',
        '8-2': 'Para transformar quilômetros (km) em metros (m), basta multiplicar por 1000.',
        '8-3': 'Pegue o valor total em metros do passo anterior e multiplique por 3 voltas de arame.',
        '9-1': 'Use a calculadora e pressione o botão da raiz cúbica (∛) com o número 512 no visor.',
        '9-2': 'Um cubo tem 4 linhas na base de cima, 4 na de baixo e 4 em pé.',
        '9-3': 'Você descobriu que cada aresta tem 8 cm e o cubo tem 12 arestas. Multiplique.',
        '10-1': 'Regra da dízima: O número que se repete (6) fica no numerador, e colocamos um 9 no denominador.',
        '10-2': 'Para multiplicar um número por uma fração, multiplique pelo de cima e divida pelo de baixo.',
        '11-1': 'Lembre-se da regra do passo anterior: a fração geratriz de 0,666... é 6/9. Simplifique.',
        '11-2': 'Um expoente negativo dá uma ordem: "Inverta a base!". O 3 passa a ser 1/3.',
        '11-3': 'Dividir por uma fração é o mesmo que multiplicar pela fração invertida.',
        '12-1': 'O expoente 0,5 é a mesma coisa que tirar a raiz quadrada.',
        '12-2': 'Primeiro inverta a fração (2/3 vira 3/2). Só depois eleve ao quadrado.',
        '12-3': 'Multiplique as duas frações que você encontrou.',
        '13-1': 'Que número inteiro multiplicado por ele mesmo dá 144?',
        '13-2': 'A raiz de uma fração faz-se tirando a raiz do número de cima e do de baixo separadamente.',
        '13-3': 'Faça a conta de subtração do consumo pelo total do rolo.',
        '14-1': 'Na reta numérica, a √22 fica entre as raízes exatas de √16 e √25.',
        '14-2': 'Ao dividir um número menor (25) por um maior (99), o resultado é "0 vírgula alguma coisa".',
        '14-3': '193 dividido por 90 dá "2 vírgula alguma coisa". Procure a letra após o 2.',
        '14-4': 'Junte as três letras que você encontrou nos passos anteriores.',
        '15-1': 'O tempo total é o tempo do filme MAIS o tempo do intervalo. Some 216 + 10.',
        '15-2': 'Se 1 hora tem 60 minutos, 3 horas têm 180 minutos. Subtraia 180 do total.',
        '15-3': 'O filme começou às 21h10 e durou 3h46min. Some as horas e os minutos.'
    };

    const chave = `${fase}-${passo}`;
    const regra = regrasDoJogo[fase][passo];
    const feed = document.getElementById(regra.feedId);
    
    if (feed && dicionarioDicas[chave]) {
        const prefixo = veioAutomatico
            ? "🤔 <strong>Notei que você tentou algumas vezes. Que tal uma dica?</strong><br>💡 "
            : "💡 <strong>Dica:</strong> ";
        feed.innerHTML = prefixo + dicionarioDicas[chave];
        feed.className = "feedback-dica fade-in";
        if(logDiagnostico[fase] && logDiagnostico[fase][passo]){
            logDiagnostico[fase][passo].usouDica = true;
            logDiagnostico[fase][passo].dicaExata = dicionarioDicas[chave];
            if (!veioAutomatico) logDiagnostico[fase][passo].dicaManual = true;
            const origem = veioAutomatico ? "🤖 Dica sugerida automaticamente (3+ erros)" : "💡 Solicitou Dica";
            registrarAcaoLog(fase, passo, `${origem}: "${dicionarioDicas[chave]}"`);
        }
    }
}

// ================= ACESSIBILIDADE: ARIA-LIVE NOS FEEDBACKS =================
// Faz leitores de tela anunciarem automaticamente quando um feedback muda
// (acerto, erro, aviso de campo vazio ou dica), sem o aluno precisar navegar
// manualmente até o texto.
function ativarAriaLiveEmFeedbacks() {
    const elementosFeedback = document.querySelectorAll('.feedback, .feedback-dica');
    elementosFeedback.forEach(el => {
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('role', 'status');
    });
}

// ================= AUTO-BIND DO HTML PARA O NOVO MOTOR =================
// Esta função sequestra os atributos "onclick" do HTML e os conecta ao motor!
function inicializarMotorValidacao() {
    for (const f in regrasDoJogo) {
        for (const p in regrasDoJogo[f]) {
            const regra = regrasDoJogo[f][p];
            const btn = document.getElementById(regra.btnId);
            if (btn) btn.onclick = () => validarPasso(parseInt(f), parseInt(p));

            const input1 = document.getElementById(regra.id);
            if (input1) {
                // Se houver um segundo campo, tratamos de forma especial
                if (regra.id2) {
                    const input2 = document.getElementById(regra.id2);
                    input1.addEventListener("keypress", function(e) {
                        if (e.key === "Enter") {
                            // Se o segundo campo estiver vazio, foca nele
                            if (input2 && input2.value.trim() === "") {
                                e.preventDefault();
                                input2.focus();
                            } else {
                                // Senão, valida normalmente
                                validarPasso(parseInt(f), parseInt(p));
                            }
                        }
                    });
                    // No segundo campo, Enter sempre valida
                    if (input2) {
                        input2.addEventListener("keypress", function(e) {
                            if (e.key === "Enter") {
                                validarPasso(parseInt(f), parseInt(p));
                            }
                        });
                    }
                } else {
                    // Campo único: Enter valida
                    input1.addEventListener("keypress", function(e) {
                        if (e.key === "Enter") {
                            validarPasso(parseInt(f), parseInt(p));
                        }
                    });
                }
            }
        }
    }
}

// ================= GERADOR DE RELATÓRIO =================
function gerarEBaixarRelatorio() {
    const m1 = document.getElementById('meta-1').value.trim() || "Não respondeu.";
    const m2 = document.getElementById('meta-2').value.trim() || "Não respondeu.";
    const m3 = document.getElementById('meta-3').value.trim() || "Não respondeu.";

    const bancoDetalhado = {
        1: { contexto: "Rampa de Skate", passos: {
            1: { p: "Qual dos 3 esboços desenhados representa corretamente o projeto?", esp: "Esboço II", hab: "(EF09MA13) Relações métricas no triângulo retângulo" },
            2: { p: "Qual o nome geométrico do lado inclinado de 60 cm?", esp: "Hipotenusa", hab: "(EF09MA13) Relações métricas no triângulo retângulo" }
        }},
        2: { contexto: "A Tirolesa", passos: {
            1: { p: "Qual a altura do triângulo retângulo formado no ar?", esp: "4", hab: "(EF09MA13) Resolução de problemas com triângulo retângulo" },
            2: { p: "Como se chamam os lados menores?", esp: "Catetos", hab: "(EF09MA13) Resolução de problemas com triângulo retângulo" },
            3: { p: "Como se chama o lado inclinado?", esp: "Hipotenusa", hab: "(EF09MA13) Resolução de problemas com triângulo retângulo" },
            4: { p: "Aplique Pitágoras e calcule o tamanho do cabo.", esp: "20.4", hab: "(EF09MA14) Aplicação prática do Teorema de Pitágoras" }
        }},
        3: { contexto: "O Esquadro", passos: {
            1: { p: "Qual o nome dos lados de 9 cm e 12 cm?", esp: "Catetos", hab: "(EF09MA13) Identificação de elementos do triângulo retângulo" },
            2: { p: "Qual o valor da soma dos quadrados dos catetos?", esp: "225", hab: "(EF09MA14) Cálculo do Teorema de Pitágoras" },
            3: { p: "Extraia a raiz da soma para achar a hipotenusa.", esp: "15", hab: "(EF08MA02) Radiciação exata" }
        }},
        4: { contexto: "Canal de Drenagem", passos: {
            1: { p: "Calcule a base do triângulo lateral.", esp: "2", hab: "(EF07MA27) Cálculos de medidas em polígonos" },
            2: { p: "Soma dos quadrados da base e altura.", esp: "20", hab: "(EF09MA14) Cálculo do Teorema de Pitágoras" },
            3: { p: "Fatoração correta da √20.", esp: "Alternativa C (2√5)", hab: "(EF09MA03) Simplificação de radicais" }
        }},
        5: { contexto: "A Praça Circular", passos: {
            1: { p: "Qual o nome da reta que cruza o centro?", esp: "Diâmetro", hab: "(EF07MA33) Elementos do círculo" },
            2: { p: "Soma dos quadrados dos catetos.", esp: "52", hab: "(EF09MA14) Cálculo do Teorema de Pitágoras" },
            3: { p: "Se o diâmetro é 2√13, qual é o raio?", esp: "Alternativa A (√13)", hab: "(EF09MA03) Operações com radicais" }
        }},
        6: { contexto: "Iluminação da Piscina", passos: {
            1: { p: "Calcule a soma dos quadrados dos lados.", esp: "180", hab: "(EF09MA14) Cálculo do Teorema de Pitágoras" },
            2: { p: "Existe um número inteiro exato para a raiz de 180?", esp: "Não", hab: "(EF08MA02) Reconhecimento de raízes não exatas" },
            3: { p: "Simplifique √180.", esp: "6√5", hab: "(EF09MA03) Simplificação de radicais" },
            4: { p: "Sendo dízima não periódica, qual o conjunto numérico?", esp: "Irracional", hab: "(EF09MA02) Reconhecimento de números irracionais" }
        }},
        7: { contexto: "A Tubulação Subterrânea", passos: {
            1: { p: "O número √200 pode ser expresso como uma fração exata?", esp: "Não", hab: "(EF09MA02) Reconhecimento de números irracionais" },
            2: { p: "Qual a classificação correta para √200?", esp: "Irracional", hab: "(EF09MA02) Reconhecimento de números irracionais" }
        }},
        8: { contexto: "O Parque Ecológico", passos: {
            1: { p: "Qual é o perímetro total em quilômetros?", esp: "3.2", hab: "(EF07MA29) Cálculo de perímetro" },
            2: { p: "Converta 3,2 km para metros.", esp: "3200", hab: "(EF06MA24) Conversão de unidades de medida" },
            3: { p: "Para 3 fios de cerca, quantos metros totais?", esp: "9600", hab: "(EF06MA14) Multiplicação com decimais" }
        }},
        9: { contexto: "Estruturas Modulares", passos: {
            1: { p: "Extraia a raiz cúbica de 512.", esp: "8", hab: "(EF08MA02) Raiz cúbica exata" },
            2: { p: "Quantas arestas possui um cubo inteiro?", esp: "12", hab: "(EF06MA17) Elementos de poliedros" },
            3: { p: "Multiplique tamanho da aresta pelo total de arestas.", esp: "96", hab: "(EF06MA14) Multiplicação simples" }
        }},
        10: { contexto: "O Acabamento de Madeira", passos: {
            1: { p: "Transforme a dízima 0,666... em fração.", esp: "2/3", hab: "(EF08MA05) Dízimas periódicas e frações geratrizes" },
            2: { p: "Calcule a área multiplicando 9 por 2/3.", esp: "6", hab: "(EF07MA08) Multiplicação de número inteiro por fração" }
        }},
        11: { contexto: "O Motor das Máquinas", passos: {
            1: { p: "Qual é a fração geratriz de 0,666...?", esp: "2/3", hab: "(EF08MA05) Dízimas periódicas e frações geratrizes" },
            2: { p: "Inverta a base do expoente negativo 3^-1.", esp: "1/3", hab: "(EF08MA02) Potenciação com expoente negativo" },
            3: { p: "Divida p por q.", esp: "2", hab: "(EF07MA08) Divisão de frações" }
        }},
        12: { contexto: "Os Códigos do Cofre", passos: {
            1: { p: "Qual a raiz de 16/9?", esp: "4/3", hab: "(EF08MA02) Radiciação de frações" },
            2: { p: "Inverta a base e eleve ao quadrado.", esp: "9/4", hab: "(EF08MA02) Potenciação com expoente negativo e fração" },
            3: { p: "Multiplique m × n.", esp: "3", hab: "(EF07MA08) Multiplicação de frações" }
        }},
        13: { contexto: "A Fita de Isolamento", passos: {
            1: { p: "Quantos metros inteiros tem o rolo total (√144)?", esp: "12", hab: "(EF08MA02) Raízes quadradas exatas" },
            2: { p: "Soma do consumo.", esp: "4.75", hab: "(EF07MA10) Adição e subtração de decimais" },
            3: { p: "Subtraia o consumo do total.", esp: "7.25", hab: "(EF07MA10) Adição e subtração de decimais" }
        }},
        14: { contexto: "As Antenas de GPS", passos: {
            1: { p: "Antena 1 (√22).", esp: "M", hab: "(EF09MA01) Localização de números irracionais na reta numérica" },
            2: { p: "Antena 2 (25/99).", esp: "O", hab: "(EF09MA01) Localização de números racionais na reta numérica" },
            3: { p: "Antena 3 (193/90).", esp: "P", hab: "(EF09MA01) Localização de números racionais na reta numérica" },
            4: { p: "Qual alternativa tem a sequência correta?", esp: "M, O, P", hab: "(EF09MA01) Ordenação na reta numérica" }
        }},
        15: { contexto: "A Grande Inauguração", passos: {
            1: { p: "Quantos minutos no total no cinema?", esp: "226", hab: "(EF06MA24) Resolução de problemas com tempo" },
            2: { p: "Converta os 226 minutos para 'Horas e Minutos'.", esp: "3h e 46min", hab: "(EF06MA24) Conversão de minutos para horas" },
            3: { p: "Some as 3h46 ao horário de início (21h10).", esp: "00h56", hab: "(EF06MA24) Adição de medidas de tempo" }
        }}
    };

    let totalAcertosPrimeira = 0, totalDicas = 0, totalDicasManual = 0, totalDicasAutomaticas = 0, maxErros = -1;
    let passoCriticoStr = "Nenhum (aluno não cometeu erros)";
    let tempoSessaoSegundos = Math.floor((Date.now() - dataInicioMS) / 1000);

    for(let f=1; f<=15; f++) {
        for(let p=1; p<=4; p++) {
            let log = logDiagnostico[f][p];
            if(log && log.concluido) {
                if(log.erros === 0) totalAcertosPrimeira++;
                if(log.usouDica) totalDicas++;
                if(log.dicaManual) totalDicasManual++;
                if(log.dicaAutoExibida) totalDicasAutomaticas++;
                if(log.erros > maxErros && log.erros > 0) { maxErros = log.erros; passoCriticoStr = `Fase ${f} (Passo ${p}) com ${log.erros} erro(s)`; }
            }
        }
    }

    let conteudo = `======================================================================\n        RELATÓRIO DIAGNÓSTICO COMPLETO - CIDADE PITAGÓRICA\n======================================================================\n\n👤 ALUNO(A): ${nomeDoAluno}\n\n----------------------------------------------------------------------\n📈 RESUMO GERAL DO DESEMPENHO (DASHBOARD)\n----------------------------------------------------------------------\n⏱️  Tempo Total da Sessão: ${formatarSegundos(tempoSessaoSegundos)}\n🎯 Acertos de Primeira (Sem erros): ${totalAcertosPrimeira} passo(s)\n💡 Total de Dicas Solicitadas: ${totalDicas} vez(es)\n   🙋 Pedidas pelo aluno: ${totalDicasManual} vez(es)\n   🤖 Sugeridas pelo sistema (após 3+ erros): ${totalDicasAutomaticas} vez(es)\n⚠️  Ponto Crítico de Aprendizagem: ${passoCriticoStr}\n\n----------------------------------------------------------------------\n🧠 REFLEXÃO METACOGNITIVA (DIÁRIO DE OBRA)\n----------------------------------------------------------------------\n1. Desafio mais complexo e como superou:\nR: ${m1}\n\n2. Eficácia das dicas utilizadas:\nR: ${m2}\n\n3. Aplicação do conhecimento no dia a dia:\nR: ${m3}\n\n----------------------------------------------------------------------\n📊 MAPEAMENTO PEDAGÓGICO DETALHADO E CRONOLOGIA\n----------------------------------------------------------------------\n`;

    for(let f = 1; f <= 15; f++) {
        conteudo += `\n======================================================================\n▶ FASE ${f} - ${bancoDetalhado[f].contexto}\n======================================================================\n`;
        let maxPassos = Object.keys(bancoDetalhado[f].passos).length;
        for(let p = 1; p <= maxPassos; p++) {
            let obj = logDiagnostico[f][p], passoDef = bancoDetalhado[f].passos[p];
            conteudo += `\n  [ Passo ${p} ] --------------------------------------------\n  🔹 Pergunta: ${passoDef.p}\n  🎯 Esperado: ${passoDef.esp}\n  📚 BNCC: ${passoDef.hab}\n\n  [ DESEMPENHO ]\n  ⏱️ Tempo no passo: ${formatarSegundos(obj.tempoGastoSegundos)}\n  ❌ Quantidade de Erros: ${obj.erros}\n  🖩 Usou Calculadora: ${obj.usouCalculadora ? "Sim" : "Não"}\n`;
            if (obj.usouDica) conteudo += `  💡 Dica mostrada: "${obj.dicaExata}"\n`;
            conteudo += `\n  [ CRONOLOGIA DE AÇÕES ]\n`;
            if (obj.linhaTempo.length > 0) obj.linhaTempo.forEach(linha => { conteudo += `    > ${linha}\n`; });
            else conteudo += `    > Nenhuma ação registrada.\n`;
        }
        conteudo += `\n`;
    }

    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Relatorio_Pitagorica_${nomeDoAluno.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    localStorage.removeItem('cidadePitagorica_estado');

    document.getElementById('tela-relatorio').innerHTML = `<h1 style="text-align: center; font-size: 40px; color: #f1c40f;">🎉 JOGO CONCLUÍDO! 🎉</h1><p style="text-align: center; font-size: 18px; color: white;">O seu relatório foi baixado para o seu dispositivo.</p><p style="text-align: center; font-size: 16px; color: #bdc3c7;">Entregue o arquivo .txt ao seu professor. Muito obrigado por jogar!</p>`;
}

// ================= INICIALIZAÇÃO E AUTO-LOAD DA PÁGINA =================
window.addEventListener('DOMContentLoaded', () => {
    inicializarMotorValidacao(); // Roda a Mágica: Conecta todo o HTML ao Objeto JSON "regrasDoJogo"
    atualizarBotaoSom();
    ativarAriaLiveEmFeedbacks();
        if (localStorage.getItem('cidadePitagorica_estado')) {
        const btnContinuar = document.createElement('button');
        btnContinuar.innerHTML = "Continuar Sessão Salva 🔄";
        btnContinuar.style.backgroundColor = "#00a8ff";
        btnContinuar.style.color = "white";
        btnContinuar.style.width = "80%";
        btnContinuar.style.marginTop = "15px";
        btnContinuar.onclick = restaurarEstado;
        const telaInicio = document.getElementById('tela-inicio');
        // Insere antes do botão de iniciar (ou no final)
        const btnIniciar = telaInicio.querySelector('button[onclick="iniciarJogo()"]');
        if (btnIniciar) {
            telaInicio.insertBefore(btnContinuar, btnIniciar); // antes do botão iniciar
        } else {
            telaInicio.appendChild(btnContinuar);
        }
    }
});