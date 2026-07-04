# 🏗️ Missão: Cidade Pitagórica

![Versão](https://img.shields.io/badge/version-1.0-blue.svg)
![Licença](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Concluído-success.svg)
![Plataforma](https://img.shields.io/badge/platform-Web-blueviolet.svg)
![Linguagem](https://img.shields.io/badge/JavaScript-ES6%2B-yellow.svg)

> **Recurso Educacional Aberto (REA) gamificado para o ensino do Teorema de Pitágoras e conceitos matemáticos correlatos.**

**Cidade Pitagórica** é um jogo digital interativo desenvolvido como parte do **Projeto Integrador V** da **Universidade Virtual do Estado de São Paulo (UNIVESP)**. O projeto utiliza uma abordagem de **Educação Baseada em Evidências**, transformando dados da Prova Paulista (1º Bimestre/2026) em desafios pedagógicos significativos.

---

## 📖 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Objetivo Pedagógico](#-objetivo-pedagógico)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Como Executar](#-como-executar)
- [Como Utilizar](#-como-utilizar)
- [Testes de Bancada](#-testes-de-bancada)
- [Equipe](#-equipe)
- [Licença](#-licença)

---

## 🧩 Sobre o Projeto

A **Cidade Pitagórica** é um Recurso Educacional Aberto (REA) que combina **gamificação**, **diagnóstico formativo** e **acessibilidade**. O aluno assume o papel de um(a) engenheiro(a) responsável por concluir as obras de uma cidade, resolvendo 15 fases de problemas matemáticos contextualizados. Cada fase é composta por passos que exigem a aplicação do Teorema de Pitágoras, operações com números reais, radiciação, frações, geometria plana e conversão de unidades.

O sistema é **auto-suficiente** e **offline**, rodando inteiramente no navegador, sem necessidade de servidor ou conexão com a internet (exceto para carregar o MathJax, que pode ser substituído por versão local).

---

## 🎯 Objetivo Pedagógico

- **Diagnosticar** lacunas de aprendizagem em habilidades matemáticas essenciais.
- **Consolidar** conhecimentos por meio de problemas práticos e feedback imediato.
- **Promover** a autonomia do estudante com ferramentas de apoio (calculadora, dicas contextuais).
- **Gerar** relatórios detalhados para subsidiar o planejamento de intervenções pedagógicas.

### Habilidades da BNCC abordadas

| Código | Descrição | Fases |
| :--- | :--- | :--- |
| **EF09MA13** | Relações métricas no triângulo retângulo | 1–6 |
| **EF09MA14** | Aplicação prática do Teorema de Pitágoras | 2–6 |
| **EF08MA02** | Radiciação exata e reconhecimento de raízes não exatas | 3, 6, 7, 9, 13 |
| **EF09MA02** | Reconhecimento de números irracionais | 6, 7 |
| **EF09MA03** | Simplificação de radicais | 4, 5, 6 |
| **EF07MA27** | Cálculos de medidas em polígonos | 4 |
| **EF07MA33** | Elementos do círculo | 5 |
| **EF06MA17** | Elementos de poliedros | 9 |
| **EF08MA05** | Dízimas periódicas e frações geratrizes | 10, 11 |
| **EF07MA08** | Operações com frações | 10–12 |
| **EF06MA14** | Multiplicação com decimais | 8 |
| **EF09MA01** | Localização de números na reta numérica | 14 |
| **EF06MA24** | Resolução de problemas com tempo | 15 |

---

## 🚀 Funcionalidades

| Funcionalidade | Descrição |
| :--- | :--- |
| 🧠 **Motor de Validação Inteligente** | Dicionário JSON central que gerencia as 15 fases, permitindo fácil expansão. |
| 🔤 **Tolerância a Erros (Levenshtein)** | Aceita variações ortográficas, foco no conteúdo matemático, não na digitação. |
| 💾 **Auto-Save (LocalStorage)** | Progresso salvo automaticamente; o aluno pode retomar de onde parou. |
| 📊 **Relatório Diagnóstico (TXT)** | Gera dossiê completo com logs, erros, tempo, dicas e mapeamento BNCC. |
| 🖩 **Calculadora Científica Embutida** | Com operações básicas, raiz quadrada, cúbica e potência; uso registrado. |
| 💡 **Sistema de Dicas Contextuais** | Dicas manuais (botão) e automáticas (após 2 erros), com registro de uso. |
| 📱 **Responsividade Extrema** | Adapta-se a smartphones, tablets e desktops, inclusive com teclado virtual ativo. |
| 🔊 **Feedback Audiovisual** | Sons e animações para acertos, erros e tentativas vazias. |
| ♿ **Acessibilidade** | Atributos ARIA, foco controlado em modais, suporte a teclado (`Esc` e `Tab`). |
| 📚 **Guia do Educador e Revisão Teórica** | Modais com plano de aula, justificativa pedagógica e resumo teórico. |

---

## 🛠️ Tecnologias

- **HTML5** – Estrutura semântica e acessível.
- **CSS3** – Flexbox, Grid, animações keyframes, media queries.
- **JavaScript (ES6+)** – Manipulação de DOM, LocalStorage, Audio API, algoritmos de string.
- **MathJax** – Renderização de fórmulas matemáticas (LaTeX).

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

## 👨‍🏫 Como Utilizar

**Para o Aluno**

1. Digite seu primeiro nome na tela inicial.

2. Resolva os desafios das 15 fases.

3. Use a calculadora e as dicas sempre que precisar.

4. Ao final, responda às perguntas metacognitivas e baixe seu relatório.

5. Entregue o arquivo .txt ao professor.

**Para o Professor**

- Utilize o Guia do Educador (botão no cabeçalho) para conhecer a fundamentação pedagógica.

- Consulte a Revisão Teórica para apoiar os alunos com dificuldades.

- Analise os relatórios gerados para identificar padrões de erro e planejar intervenções.

## 🧪 Testes de Bancada

O sistema foi validado por meio de **9 testes de bancada** que simularam diferentes perfis de uso. Os testes abrangeram:

- Acertos e erros (1 ou 2 tentativas por passo).

- Uso ou não da calculadora.

- Solicitação manual de dicas ou ativação automática (após 2 erros).

- Entradas com erros ortográficos e espaços extras.

**Resultado:** 100% de coerência entre o comportamento simulado e os relatórios gerados, comprovando a robustez do sistema.

Os relatórios completos estão disponíveis na pasta Testes de Bancada/.

## 👨 💻 Equipe de Desenvolvimento

**Projeto desenvolvido em colaboração pelos discentes da UNIVESP:**

Antonio Antunes Júnior  

Giovani Machado de Lima  

Lilian Maria de Souza Lino  

Priscilla Santiago Zamorra  

Renata Helena Arantes e Oliveira

Rodrigo Aires de Medeiros Correa

Sergio Eric Reis de Oliveira

Vitor Correa Uberti

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** – permitindo o uso, a modificação e a distribuição livre, para fins educacionais e comerciais, desde que mantidos os créditos aos autores originais.

