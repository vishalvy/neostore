export default function validatePassword(oldPass,newPassword,confirmPassword) {
    let errors = {}

    // Change Password Form Validation-------------------------------------------------------------------->

    //Old Password Validation
    if(oldPass === ''){
        errors.oldPass = "Please Enter Password"
    }
    else if(!/^.{8,12}$/s.test(oldPass)){
        errors.oldPass = "Length should be 8 to 12 Characters"
    }
    else if(!/^(?=.*\d)(?=.*[a-z]).{4,14}$/.test(oldPass)){
        errors.oldPass = "Password should be Alphanumeric"
    }

    //Password Validation
    if(newPassword === ''){
        errors.newPassword = "Please Enter Password"
    }
    else if(!/^.{8,12}$/s.test(newPassword)){
        errors.newPassword = "Length should be 8 to 12 Characters"
    }
    else if(!/^(?=.*\d)(?=.*[a-z]).{4,14}$/.test(newPassword)){
        errors.newPassword = "Password should be Alphanumeric"
    }

    //Confirm Password Validation
    if(confirmPassword === ''){
        errors.confirmPassword = "Please Re-Enter Password"
    }
    else if(!/^.{8,12}$/s.test(confirmPassword)){
        errors.confirmPassword = "Length should be 8 to 12 Characters"
    }
    else if(!/^(?=.*\d)(?=.*[a-z]).{4,14}$/.test(confirmPassword)){
        errors.confirmPassword = "Password should be Alphanumeric"
    }
    else if(newPassword !== confirmPassword){
        errors.confirmPassword = "Password Mismatch"
    }

    


    return errors;
}