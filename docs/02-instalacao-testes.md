# Guia de Instalação: Playwright e Cucumber

Aqui estão os passos detalhados que vamos seguir juntos para configurar o ambiente de testes de automação e BDD.

## Passo 1: Instalar o Playwright

O Playwright será a nossa ferramenta principal para interagir com o navegador, simular cliques no formulário e testar as respostas da API.

1. No terminal do VS Code, dentro da pasta do projeto, rode o comando:
   ```bash
   npm init playwright@latest
   ```
2. Durante a instalação, ele vai fazer algumas perguntas. As respostas recomendadas são:
   - **Do you want to use TypeScript or JavaScript?** Escolha `JavaScript`.
   - **Where to put your end-to-end tests?** Aperte Enter para aceitar `tests`.
   - **Add a GitHub Actions workflow?** Digite `N` (Não) por enquanto.
   - **Install Playwright browsers (can be done manually via 'npx playwright install')?** Aperte Enter para `Y` (Sim) e ele vai baixar os navegadores (Chrome, Firefox, etc).

## Passo 2: Instalar o Cucumber (BDD)

O Cucumber vai nos permitir escrever testes em português (Gherkin), como: *Dado que eu preencho o formulário... Quando eu clico em enviar... Então o agendamento é salvo.*

1. Após terminar a instalação do Playwright, rode o seguinte comando no terminal:
   ```bash
   npm install -D @cucumber/cucumber
   ```

## Passo 3: Criar a Estrutura de Pastas do BDD

1. Crie uma pasta chamada `features` na raiz do projeto.
2. Dentro dela, crie um arquivo chamado `agendamento.feature`. É aqui que vamos escrever as nossas histórias de teste no formato "Dado / Quando / Então".

---
*(Estes são os passos que faremos juntos quando você estiver pronta!)*
