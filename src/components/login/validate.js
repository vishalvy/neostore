export default function validateRegister(email,password) {
    let errors = {}

    // Login Form Validation-------------------------------------------------------------------->

    //Email Validation
    if(email === ''){
        errors.email = "Please Enter Email "
    }
    else if(!/^(([^<>!@#$%&^*()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        errors.email = "Please Enter Correct Email Address"
    }

    //Password Validation
    if(password === ''){
        errors.password = "Please Enter Password"
    }
    else if(!/^(?=.*\d)(?=.*[a-z]).{4,14}$/.test(password)){
        errors.password = "Password should be Alphanumeric"
    }


    return errors;
}