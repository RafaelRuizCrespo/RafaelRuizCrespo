Desafio de Automação: Cadastro Blocks
Este documento contém os cenários e testes realizados, um relatório de observações e bugs, e uma rápida explicação de como baixar o código, que foi desenvolvido para automatizar os testes do fluxo de registro na plataforma Blocks, como parte de um Teste | QA na Blocks.

Tecnologias utilizadas
Linguagem: JavaScript

Framework de Teste: Cypress 15.9.0, Node v20.9.0

Padrão de Escrita: BDD (Behavior Driven Development)

Cenários de teste (Formato Gherkin)
Cenário 1: Cadastro realizado com sucesso
Dado que eu acesso a página de registro 
E preencho todos os campos obrigatórios com dados válidos 
E aceito a política de privacidade 
Quando clico no botão "Entrar" 
Então o sistema deve processar o cadastro 
E redirecionar-me para a área logada da plataforma.

Cenário 2: Validação de e-mail inválido
Dado que eu insiro um e-mail sem o formato correto (ex: usuario@dominio) 
E preencho os demais campos corretamente 
Quando o formulário valida os dados 
Então a mensagem de erro "This is not a valid email" deve ser exibida 
E o botão "Entrar" deve permanecer desabilitado.

Cenário 3: Divergência entre senhas
Dado que eu preencho o campo "Senha" com um valor 
E preencho o campo "Confirmar Senha" com um valor diferente 
Quando interajo com o formulário 
Então o botão "Entrar" deve permanecer desabilitado.

Cenário 4: Tentativa de cadastro sem aceite de termos
Dado que eu acesso a página de registro
Quando preencho todos os campos obrigatórios corretamente
E não aceito a política de privacidade
Então o botão "Entrar" deve permanecer desabilitado.

Cenários extras:

Cenário 5: Validação de requisitos de segurança (Senha Fraca)
Dado que eu insiro uma senha que não atende aos requisitos mínimos (ex: 123) 
E preencho os demais campos obrigatórios 
Quando tento finalizar o registro 
Então o sistema deve identificar a fragilidade da senha 
E manter o botão "Entrar" desabilitado para proteção da conta.

Cenário 6: Validação de campos obrigatórios vazios
Dado que eu acesso a página de registro 
Quando o formulário é carregado 
Então o botão "Entrar" deve estar desabilitado por padrão.

Cenário 7: Validação de campo obrigatório após interação
Dado que eu acesso a página de registro 
Quando interajo com um campo obrigatório e o deixo vazio 
Então o sistema deve garantir que o botão "Entrar" permaneça bloqueado.

Tratamento de comportamentos assíncronos

Durante a automação, eu identifiquei que o banner de cookies pode aparecer de forma assíncrona, inclusive durante a interação com o formulário.
Para evitar falhas que interrompesse o teste, eu fiz uma abordagem defensiva que aceita os cookies sempre que o banner é detectado, sem impactar o fluxo dos testes caso ele não seja exibido.

Relatório de observações e bugs
Durante o desenvolvimento da automação, eu identifiquei pontos críticos que podem impactar tanto na experiência do usuário quanto na qualidade do produto:

1. Erros de Tradução
Observação: Embora o site esteja na versão em Português (/pt/registrar), todas as mensagens de validação de formulário estão sendo exibidas em Inglês.

Impacto: Usuários que não dominam o inglês vão ter dificuldade em entender os bloqueios do sistema.

2. Validação Sequencial de Senha
Observação: O sistema valida os requisitos da senha um por um. O usuário só visualiza o erro de "falta número" após corrigir o erro de "falta letra maiúscula" por exemplo.

Sugestão: Fazer um checklist de requisitos que se atualiza em tempo real enquanto o usuário digita.

3. Feedback Visual do Botão "Entrar"
Observação: O botão fica desabilitado sem uma interação de bloqueio, sem nenhum aviso.

Impacto: O usuário pode ficar confuso, fazendo ele acreditar que o site está travado por exemplo.

4. Aceite de Caracteres Especiais no Nome
Observação: Os campos first_name e last_name permitem números e símbolos sem ter uma validação.

Impacto: Risco de gerar dados inconsistentes para análise de marketing e de banco de dados.

Como fazer para rodar o projeto:

Clone este repositório.

No terminal da pasta do projeto, instale as dependências com o seguinte código:

npm install

Abra o Cypress para execução dos testes com o próximo código:

npx cypress open

O codigo está dentro da pasta e2e, que está dentro da pasta cypress
