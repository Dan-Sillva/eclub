/// <reference types="cypress" />

const valid = Cypress.env('valid_login')
const invalid = Cypress.env('invalid_login')

const presenterSelectPath = '.sc-cabOPr > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select'
const data = '#demo-simple-select-autowidth'

function openDropdownAndSelect(rootdiv, index) {
    cy.get(rootdiv).click()

    Array.isArray(index) ?
    index.forEach(block => {
        cy.get('.MuiList-root > li').eq(`${block}`).click()
    }) :
    cy.get('.MuiList-root > li').eq(`${index}`).click()

    cy.get('body').click(0,0)
}

describe('Validar tela de programa', () => {
    beforeEach('', () => {
        cy.visit('https://eclub.buildbox.one')
        
        cy.get('.email').type(valid.email)
        cy.get('.password').type(valid.password)
        cy.get('.sc-fEXmlR').click()

        cy.get('.sc-pyfCe > .menu-wrapper').click()
        cy.get('a[href="/programs"]').click()
    });

    it('Criação de novo programa sem upload de imagem ', () => {
        cy.get('.sc-fEXmlR').click()
        cy.get('.program-name').type('Novo programa')

        openDropdownAndSelect('.cVdCvb', 0)
        openDropdownAndSelect('.kBfIWx', 0)

        let v = 2000
        cy.get('input[placeholder="Horário"]').should('have.length', 2).each(input => {
            cy.wrap(input).type(v)
            v += 40
        })

        // cy.contains('Salvar alterações').click()

    });

    it.only('Criação de novo programa com mais de um apresentador', () => {
        cy.get('.sc-fEXmlR').click()
        cy.get('.program-name').type('Novo programa')

        cy.get('.jxLfMG > label').selectFile('midia/image.jpg')

        openDropdownAndSelect('.cVdCvb', [0, 1])
        openDropdownAndSelect('.kBfIWx', 0)

        let v = 2000
        cy.get('input[placeholder="Horário"]').should('have.length', 2).each(input => {
            cy.wrap(input).type(v)
            v += 40
        })

       // cy.contains('Salvar alterações').click()

    }); 

    it('Criação de novo programa com upload de imagem', () => {
        cy.get('.sc-fEXmlR').click()
        cy.get('.program-name').type('Novo programa')

        cy.get('.jxLfMG > label').selectFile('midia/image.jpg')

        openDropdownAndSelect('.cVdCvb', 0)
        openDropdownAndSelect('.kBfIWx', 0)

        let v = 2000
        cy.get('input[placeholder="Horário"]').should('have.length', 2).each(input => {
            cy.wrap(input).type(v)
            v += 40
        })

        cy.contains('Salvar alterações').click()

    }); 
    
    context('Edição de programa existente', () => {

    });
    
    it('Exclusão de programa', () => {
        
    });
});