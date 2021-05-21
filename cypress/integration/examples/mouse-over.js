/// <reference types="Cypress" />
describe('Testing the table', function() 
{
 
  it('My FirstTest case',function() {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    //cy.get("div.mouse-hover-content").invoke("show");
    cy.contains("Top").click({ force: true});
    cy.url().should("include",'top');

    cy.get("#opentab").then(function(el){
        const url = el.prop("href");
        cy.visit(url);
    })
  })

})