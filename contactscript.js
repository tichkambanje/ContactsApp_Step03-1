// Array that will store the contact data
let contacts = [];


// Function to load and display contacts
async function displayContacts() {

    try {

        // Fetch the JSON data
        const response = await fetch("contacts.json");

        // Parse the JSON data into a JavaScript object
        const data = await response.json();

        // Store the contacts in the contacts array
        contacts = data.contacts;

        // Display the contacts in the table
        updateContactTable();

    } catch (error) {

        console.error("Error loading contacts:", error);

    }
}


// Function to update the HTML table
function updateContactTable() {

    // Find the table body
    const contactList = document.getElementById("contactList");

    // Clear the existing table rows
    contactList.innerHTML = "";

    // Loop through the contacts
    contacts.forEach(function (contact) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phoneNumber}</td>
        `;

        contactList.appendChild(row);

    });
}


// Function to add a new contact
function addContact(event) {

    // Prevent the form from refreshing the page
    event.preventDefault();

    // Get and clean the values entered in the form
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();

    // Get the error message elements
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");

    // Clear previous error messages
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";

    let isValid = true;


    // Validate name
    if (name === "") {

        nameError.textContent = "Please enter the contact's name.";
        isValid = false;

    }


    // Validate email
    if (email === "") {

        emailError.textContent = "Please enter an email address in the format.";
        isValid = false;

    } else {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            emailError.textContent =
                "Please enter a valid email address, for example name@example.com.";

            isValid = false;
        }
    }


    // Validate phone number
    if (phoneNumber === "") {

        phoneError.textContent = "Please enter a phone number.";
        isValid = false;

    } else {

        const phonePattern = /^\+?[0-9]{10,15}$/;

        if (!phonePattern.test(phoneNumber)) {

            phoneError.textContent =
                "Please enter a valid phone number in the format (CountryCode Number), Example +263 123123123.";

            isValid = false;
        }
    }


    // Stop if any validation failed
    if (!isValid) {
        return;
    }


    // Create a new contact object
    const newContact = {
        name: name,
        email: email,
        phoneNumber: phoneNumber
    };


    // Add the new contact
    contacts.push(newContact);


    // Update the HTML table
    updateContactTable();


    // Clear the form
    document.getElementById("contactForm").reset();
}
// Listen for the form submission
document.getElementById("contactForm").addEventListener("submit", addContact);


// Load the original contacts when the page opens
displayContacts();