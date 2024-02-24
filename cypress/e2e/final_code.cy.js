import LoginPage from "../PageObject/Loginpage";
import Confirmation_page from "../PageObject/Confirmation_page";

describe('A.  Login functionality', () => {

    beforeEach(() => {
        LoginPage.visit_Page()

    })

    it('1. Make Appointment button is present or not', () => {

        cy.get("#btn-make-appointment").should("be.visible")

        // check if it is clickable or not 
        LoginPage.click_Make_Appointment_Button()
    });

    it('2. Login Text Present', () => {
        LoginPage.click_Make_Appointment_Button()
        cy.get(".col-sm-12.text-center>h2").should("have.text", "Login")
    });


    it('3. Username and Password field is present', () => {

      
        LoginPage.click_Make_Appointment_Button()
       cy.fixture("Login_cred").then((users) =>{
        LoginPage.login_func(users.username, users.password)
      
    })
    });

    it('4. name and PW fields placeholders', () => {
        cy.get("#btn-make-appointment").click()
        cy.get('#txt-username').should('have.attr', "placeholder", "Username");
        cy.get('#txt-password').should('have.attr', "placeholder", "Password");
    });

    it('5. Extract the name and pw and type it in the field and login', () => {
        // extract the  "John doe" from the input tag / input field and then type it on the usernae field
        cy.get("#btn-make-appointment").click()
        cy.get("[aria-describedby= 'demo_username_label']").then(($username_value) => {
            let copiedName = $username_value.val()
            cy.get('#txt-username').type(copiedName)
        })

        // extract the  "ThisIsNotAPassword" from the input tag / input field and then type it on the password field

        cy.get("[aria-describedby='demo_password_label']").then(($pw_value) => {

            let copiedName = $pw_value.val()
            cy.get('#txt-password').type(copiedName)
        })

        // click on login button
        cy.get("#btn-login").click()
    });


});


describe('B. Make Appointment Page', () => {

    beforeEach(() => {

        // visit the page , click on make appointment button and login using the creds
       

        LoginPage.visit_Page()
        cy.fixture("Login_cred").then((users) =>{
            LoginPage.login_func(users.username, users.password)
          
        })

    })



    it('1. Make appointment Text is present', () => {

        cy.get(".col-sm-12.text-center > h2").should("have.text", "Make Appointment")
    });

    it('2. Check the placeholders for the fields ', () => {

        // DATE FIELD  and comment textarrea
        cy.get("#txt_visit_date").should("have.attr", "placeholder", "dd/mm/yyyy")
        cy.get("#txt_comment").should("have.attr", "placeholder", "Comment")

    });

    it('3.Facilty  dropdown present or not', () => {

        // initially show default value
        cy.get("#combo_facility").should("include.text", "Tokyo CURA Healthcare Center")

        // sleect the value from the drowdown 
        cy.get("#combo_facility").select("Seoul CURA Healthcare Center")

        // check if the selected value is displayed in the dropdown or not

        cy.get("#combo_facility").should("include.text", "Seoul CURA Healthcare Center")

    });

    it('4. Check if the multi selection is allowed or not ', () => {

        cy.get("#combo_facility").should("not.have.attr", "multiple")
    });


    it('5. check the checkbox label', () => {

        cy.get(".checkbox-inline").should("include.text", " Apply for hospital readmission")
    });


    it('6. check the checkbox ', () => {

        cy.get("#chk_hospotal_readmission").check()

        // check if it it is checked or not

        cy.get("#chk_hospotal_readmission").should("be.checked")
    });


    it('7. check Radiobuttons are visible', () => {

        cy.get("#radio_program_medicare").should("be.visible")
        cy.get("#radio_program_medicaid").should("be.visible")
        cy.get("#radio_program_none").should("be.visible")
    });

    it('8. Radiobutton selections', () => {

        // check if the second radiobutton is selected , then 1st and 3rd are not selected


        // 2nd selected and verifiy if it is slected or not
        cy.get("#radio_program_medicaid").check()
        cy.get("#radio_program_medicaid").should("be.checked")

        // other 2 are unchecked
        cy.get("#radio_program_none").should("not.be.checked")
        cy.get("#radio_program_medicare").should("not.be.checked")

    });


    it('9. Datepickeris displayed or not', () => {

        // upon clicking the field , datepicker is dislayed

        cy.get("#txt_visit_date").click()
        cy.get(".datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-bottom").should("be.visible")

        // upon clicking the icon

        cy.get(".glyphicon.glyphicon-calendar").click()
        cy.get(".datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-bottom").should("be.visible")

        // check if the current month and year is diasplayed or not 

        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").should("include.text", "November 2023")

    });

    it('10. Manually type the current date ', () => {


        /* 
        ${} (Template Literal):

                The backticks (``) are used to create a template literal in JavaScript. This allows you to embed expressions inside a string.
                currentDate.getDate() (Get Day of the Month):

                currentDate.getDate() is a method of the Date object in JavaScript. It returns the day of the month (from 1 to 31) for the specified date.
                / (Slash):

                This is a simple forward slash used as a separator in the string.
                currentDate.getMonth() + 1 (Get Month):

                currentDate.getMonth() is another method of the Date object. It returns the month for the specified date, where January is 0 and December is 11.
                Adding + 1 is necessary because months in JavaScript are zero-based. So, adding 1 adjusts the month value to be in the range of 1 to 12 (January to December).
                / (Slash):

                Another separator in the string.
                currentDate.getFullYear() (Get Year):

                currentDate.getFullYear() is yet another method of the Date object. It returns the year for the specified date with four digits.
                Putting it all together:

                ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} creates a string representing the formatted date in the "dd/mm/yyyy" format.
        
        */

        // type current date (explanation obove)

        const today_date = new Date();
        cy.log(today_date);

        const formatted_date = `${today_date.getDate()}/${today_date.getMonth() + 1}/${today_date.getFullYear()}`
        const current_date = `${today_date.getDate()}`
        const current_year = `${today_date.getFullYear()}`

        // converted the monthnumber to monthname 
        const currentMonthName = today_date.toLocaleString('en-US', { month: 'long' });


        // toLocaleString('en-US', { month: 'long' }) uses the toLocaleString method to format the date according to the specified locale ('en-US' for English in the United States).
        // { month: 'long' } is an options object that specifies the formatting options. In this case, it specifies that we want the full month name.

        cy.get("#txt_visit_date").type(formatted_date)

        // check if the date is visible or not on the field 
        cy.get("#txt_visit_date").should("have.value", formatted_date)

        // check if the date is blue highlighted in the datepicker 

        cy.get(".active.day").should("include.text", current_date)

        // check the month name and year 

        // concatenated the monthname and year 
        const month_year = `${currentMonthName} ${current_year}`
        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").should("include.text", month_year)


    });


    it('11. Manually type the some date and check if it is blue highlighted in datepicker', () => {

        // type current date 

        const random_date = "16/01/2008"
        cy.get("#txt_visit_date").type(random_date)
        cy.get("#txt_visit_date").should("have.value", random_date)

        // check if this ate is visible in the calender or not with blue color
        cy.get(".active.day").should("include.text", 16)

        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").should("include.text", "January 2008")



    });


    it('12. Geanrate random date and typwe it  Manually in the date field ', () => {

        // Generate a random day, month, and year
        const randomDay = Math.floor(Math.random() * 28) + 1; // Assuming 28 days in a month for simplicity
        const randomMonth = Math.floor(Math.random() * 12) + 1; // Months are 1-12
        const randomYear = Math.floor(Math.random() * (2023 - 2000 + 1)) + 2000; // Assuming years between 2000 and 2023

        // Helper function to zero-pad a number
        const zeroPad = (num) => (num < 10 ? `0${num}` : num);

        // Format the date components to "dd/mm/yyyy"
        const formattedDate = `${zeroPad(randomDay)}/${zeroPad(randomMonth)}/${randomYear}`;

        cy.get("#txt_visit_date").type(formattedDate);
        cy.get("#txt_visit_date").should("have.value", formattedDate);

        // Convert the formatted string to a Date object
        // The toLocaleString method is typically applied to a Date object, but in your code, you are applying it to a string (formattedDate). Instead, you should create a Date object from the formatted string and then use toLocaleString. 

        const dateObject = new Date(`${randomYear}-${zeroPad(randomMonth)}-${zeroPad(randomDay)}`);

        const currentMonthName = dateObject.toLocaleString('en-US', { month: 'long' });

        const month_year = `${currentMonthName} ${randomYear}`;

        // verify the  month name and year displayed on the datepicker
        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").should("include.text", month_year);

        // verify the date highlighted in the datepicker
        cy.get(".active.day").should("include.text", randomDay)

    });


    it('13. select the date using the arrows in Datepicker', () => {
        cy.get("#txt_visit_date").click()

        // const year_want_to_select = 2022
        const year_want_to_select = 2025
        const month_want_to_select = "March";
        const date_want_to_select = 15;

        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").click()

        // after clicking it shpwsthe current year selected 
        let month_year_extracted;
        let extractedYear;
        let extractedMonth;

        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").then(($month_year) => {

            month_year_extracted = $month_year.text()
            cy.log(month_year_extracted + " is extracted ")
            // Split the string by space and take the first part
            extractedMonth = month_year_extracted.split(' ')[0];

            // Split the string by space and take the second part
            extractedYear = month_year_extracted.split(' ')[1];

            cy.log(extractedYear + " Yaer is extracted from the data");
            cy.log(extractedMonth + " Month is extracted from the data");


            while (year_want_to_select < extractedYear) {


                // using the prev arrow in the datpicker , move backwords in calender
                cy.get('.datepicker-months > .table-condensed > thead > :nth-child(2) > .prev').click();

                // Wait for the calendar to update
                cy.wait(1000); // Adjust the wait time as needed

                // Update the extracted year after each click
                extractedYear = cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").invoke('text');

            }

            while (year_want_to_select > extractedYear) {

                cy.get('.datepicker-months > .table-condensed > thead > :nth-child(2) > .next').click();

                // Wait for the calendar to update
                cy.wait(1000); // Adjust the wait time as needed

                // Update the extracted year after each click
                extractedYear = cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").invoke('text');
            }


            cy.contains(month_want_to_select.substring(0, 3)).click(); // Click on the abbreviated month name

            cy.log(`${month_want_to_select} ${year_want_to_select} needs to be selected in the datepicker`);

        })


        /*
              The `td.day:not(.old):not(.new)` selector is a CSS selector used in the context of a datepicker to identify and target specific elements representing days within the calendar. Let's break down each part of the selector:

            - **`td`**: Selects all HTML elements of type `<td>` (table cell). In the context of a calendar, each day is often represented by a table cell.

            - **`.day`**: Selects elements with the class `day`. This class is often used to mark the cells that represent days in a datepicker.

            - **`:not(.old)` and `:not(.new)`**: Excludes elements with the class `old` and `new`. In many datepickers, past days might have the class `old`, and future days might have the class `new`. The `:not()` pseudo-class is used to exclude elements with these classes.

            So, putting it all together, `td.day:not(.old):not(.new)` selects all table cells with the class `day` that are not marked as "old" or "new" (typically representing past or future days).

            This selector is just an example, and the actual structure and classes used in your datepicker might be different. You should inspect the HTML structure of your datepicker and adjust the selector accordingly to match the specific structure and classes used in your application.
     
            */

        // Click on the specific day
        cy.get("td.day:not(.old):not(.new)").contains(date_want_to_select).click();


        // check if the date sleecte dis visible on thr field or not 


        // convert the monthname to monthnumber 

        const monthNumber = new Date(`${month_want_to_select} 01 2000`).toLocaleDateString('en', { month: '2-digit' });
        cy.log(month_want_to_select + " ---- " + monthNumber)

        const new_date = `${date_want_to_select}/${monthNumber}/${year_want_to_select}`

        cy.get("#txt_visit_date").should("have.value", new_date)


    });


    it('14. TextArea / Comment section', () => {

        // check if the textarae is visible or not
        cy.get("#txt_comment").should("be.visible")

        // check the placeholders 
        cy.get("#txt_comment").should("have.attr", "placeholder", "Comment")

        // type soomething in the textarea  and check if it is visible or not
        cy.get("#txt_comment").type("This is a test message")
        cy.get("#txt_comment").should("have.value", "This is a test message")

        // clear the textarea 
        cy.get("#txt_comment").clear()

        // check if it is cleared or not 
        cy.get("#txt_comment").should('have.value', '');


        // check if textarea have scroller or not, incase of long text

        cy.get("#txt_comment").type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non maximus quam. Maecenas molestie blandit magna, in suscipit leo dictum eu. Proin volutpat lectus id viverra pharetra. Suspendisse aliquam nibh in lectus tristique ornare. Donec eu ultricies lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis sapien et justo interdum condimentum eu elementum justo. Etiam sed ante quis urna lacinia tincidunt ac vel lacus. Vestibulum rhoncus lacus tincidunt, elementum turpis vitae, lobortis urna. Pellentesque ac faucibus arcu. Sed lacinia neque id nisi sollicitudin, a dignissim augue blandit. Duis placerat consectetur pellentesque. Mauris quis massa et risus blandit lacinia. Suspendisse non consectetur sapien.Nulla placerat pellentesque ligula at dignissim.Nulla sed sollicitudin neque.Fusce cursus hendrerit felis, sed fermentum metus vestibulum in.Proin euismod elit libero, vel aliquet urna dictum a.Donec purus nibh, pretium sit amet iaculis mattis, tempus ut mauris.In volutpat, tellus nec euismod dictum, lorem nulla feugiat purus, sed imperdiet augue augue vel lorem.Nulla non nisi sit amet dolor aliquam sodales eget id risus.Curabitur eget congue lectus, ac faucibus erat.Sed consectetur diam feugiat porta malesuada.Duis lacus lacus, pellentesque quis lacinia vel, commodo tempus nunc.Mauris ut risus mollis risus pulvinar dapibus a sed mauris.Maecenas mollis velit id ipsum facilisis ultricies.In hac habitasse platea dictumst.Nunc fermentum lectus lacus, sed porta eros auctor in.Nunc vulputate nisl ac lectus fermentum, a cursus turpis scelerisque.Cras a augue non neque suscipit fermentum.Morbi sed lectus at neque luctus hendrerit sed eu lacus.Donec at tristique odio.Nullam et lectus non tellus congue eleifend.Fusce condimentum arcu a metus tincidunt luctus.Integer dolor dolor, bibendum ut porta a, ornare vel lacus.Praesent tempor, ligula ut venenatis dignissim, risus magna dapibus mauris, mollis placerat metus ligula et purus.Morbi ornare nulla non malesuada consectetur.Suspendisse tortor justo, placerat in leo ut, mattis consequat felis.Aenean rutrum, nulla vitae varius aliquam, leo ex convallis est,")
        cy.get('#txt_comment').should('have.css', 'height', 'auto');

        cy.get("#txt_comment").clear()

        // click on Book Appoinment button 
        cy.get("#btn-book-appointment").click()


    });

});


describe('C. Appoinment Confirmation page', () => {

    beforeEach(() => {

        // login 
        LoginPage.visit_Page()
        cy.fixture("Login_cred").then((users) =>{
            LoginPage.login_func(users.username, users.password)
          
        })

    })



    it('1. Check the Confirmation message is displayed ', () => {



        // add the required details in the field 

        cy.get("#chk_hospotal_readmission").check()
        cy.get("#txt_visit_date").type("16/01/2008")
        cy.get("#btn-book-appointment").click()
        cy.get(".col-xs-12.text-center>h2").should("include.text", "Appointment Confirmation")
        cy.get("#visit_date").should("include.text", "16/01/2008")

                Confirmation_page.check_Confirmation_Message()

    });

    it('2. show data acc. to the data selected ', () => {


        // add the required details in the field 
        cy.get("#combo_facility").select("Seoul CURA Healthcare Center")
        cy.get("#chk_hospotal_readmission").check()
        cy.get("#radio_program_medicaid").check()
        cy.get("#txt_visit_date").type("01/01/2008")

        // Handling a scenario where a datepicker remains open after manually typing a date in Cypress might involve a combination of focusing on other elements or triggering specific actions to close the datepicker. 
        // The approach can vary depending on the specific implementation of the datepicker in your application.

        cy.get('body').click();
        cy.get(".datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-bottom").should('not.exist');

        cy.get("#txt_comment").type("This is a test message")

        // click on Book Appoinment button 
        cy.get("#btn-book-appointment").click()

        // check these on the cnfirmation page 
        // cy.get("#facility").should("include.text", "Seoul CURA Healthcare Center")
        // cy.get("#hospital_readmission").should("include.text", "Yes")
        // cy.get("#program").should("include.text", "Medicaid")
        // cy.get("#visit_date").should("include.text", "01/01/2008")
        // cy.get("#comment").should("include.text", "This is a test message")

        Confirmation_page.check_SelectedData("Seoul CURA Healthcare Center","Yes" , "Medicaid" ,"01/01/2008" , "This is a test message" )

        // click on Homepage button 
        cy.get(".btn.btn-default").click()

        // check the redirection to homepage
        cy.get(".col-sm-12.text-center > h2").should("have.text", "Make Appointment")

    });


});


