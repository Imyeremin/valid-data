document.getElementById("exampleForm").onsubmit = (event) => {
    event.preventDefault();

    const data = getFormData();
    const isValid = validateData(data);

    if (isValid) {
        alert("OK");
    }
}

const getFormData = () => {
    return {
        email: document.getElementById("exampleInputEmail1").value,
        password: document.getElementById("exampleInputPassword1").value,
        isChecked: document.getElementById("exampleCheck1").checked,
    };
}

const displayValidationErrors = (dataName, errorList) => {
    for (const e of errorList) {
        const el = document.querySelector(`[data-${dataName}="${e}"]`);
        el.classList.add("d-block");
    }
}

const clearValidationErrors = () => {
    const elems = document.querySelectorAll(`#exampleForm .invalid-feedback`);
    for (const el of elems) {
        el.classList.remove("d-block");
    }
}

const validateData = (data) => {
    let result = true;
    clearValidationErrors();

    const emailResult = validateEmail(data.email)
    if (emailResult.isValid === false) {
        displayValidationErrors("email", emailResult.messanges);
        result = false;
    }

    const passwordResult = validatePassword(data.password)
    if (passwordResult.isValid === false) {
        displayValidationErrors("password", passwordResult.messanges);
        result = false;
    }

    const checkResult = validateCheckbox(data.isChecked)
    if (checkResult.isValid === false) {
        displayValidationErrors("check", checkResult.messanges);
        result = false;
    }

    return result;
}

const validateEmail = (emailValue) => {
    const result = {
        isValid: true,
        messanges: [],
       }

    if (!emailValue || emailValue.length < 5) {
        result.messanges.push("invalid");
    }

    if (/^[a-z0-9\-\_\@\.]+$/i.test(emailValue) === false) {
        result.messanges.push("invalid-symbols");
    }

    if (/^[\w-]+@[\w-]+\.[a-z]+$/i.test(emailValue) === false) {
        result.messanges.push("invalid-format");
    }

    result.isValid = result.messanges.length === 0;

    return result;
}

const validatePassword = (passwordValue) => {
    const result = {
        isValid: true,
        messanges: [],
    }

    if (!passwordValue || passwordValue.length < 8) {
        result.messanges.push("invalid-short");
    }

    if (/\d+/.test(passwordValue) === false) {
        result.messanges.push("invalid-need-number");
    }

    if (/[a-z]+/.test(passwordValue) === false) {
        result.messanges.push("invalid-need-letter");
    }

    if (/[A-Z]+/.test(passwordValue) === false) {
        result.messanges.push("invalid-need-bigletter");
    }

    if (/[!@#$%^&*()_+]+/.test(passwordValue) === false) {
        result.messanges.push("invalid-need-symbol");
    }

    result.isValid = result.messanges.length === 0;

    return result;
}

const validateCheckbox = (checkboxValue) => {
    const result = {
        isValid: true,
        messanges: [],
    }

    if (checkboxValue === false) {
        result.messanges.push("invalid");
    }

    result.isValid = result.messanges.length === 0;

    return result;
}
