Feature: End to end ecommerce validation

    Application Regression

    @Regression
    Scenario: Ecommerce products delivery
    Given I opened web page
    When I added products to cart
    And Validate the total price
    Then Select the country submit and then verify thank you message

    @Smoke
    Scenario: Filling the form to shop
    Given I opened web page
    When I fill the form details
    Then Validate the form behaviour
    And Select the shop page