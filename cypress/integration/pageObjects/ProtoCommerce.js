class ProtoCommerce {
    getNameInputBox(){
        return cy.get("input[name='name']:nth-child(2)")
    }

    getGender(){
        return cy.get("select")
    }

    getEnterpreneur(){
        return  cy.get('#inlineRadio3');
    }

    getShopTab(){
        return cy.get(':nth-child(2) > .nav-link');
    }

    getCheckoutButton(){
        return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link');
    }

}
export default ProtoCommerce;