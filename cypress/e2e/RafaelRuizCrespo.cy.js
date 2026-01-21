describe('Desafio QA Blocks - Cadastro Completo e Validações', () => {

  const senhaValida = 'Blocks@2024';
  
  const preencherFormularioBase = () => {
    cy.get('#first_name').type('QA', { force: true });
    cy.get('#last_name').type('Tester', { force: true });
    
    cy.get('input[placeholder="Escolha o país"]').click({ force: true });
    cy.contains('button', 'Brazil', { timeout: 10000 })
      .scrollIntoView()
      .click({ force: true });

    cy.contains('button', 'Idioma da Família').click({ force: true });
    cy.contains('button', 'Famílias em Português').click({ force: true });

    cy.contains('span', 'Eng. Civil').closest('div').find('button').click({ force: true });

    cy.contains('span', 'Como você ficou sabendo sobre a Blocks?').click({ force: true });
    cy.contains('button', 'Google').click({ force: true });
  };

  beforeEach(() => {
    cy.viewport(1280, 1000);
    cy.visit('https://www.blocksrvt.com/pt/registrar');
    
    cy.contains('button', 'Permitir todos', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true });
    
    cy.wait(2000); 
  });

  it('Cenário 1: Cadastro com sucesso', () => {
    preencherFormularioBase();
    cy.get('#email').type(`sucesso.${Date.now()}@teste.com`, { force: true });
    cy.get('#password').scrollIntoView().type(senhaValida, { force: true });
    cy.get('#confirm_password').scrollIntoView().type(senhaValida, { force: true });
    
    cy.contains('span', 'Eu aceito').closest('div').find('button').click({ force: true });

    cy.contains('button', 'Entrar', { timeout: 30000 })
      .should('not.have.attr', 'disabled');

    cy.contains('button', 'Entrar')
      .should('not.have.class', 'pointer-events-none')
      .click({ force: true });
    
    cy.url({ timeout: 20000 }).should('not.include', '/registrar');
  });

  it('Cenário 2: Email inválido', () => {
    preencherFormularioBase();
    cy.get('#email').type('email_invalido.com', { force: true }); 
    cy.get('#password').scrollIntoView().type(senhaValida, { force: true });
    cy.get('#confirm_password').scrollIntoView().type(senhaValida, { force: true });
    
    cy.contains('span', 'Eu aceito').closest('div').find('button').click({ force: true });

    cy.contains('span', 'Entrar').closest('button').should('be.disabled');
  });

  it('Cenário 3: Senhas diferentes', () => {
    preencherFormularioBase();
    cy.get('#email').type(`teste.${Date.now()}@teste.com`, { force: true });
    cy.get('#password').scrollIntoView().type(senhaValida, { force: true });
    cy.get('#confirm_password').scrollIntoView().type('SenhaErrada123', { force: true });
    
    cy.contains('span', 'Eu aceito').closest('div').find('button').click({ force: true });

    cy.contains('span', 'Entrar').closest('button').should('be.disabled');
  });

  it('Cenário 4: Termos de uso não aceitos', () => {
    preencherFormularioBase();
    cy.get('#email').type(`teste.${Date.now()}@teste.com`, { force: true });
    cy.get('#password').scrollIntoView().type(senhaValida, { force: true });
    cy.get('#confirm_password').scrollIntoView().type(senhaValida, { force: true });
    
    cy.contains('span', 'Entrar').closest('button').should('be.disabled');
  });

  it('Cenário 5: Senha fraca', () => {
    preencherFormularioBase();
    cy.get('#email').type(`teste.${Date.now()}@teste.com`, { force: true });
    cy.get('#password').scrollIntoView().type('123', { force: true });
    cy.get('#confirm_password').scrollIntoView().type('123', { force: true });
    
    cy.contains('span', 'Eu aceito').closest('div').find('button').click({ force: true });

    cy.contains('span', 'Entrar').closest('button').should('be.disabled');
  });

  it('Cenário 6: Estado inicial do botão de envio', () => {
    cy.contains('span', 'Entrar')
      .closest('button')
      .should('be.disabled');
  });

  it('Cenário 7: Validação de campo obrigatório após interação', () => {
    cy.get('#first_name').focus().blur();
    cy.contains('span', 'Entrar')
      .closest('button')
      .should('be.disabled');
  });

});