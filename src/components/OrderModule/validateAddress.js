export default function validateAddress(addressLine,pincode,city,state,country) {
    let errors = {}

    // Address Form Validation-------------------------------------------------------------------->

    //addressLine Validation
    if(addressLine === ''){
        errors.addressLine = "Enter Address"
    }

    //Pincode Validation
    if(pincode === ''){
        errors.pincode = "Enter Pincode"
    }
    else if(!/^.{6,6}$/s.test(pincode)){
        errors.pincode = "Pincode should be of 6 Digits"
    }
    else if(!/^[0-9]*$/.test(pincode)) {
        errors.pincode = "Pincode should be Numeric"
    }

    //City Validation
    if(city === ''){
        errors.city = "Enter City Name"
    }
    if(state === ''){
        errors.state = "Enter State Name"
    }
    if(country === ''){
        errors.country = "Enter Country Name"
    }
    
    return errors;
}




