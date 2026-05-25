# Boas Práticas e Papéis: QA vs Desenvolvedor

Este documento registra reflexões avançadas sobre a responsabilidade de quem escreve o código (Desenvolvedor) e de quem automatiza e valida os testes (QA).

## 1. Regras de Negócio são do Dev
A **Regra de Negócio** sempre deve estar programada no código-fonte do sistema (no Frontend ou no Backend).
- **Exemplo Prático:** Se a regra do negócio diz que *"Um tutor não pode agendar o mesmo cachorro duas vezes no mesmo dia"*, o desenvolvedor **deve** criar esse bloqueio no sistema.
- Além disso, é responsabilidade da arquitetura do sistema criar identificadores únicos (IDs) invisíveis no banco de dados para cada registro, garantindo que a aplicação não confunda os dados por trás dos panos.

## 2. Testes Robustos são do QA
Ferramentas de teste E2E (End-to-End), como o Playwright e o Cucumber, simulam a visão e os cliques de um usuário humano. O robô não consegue "ver" os IDs escondidos no código; ele apenas lê os textos que aparecem na tela gráfica.
- **O Desafio:** O que acontece se o sistema permitir (o que é normal) que dois clientes totalmente diferentes cadastrem cachorros chamados "Rex"?
- **A Solução do QA:** É responsabilidade do QA usar sua inteligência analítica para escrever **testes robustos**. Ao invés de buscar na tela um elemento genérico apenas pelo nome (`.filter({ hasText: 'Rex' })`), o QA deve cruzar informações únicas visíveis na interface (Exemplo: Nome do Pet + Nome do Dono + Telefone). Assim, o robô valida o item correto sem falsos positivos.
- *Nota Técnica (Playwright):* Se o QA for genérico demais na busca, o Playwright dispara um erro chamado `strict mode violation`. Isso significa que ele encontrou múltiplos elementos correspondentes na tela e travou por segurança, sem saber em qual deles interagir.

## 3. A Parceria (A Mágica acontece aqui)
Muitas vezes, é exatamente ao tentar montar essas "buscas robustas" que o QA descobre brechas no sistema.
- Se o QA cria um teste cadastrando duas vezes o exato mesmo cachorro, do mesmo dono, no mesmo horário, e o sistema aceita sem avisar erro... O QA levanta a mão e reporta: *"Temos um bug de regra de negócio aqui!"*.
- O Desenvolvedor então vai lá e corrige o código do site.

**Resumo:** O Dev protege as regras do sistema com código, e o QA não apenas procura falhas, mas garante que a experiência visual e funcional do usuário seja à prova de bugs, escrevendo testes precisos e à prova de falhas!
