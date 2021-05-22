// To run each spec : node_modules/.bin/cypress run cypress/integration/examples/BDD/ecommerce.feature --headed --browser chrome
// To run to specific tags only: npx cypress-tags run -e TAGS="@Smoke" --headed --browser chrome
import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import PageObjects from '../../../pageObjects/ProtoCommerce';

const pageObjects = new PageObjects();

Given('I opened web page', function () {
    cy.visit(Cypress.env("url") + "/angularpractice/"); // Environment variable
})

When('I added products to cart', function () {
    // Click on shop navigation
    pageObjects.getShopTab().click();

    this.data.productName.forEach(product => {
        cy.selectProduct(product);
    })

    pageObjects.getCheckoutButton().click();
})

And('Validate the total price', function () {
    let sum = 0;
    cy.get("tr td:nth-child(4) strong").each(($el, index, $list) => {
        let price = $el.text().split(".")[1].trim();
        sum += Number(price);
    }).then(function () {
        cy.log(sum)
    })

    //Compare final checkout price with total price we calculated
    cy.get("h3 strong").then(function (element) {
        const amount = element.text();
        const res = amount.split(" ")
        const total = Number(res[1].trim());
        expect(total).to.be.equals(sum);
    })
})

Then('Select the country submit and then verify thank you message', function () {
    cy.contains("Checkout").click();
    cy.get("#country").type("India");
    cy.get('.suggestions > ul > li > a').click();
    cy.get("#checkbox2").click({ force: true }); //overlaping
    cy.get("input[value='Purchase']").click();
    //cy.get('.alert').should("have.text", "Thank you! Your order will be delivered in next few weeks :-).")
    cy.get('.alert').then($el => {
        const alertText = $el.text();
        expect(alertText.includes("Thank you! Your order will be delivered in next few weeks")).to.be.true;
    })
});

When('I fill the form details', function () {
    pageObjects.getNameInputBox().type(this.data.name);
    pageObjects.getGender().select(this.data.gender);
})

Then('Validate the form behaviour', function () {
    pageObjects.getNameInputBox().should("have.attr", 'minlength', '2');
    pageObjects.getEnterpreneur().should("be.disabled");
})

And('Select the shop page', function () {
    pageObjects.getShopTab().click();
})