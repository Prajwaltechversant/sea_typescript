import validator from "validator";



async function emailValidator(email: string) {

    try {
        return validator.isEmail(email)
    } catch (error) {
        console.log(error)
    }

}

export default emailValidator