import {Router} from 'express';
import bcrypt from 'bcryptjs';
import {validateUserEmail, validateUserName, validateUserPassword} from "../lib/validators/userValidation";
import {ApiResponse} from "../types";
import {showBackendError} from "../lib/indexUtils";
import {LoginRequest, RegisterRequest} from "../types/auth";
import {UserModel} from "../models/User";
import { config } from '../config';
import jwt from 'jsonwebtoken';
import {authMiddleware} from "../middleware/authMiddleware";
import {KeyModel} from "../models/Key";

const router = Router();

router.post('/key', async (req, res) => {
    // const { requestBody } : {requestData: } = req.body;
});

router.get('/keys', async (req, res) => {
   try {
       const keys = KeyModel.getKeys()
       if (!keys) {
           const response: ApiResponse = {
               success: false,
               error: 'Произошла сетевая ошибка, нам не удалось получить данные с сервера'
           };

           return res.status(409).json(response);
       }

       const response: ApiResponse = {
           success: true,
           data: { keys }
       };

       res.status(200).json(response);
   } catch (error) {
       const response = showBackendError(error, 'Ошибка при получении списка ключей');

       res.status(500).json(response);
   }
});

router.delete('/key', async (req, res) => {

});

router.get('/key:id', async (req, res) => {

});

export default router;
