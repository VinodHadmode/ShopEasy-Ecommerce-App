const bcrypt = require("bcrypt")

const hashPassword = async (password) => {
    try {
        const saltRound = 5
        const hashedPassword = bcrypt.hash(password, saltRound)
        return hashedPassword
    } catch (error) {
        console.log(error);
    }
}

const comparePassword=async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}

module.exports={
    hashPassword,comparePassword
}