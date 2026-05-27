# 🐾 Pet Bath Scheduler

Projeto de aprendizado de **QA (Quality Assurance)** com foco em testes de API REST.

---

## 👩‍💻 Sobre este projeto

Este é um sistema simulado de agendamento de banhos para pets. 
O objetivo principal deste repositório é **demonstrar habilidades de testes de API**, incluindo:

- ✅ Testes Manuais com **Postman / Thunder Client**
- ✅ Validação de **Status Codes** (200, 201, 400, 500)
- ✅ Validação de **Response Body** (estrutura JSON)
- ✅ Testes de **Cenário Positivo e Negativo**

---

## 🚀 Como executar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado

### Passo 1: Instalar dependências
```bash
npm install
```

### Passo 2: Iniciar o servidor
```bash
npm run dev
```

O servidor vai rodar em: `http://localhost:3000`

---

## 🧪 Como executar os testes de API (Postman)

### Passo 1: Baixar o Postman
- Acesse [postman.com](https://www.postman.com/downloads/) e baixe a versão Desktop.

### Passo 2: Importar a Collection de Testes
1. Abra o Postman Desktop.
2. Clique em **Import** (botão laranja no topo à esquerda).
3. Selecione o arquivo: `Pet_Bath_Scheduler_QA_Tests.postman_collection.json`
4. A collection vai aparecer na sua barra lateral!

### Passo 3: Executar os testes
1. Com o servidor rodando (`npm run dev`), abra a collection importada.
2. Clique em **Run Collection**.
3. Todos os testes vão rodar automaticamente e você verá os resultados em verde ✅ ou vermelho ❌.

---

## 📋 Endpoints da API

| Método | URL | Descrição |
|--------|-----|-----------|
| `GET`  | `/api/appointments` | Retorna todos os agendamentos |
| `POST` | `/api/appointments` | Cria um novo agendamento |

### Exemplo de Body para POST:
```json
{
  "owner": "Carlos",
  "phone": "99999-0000",
  "pet": "Bolinha",
  "breed": "Pug",
  "weight": "8",
  "date": "2026-05-30",
  "time": "14:00",
  "service": "Bath"
}
```

---

## ✅ Casos de Teste Cobertos

### GET /api/appointments
| # | Teste | Critério de Aceitação |
|---|-------|----------------------|
| 1 | Status Code | Deve ser **200 OK** |
| 2 | Performance | Tempo de resposta < 1000ms |
| 3 | Estrutura | Deve retornar um Array |
| 4 | Campos | Cada item deve ter `id`, `owner`, `pet`, `date` |

### POST /api/appointments
| # | Teste | Critério de Aceitação |
|---|-------|----------------------|
| 1 | Status Code (positivo) | Deve ser **201 Created** |
| 2 | ID gerado | Campo `id` não pode ser nulo |
| 3 | Dados corretos | `pet`, `owner` e `breed` salvos corretamente |
| 4 | Status Code (negativo) | Dados inválidos devem retornar **400 Bad Request** |

---

## 🔄 Fluxo de Gestão e Acompanhamento de Bugs (Jira)

Para garantir o rastreio e ciclo de vida completo de cada bug identificado na API, utilizamos o **Jira** para documentar, priorizar, assinalar tarefas de desenvolvimento e validar as correções (*bug fixes*).

### Exemplo de Tickets do Jira Gerenciados no Projeto:

#### 1. BUG-001: Aceite de Agendamento sem Campo Obrigatório "pet"
* **Fluxo:** Identificado ➡️ Criado Ticket em `To Do` ➡️ Desenvolvido Fix ➡️ Validado pelo QA e movido para `Done`.

| Ticket Criado (To Do) | Ticket Resolvido (Done) |
|:---:|:---:|
| ![Jira BUG-001 To Do](qa/images/Jira_bug001_to_do.png) | ![Jira BUG-001 Done](qa/images/jira-ticket%20-bug001.png) |

#### 2. BUG-002: Tempo de Resposta do POST Acima do Aceitável
* **Fluxo:** Identificado ➡️ Investigado e Otimizado no Servidor ➡️ Validado e movido para `Done`.

| Ticket Resolvido (Done) |
|:---:|
| ![Jira BUG-002 Done](qa/images/jira-ticket%20-bug002.png) |

---

## 🛠️ Tecnologias utilizadas

- **Next.js** - Framework do servidor (Back-end)
- **Postman** - Ferramenta de testes de API
- **Thunder Client** - Extensão alternativa de testes de API para VS Code
