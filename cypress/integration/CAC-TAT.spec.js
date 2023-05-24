//<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        
        cy.title() .should('be.equal', 'Central de Atendimento ao Cliente TAT')
      })
    it('preenche os campos obrigatórios e envia o formulário', function() {

        const LongText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Veronica')
        cy.get('#lastName').type('Negreiro')
        cy.get('#email').type('vnsilva@paschoalotto.com.br')
        cy.get('#open-text-area').type(LongText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Veronica')
        cy.get('#lastName').type('Negreiro')
        cy.get('#email').type('vnsilva@paschoalotto,com.br')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo de telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Veronica')
        cy.get('#lastName').type('Negreiro')
        cy.get('#email').type('vnsilva@paschoalotto.com.br')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').click()
       
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        cy.get('#firstName').type('Veronica')
        .should('have.value', 'Veronica')
        .clear()
        .should('have.value','')
        cy.get('#lastName').type('Negreiro')
        .should('have.value', 'Negreiro')
        .clear()
        .should('have.value','')
        cy.get('#email').type('vsnsilva@paschoalotto.com.br')
        .should('have.value', 'vsnsilva@paschoalotto.com.br')
        .clear()
        .should('have.value','')
        cy.get('#phone').type(14991812213)
        .should('have.value', 14991812213)
        .clear()
        .should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu texto', function(){
        cy.get('#product')
        .select('Mentoria')
        .should('have.value', 'mentoria')
    })


    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get(':nth-child(4) > input')
        .check()
        .should('have.value', 'feedback')
    })

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

    cy.contains('Talking About Testing').should('be.visible')

 }) 


})
