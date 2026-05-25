# Passo a Passo Completo: Automação E2E (Playwright + Cucumber)

Este documento registra exatamente tudo o que conversamos, fizemos e faremos para configurar o nosso laboratório de testes.

## 1. Instalação do Playwright

O comando que rodamos foi:
```bash
npm init playwright@latest
```

**O que esse comando significa?**
- **`npm`**: É o gerenciador de pacotes do Node. Ele baixa as ferramentas da internet para o nosso computador.
- **`init`**: Vem de "inicializar". Ele pede para o npm baixar a ferramenta e já criar a estrutura de pastas inicial dela.
- **`playwright@latest`**: É o nome da ferramenta que queremos, e o `@latest` garante que pegamos a versão mais nova possível.

**As respostas que demos durante a instalação:**
- *Do you want to use TypeScript or JavaScript?* Escolhemos TypeScript/JavaScript.
- *Where to put your end-to-end tests?* Deixamos a pasta padrão chamada **tests**.
- *Add a GitHub Actions workflow?* Respondemos **Não (N)**.
- *Install Playwright browsers?* Respondemos **Sim (Y)** (Isso baixou o motor do Chrome, Firefox, etc. para o Playwright conseguir simular o uso real).

---

## 2. Instalação do Cucumber (BDD)

Para podermos escrever os testes em português estilo "Dado / Quando / Então" (linguagem Gherkin), instalamos o Cucumber com o seguinte comando:
```bash
npm install -D @cucumber/cucumber
```

---

## 3. Próximos Passos (O que vamos fazer na sequência)

1. **Criar a pasta de Features:** 
   Vamos criar uma pasta chamada `features` na raiz do nosso projeto.
   
2. **Escrever a História (BDD):** 
   Dentro da pasta `features`, criaremos um arquivo `agendamento.feature`. É nele que vamos escrever como o teste deve acontecer, em português puro.
   
3. **Criar os Steps (Passos de Código):** 
   Vamos fazer um "de-para". Vamos programar usando os comandos do Playwright (ex: `page.fill()`, `page.click()`) para que ele entenda o que cada linha em português do nosso BDD significa e execute a ação na tela do nosso site!
