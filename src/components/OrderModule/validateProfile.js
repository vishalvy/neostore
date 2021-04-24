export default function validateProfile(fname, lname, mobile, email) {
    let errors = {};



    if (fname === "") {
        errors.fname = "Please Enter Firstname";
    } else if (!/^.{1,12}$/s.test(fname)) {
        errors.fname = "Length should be less than 12 Alphabets";
    } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(fname)) {
        errors.fname = "First Name should be Alphabets only";
    }

    //Last Name Validation
    if (lname === "") {
        errors.lname = "Please Enter Laststname";
    } else if (!/^.{1,12}$/s.test(lname)) {
        errors.lname = "Length should be less than 12 Alphabets";
    } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(lname)) {
        errors.lname = "Last Name should be Alphabets only";
    }

    if(mobile === ''){
        errors.mobile = "Enter Mobile number"
    }
    else if(!/^.{10,10}$/s.test(mobile)){
        errors.mobile = "Mobile should be of 10 Digits"
    }
    else if(!/^[0-9]*$/.test(mobile)) {
        errors.mobile = "Mobile should be Numeric"
    }

    //Email Validation
    if (email === "") {
        errors.email = "Please Enter Email ";
    } else if(!/^(([^<>!@#$%&^*()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        errors.email = "Please Enter Correct Email Address";
    }

    return errors;
}
