/// <reference types="Cypress" />
import PageObjects from '../pageObjects/ProtoCommerce';
describe('My Second Test Suite', function() 
{
    before(function(){
        cy.fixture("example").then(function(data){
            this.data = data;
        })
    })
 
  it('My FirstTest case',function() {
    
    Cypress.config("defaultCommandTimeout", 8000);

    const pageObjects = new PageObjects();

    cy.visit(Cypress.env("url") + "/angularpractice/"); // Environment variable
    pageObjects.getNameInputBox().type(this.data.name);
    pageObjects.getGender().select(this.data.gender);
    pageObjects.getNameInputBox().should("have.attr", 'minlength', '2');
    pageObjects.getEnterpreneur().should("be.disabled");

    // Click on shop navigation
    pageObjects.getShopTab().click();

    //cy.pause();

    this.data.productName.forEach(product => {
      cy.selectProduct(product);
    })
    
    pageObjects.getCheckoutButton().click();

    // Calculate all selected product total price
    let sum =0;
    cy.get("tr td:nth-child(4) strong").each(($el, index, $list) => {
      let price = $el.text().split(".")[1].trim();
      sum += Number(price);
    }).then(function(){
      cy.log(sum)
    })
    
    //Compare final checkout price with total price we calculated
    cy.get("h3 strong").then(function(element){
      const amount = element.text();
      const res = amount.split(" ")
      const total = Number(res[1].trim());
      expect(total).to.be.equals(sum);
    })

    cy.contains("Checkout").click();
    cy.get("#country").type("India");
    cy.get('.suggestions > ul > li > a').click();
    cy.get("#checkbox2").click({force: true}); //overlaping
    cy.get("input[value='Purchase']").click();
    //cy.get('.alert').should("have.text", "Thank you! Your order will be delivered in next few weeks :-).")
    cy.get('.alert').then($el => {
      const alertText = $el.text();
      expect(alertText.includes("Thank you! Your order will be delivered in next few weeks")).to.be.true;
    })
  })

})