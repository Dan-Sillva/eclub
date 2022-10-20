/// <reference types="cypress" />

const valid = Cypress.env('valid_login')
const invalid = Cypress.env('invalid_login')

describe('Validar login', () => {
  beforeEach(() => {
    cy.visit('https://eclub.buildbox.one')
  
    cy.intercept('POST', '**/manager/recover-password').as('recoverPass')
    cy.intercept('POST', '**/auth/panel').as('authLogin')
  });
  
  it('login valido e acesso a home', () => {
    cy.get('.email').type(valid.email)
    cy.get('.password').type(valid.password)
    cy.get('.sc-fEXmlR').click()

    cy.url().should('contain', '/users')

    cy.wait('@authLogin')
    .its('response.statusCode').should('eq', 201)
  });

  it('login invalido', () => {
    cy.get('.email').type(invalid.email)
    cy.get('.password').type(invalid.password)
    cy.get('.sc-fEXmlR').click()
    
    cy.get('.Toastify__toast-container').should('be.visible')

    cy.wait('@authLogin')
    .its('response.statusCode').should('eq', 420)
  });

  it('esqueci minha senha - acesso valido', () => {
    cy.get('a[href="/recover"]').click()
    cy.get('.email').type(valid.email)
    cy.get('.sc-fEXmlR').click()

    cy.get('.Toastify__toast--success').should('be.visible')

    cy.wait('@recoverPass')
    .its('response.statusCode').should('eq', 204)
  });

  it('esqueci minha senha - acesso invalido', () => {
    cy.get('a[href="/recover"]').click()
    cy.get('.email').type('teste@casdfasdf.com')
    cy.get('.sc-fEXmlR').click()

    cy.get('.Toastify__toast--error').should('be.visible')

    cy.wait('@recoverPass')
    .its('response.statusCode').should('eq', 404)
  });
})
