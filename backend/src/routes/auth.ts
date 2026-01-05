import {response, Router} from 'express';
import bcrypt from 'bcryptjs';
import {validateUserEmail, validateUserPassword} from "../lib/validators/userValidation";
import {ApiResponse} from "../types";
import {showBackendError} from "../lib/indexUtils";


const router = Router();


router.post('/registration', async (req, res) => {

})


router.post('/login', async (req, res) => {
    try{
        const {email, password, rememberMe} = req.body;

        const validateEmail = validateUserEmail(email);
        const validatePassword = validateUserPassword(password);

        if (!validateEmail || !validatePassword) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка аутентификации пользователя, пожалуйста проверьте введенные вами данные'
            }

            return res.status(400).json(response);
        }




        return res.status(200).json(response);
    } catch (error) {
        const response = showBackendError(error, 'Ошибка при аутентификации пользователя')

        res.status(500).json(response);
    }
})