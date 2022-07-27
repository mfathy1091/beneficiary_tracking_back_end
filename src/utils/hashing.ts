
import bcrypt from 'bcrypt'

const saltRounds = process.env.SALT_ROUND
const pepper = process.env.BCRYPT_PASSWORD

const hashPassword = async (password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(
            password + pepper,
            parseInt(saltRounds as string)
        );
    
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
}

const isPasswordValid = async (password: string, hash: string) => {
    try {
        const isPasswordValid = await bcrypt.compare( password+pepper, hash )
        return isPasswordValid
    } catch (error) {
        console.log(error)
    }
}


export { hashPassword, isPasswordValid}