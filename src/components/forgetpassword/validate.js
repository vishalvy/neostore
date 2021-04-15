export default function validateRegister(password,confirmpassword) {
    let errors = {}

    // Recover Password Form Validation-------------------------------------------------------------------->

    

    //Password Validation
    if(password === ''){
        errors.password = "Please Enter Password"
    }
    else if(password.length < 8 || password.length >12){
        errors.password = "Length should be 8 to 12 Characters"
    }
    else if(!/^(?=.*\d)(?=.*[a-z]).{4,14}$/.test(password)){
        errors.password = "Password should be Alphanumeric"
    }

    //Confirm Password Validation
    if(confirmpassword === ''){
        errors.confirmpassword = "Please Re-Enter Password"
    }
    else if(confirmpassword.length < 8 || confirmpassword.length >12){
        errors.confirmpassword = "Length should be 8 to 12 Characters"
    }
    else if(!/^(?=.*\d)(?=.*[a-z]).{4,14}$/.test(confirmpassword)){
        errors.confirmpassword = "Password should be Alphanumeric"
    }
    else if(password !== confirmpassword){
        alert("Password Mismatch")
    }

    


    return errors;
}