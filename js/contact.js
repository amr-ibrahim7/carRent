document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // get all elements from the html
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const number = document.getElementById('number');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // sure that all values is empty at first 
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const numberValue = number.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();

    // Hide all error messages first
    document.getElementById('nameError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('numberError').style.display = 'none';
    document.getElementById('subjectError').style.display = 'none';
    document.getElementById('messageError').style.display = 'none';

    // Name validation
    if (nameValue === "" || !isNaN(nameValue))
    {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    // Email validation
    if (!isValidEmail(emailValue))
    {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Number validation (at least 11 digits)
    const digitsOnly = numberValue.replace(/\D/g, '');
    if (digitsOnly.length < 11)
    {
        document.getElementById('numberError').style.display = 'block';
        isValid = false;
    }

    // Subject validation
    if (subjectValue === "")
    {
        document.getElementById('subjectError').style.display = 'block';
        isValid = false;
    }

    // Message validation
    if (messageValue === "")
    {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    // sure that the data is valid if valid drop alert
    if (isValid) {
        alert('Form submitted successfully!');
        clearFormInputs();
    }
});

// function used in email validation
function isValidEmail(email)
{
    if (email === "") return false;
    var atPosition = email.indexOf("@");
    var dotPosition = email.lastIndexOf(".");
    return !(atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= email.length);
}

// function to cleat all inputs after the data is sent
function clearFormInputs()
{
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('number').value = "";
    document.getElementById('subject').value = "";
    document.getElementById('message').value = "";
}