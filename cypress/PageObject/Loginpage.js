class LoginPage {

    visit_Page() {
        cy.visit("https://katalon-demo-cura.herokuapp.com/");
    }

    click_Make_Appointment_Button() {
        cy.get("#btn-make-appointment").click();
    }

    login_func(username, password) {
        this.click_Make_Appointment_Button()
        cy.get('#txt-username').type(username);
        cy.get('#txt-password').type(password);
        cy.get("#btn-login").click();
    }
}

export default new LoginPage