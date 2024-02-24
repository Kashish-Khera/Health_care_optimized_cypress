class Confirmation_page
{

    check_Confirmation_Message() {
        cy.get(".col-xs-12.text-center>h2").should("include.text", "Appointment Confirmation");
      }

      check_SelectedData(facility, readmission, program, visitDate, comment) {
        cy.get("#facility").should("include.text", facility);
        cy.get("#hospital_readmission").should("include.text", readmission);
        cy.get("#program").should("include.text", program);
        cy.get("#visit_date").should("include.text", visitDate);
        cy.get("#comment").should("include.text", comment);
      }

}

export default new Confirmation_page