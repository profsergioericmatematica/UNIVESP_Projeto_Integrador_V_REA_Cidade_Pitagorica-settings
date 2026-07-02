# 🏗️ Missão: Cidade Pitagórica

![Versão](https://img.shields.io/badge/version-1.0-blue.svg)
![Licença](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Concluído-success.svg)

**Cidade Pitagórica** é um Recurso Educacional Aberto (REA) em formato de web game gamificado, desenvolvido como parte do Projeto Integrador V da **Universidade Virtual do Estado de São Paulo (UNIVESP)**. 

Focado na **Educação Baseada em Evidências**, o jogo atua como uma intervenção pedagógica digital voltada para alunos do Ensino Médio, utilizando dados e problemáticas inspiradas na Prova Paulista (1º Bimestre de 2026).

---

## 🎯 Objetivo Pedagógico

O jogo transforma a avaliação formativa em uma experiência interativa. O aluno assume o papel de um(a) Engenheiro(a) Chefe encarregado de finalizar as obras do Canteiro Central de uma cidade. Durante as 15 fases, o estudante resolve problemas práticos que exigem habilidades matemáticas mapeadas pela **Base Nacional Comum Curricular (BNCC)**, incluindo:
* Teorema de Pitágoras e relações métricas em triângulos retângulos[cite: 17].
* Identificação de números Racionais e Irracionais (Raízes não exatas e Dízimas Periódicas)[cite: 17].
* Geometria Plana (Cálculo de Área e Perímetro de Polígonos)[cite: 17].
* Operações com Frações e Potenciação (Expoentes negativos e fracionários)[cite: 17].

---

## 🚀 Funcionalidades e Destaques Técnicos

O projeto foi construído com arquitetura Front-end otimizada, dispensando frameworks pesados, garantindo execução leve em qualquer dispositivo:

* 🧠 **Motor de Validação Inteligente (Data-Driven):** O jogo é gerido por um "Dicionário de Regras" (Objeto JSON Mestre) que processa as 15 fases dinamicamente, eliminando redundância de código e facilitando a adição de novas fases[cite: 17].
* 🔤 **Tolerância a Erros de Digitação (Algoritmo de Levenshtein):** O sistema não pune o aluno por erros ortográficos simples (ex: digitar "ipotenusa" em vez de "hipotenusa"). A distância de Levenshtein avalia a intenção da resposta, focando no aprendizado matemático[cite: 17].
* 💾 **Persistência de Dados (Auto-Save):** Utilização da API `localStorage` para salvamento automático. Se o aluno fechar o navegador sem querer, ele pode retomar a missão exatamente da fase em que parou, mantendo as caixas anteriores bloqueadas[cite: 17].
* 📊 **Sistema de Tracking e Relatório Diagnóstico (TXT):** O jogo rastreia de forma invisível toda a jornada do estudante. Ao final, gera e baixa automaticamente um dossiê para o professor contendo[cite: 17]:
  * Tempo total da sessão e tempo gasto em cada passo[cite: 17].
  * Cronologia de ações segundo a segundo (ex: *"Errou -> Pediu Dica -> Usou Calculadora -> Acertou"*)[cite: 17].
  * Texto exato da dica solicitada e quantitativo de erros (identificando o gargalo de aprendizagem)[cite: 17].
  * Mapeamento direto com as habilidades da BNCC[cite: 17].
* 🖩 **Calculadora Científica Embutida:** Ferramenta modal com "espião" de eventos que registra no log do professor se (e como) a calculadora foi utilizada pelo aluno[cite: 17].
* 📱 **Responsividade Extrema:** CSS moderno projetado com media queries avançadas que adaptam a UI mesmo quando o teclado virtual de smartphones toma grande parte da tela[cite: 18].
* 🔊 **Feedback Audiovisual:** Sons de recompensa e alertas integrados para respostas corretas, erradas ou tentativas vazias, além de animações de "shake" e "fade-in" para orientação espacial[cite: 17, 18].

---

## 🛠️ Tecnologias Utilizadas

* **HTML5** (Semântico e acessível)
* **CSS3** (Flexbox, Grid, Animações Keyframes e Media Queries)[cite: 18]
* **JavaScript Vanilla (ES6+)** (Manipulação de DOM, LocalStorage, Áudio API e Algoritmos de String)[cite: 17]
* **MathJax** (Renderização profissional de fórmulas e equações matemáticas na web)

---

## 📂 Estrutura de Arquivos

```text
/
├── index.html                                                              # Estrutura principal, templates das fases e UI
├── style/
│   └── style.css                                                           # Estilos globais, temas escuros e responsividade
├── js/
│   └── script.js                                                           # Core do jogo: Motor JSON, Levenshtein, Relatório e UI Logic
├── imagens/                                                              # Assets visuais dos desafios (q1.png a q10.png, etc.)
│   └── q1.png
│   └── q21.png
│   └── q3.png
│   └── q4.png
│   └── q6.png
│   └── q7.png
│   └── q8.png
│   └── q10.png
├── sons/                                                                   # Feedback auditivo (somAcerto.mp3, somErro.mp3, somVazio.mp3)
│   └── somAcerto.mp3
│   └── somErro.mp3
│   └── somVazio.mpe
├── Questões Prova Paulista de Matematica do 1º Bimestre de 2026/
│   └── 1-serie-dia-2-prova-roxa-1-16.pdf
│   └── Prova_e_Folha_de_Respostas_Seduc_1_srie_DIA_2__Prova_Roxa-2-5.pdf
└── Testes de Bancada/
    └── Relatorio_Pitagorica_Teste_Caótico_Completo.txt
    └── Relatorio_Pitagorica_Teste_das_Respostas_Sujas.txt
    └── Relatorio_Pitagorica_Teste_de_Bancada_acertando_tudo_pedindo_todas_as_dicas_e_usando_calculadora.txt
    └── Relatorio_Pitagorica_Teste_de_Bancada_acertando_tudo_sem_pedir_dicas_e_sem_usar_calculadora.txt
    └── Relatorio_Pitagorica_Teste_de_Bancada_acertando_tudo_sem_pedir_dicas_e_usando_calculadora.txt
    └── Relatorio_Pitagorica_Teste_de_Bancada_errando_tudo_uma_vez.txt
    └── Relatorio_Pitagorica_Teste_do_Spammer_Cliques_no_Vazio.txt
    └── Análise dos testes de bancada.odt
```
## ⚙️ Como executar o projeto

Como o projeto é feito puramente em tecnologias web client-side (sem back-end ou necessidade de banco de dados), a execução é imediata:

1. Faça o clone deste repositório:

```text
git clone [https://github.com/profsergioericmatematica/UNIVESP_Projeto_Integrador_V_REA_Cidade_Pitagorica.git](https://github.com/profsergioericmatematica/UNIVESP_Projeto_Integrador_V_REA_Cidade_Pitagorica.git)
```

2. Abra a massa do projeto.

3. Dê um duplo clique no arquivo para abri-lo em qualquer navegador moderno (Chrome, Edge, Firefox, Safari, mobile).index.html

* **Nota:** Para gerar e baixar o relatório diagnóstico final .txt, garanta que o navegador tenha permissão para baixar arquivos.

## 👨 💻 Equipe de DesenvolvimentoProjeto desenvolvido em colaboração pelos discentes da UNIVESP:

Antonio Antunes Júnior  

Giovani Machado de Lima  

Lilian Maria de Souza Lino  

Priscilla Santiago Zamorra  

Renata Helena Arantes e Oliveira

Rodrigo Aires de Medeiros Correa

Sergio Eric Reis de Oliveira

Vitor Correa Uberti

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - permitindo uso, modificação e distribuição de forma livre e aberta para fins educacionais e comerciai

