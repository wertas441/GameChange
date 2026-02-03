import {Router} from 'express';
import bcrypt from 'bcryptjs';
import {validateUserEmail, validateUserName, validateUserPassword} from "../lib/validators/user";
import {ApiResponse} from "../types";
import {showBackendError} from "../lib/indexUtils";
import {LoginRequest, PurchaseCreateItem, RegisterRequest} from "../types/userTypes";
import {UserModel} from "../models/User";
import { config } from '../config';
import jwt from 'jsonwebtoken';
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

router.post('/registration', async (req, res) => {
    try {
        const { userName, email, password }: RegisterRequest = req.body;

        const nameError = validateUserName(userName);
        const emailError = validateUserEmail(email)
        const passwordError = validateUserPassword(password);

        if (!nameError || !emailError || !passwordError) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка регистрации пользователя, пожалуйста проверьте введенные вами данные.'
            };
            return res.status(400).json(response);
        }

        // Проверка существования пользователя по email и userName
        const existingByEmail = await UserModel.findByEmail(email);
        if (existingByEmail) {
            const response: ApiResponse = {
                success: false,
                error: 'Пользователь с таким email уже существует.'
            };
            return res.status(409).json(response);
        }

        const existingByUserName = await UserModel.findByUserName(userName);
        if (existingByUserName) {
            const response: ApiResponse = {
                success: false,
                error: 'Пользователь с таким именем уже существует.'
            };
            return res.status(409).json(response);
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание пользователя в базе данных
        await UserModel.create({ email, userName, hashedPassword});

        const response: ApiResponse = {
            success: true,
            message: 'Пользователь успешно зарегистрирован',
        };

        res.status(200).json(response);
    } catch (error) {
        const response = showBackendError(error, 'Ошибка при регистрации пользователя');

        res.status(500).json(response);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password, rememberMe }: LoginRequest = req.body;

        const emailError = validateUserEmail(email)
        const userPassword = validateUserPassword(password);

        if (!emailError || !userPassword) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка авторизации пользователя, пожалуйста проверьте введенные вами данные.'
            };
            return res.status(400).json(response);
        }

        // Проверка пользователя в базе данных
        const existingUser = await UserModel.findByEmail(email);
        if (!existingUser) {
            const response: ApiResponse = {
                success: false,
                error: 'Неверное имя пользователя или пароль.'
            };
            return res.status(401).json(response);
        }

        // Проверка пароля
        const isPasswordValid = await bcrypt.compare(password, (existingUser as any).password);
        if (!isPasswordValid) {
            const response: ApiResponse = {
                success: false,
                error: 'Неверное имя пользователя или пароль.'
            };
            return res.status(401).json(response);
        }

        // Генерация JWT токена
        const token = jwt.sign({ userId: (existingUser as any).id }, config.jwtSecret as string, {
            expiresIn: rememberMe ? '60d' : '1d'
        });

        // Устанавливаем httpOnly куки с токеном
        res.cookie('token', token, {
            httpOnly: true,
            secure: config.nodeEnv === 'production',
            sameSite: 'lax',
            maxAge: rememberMe ? 60 * 24 * 60 * 60 * 1000 : undefined
        });

        const response: ApiResponse = {
            success: true,
            data: { token }
        };

        res.status(200).json(response);
    } catch (error) {
        const response = showBackendError(error, 'Ошибка при входе в систему');

        res.status(500).json(response);
    }
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const userId:number = (req as any).userId;
        const userData = await UserModel.findById(userId);

        if (!userData) {
            const response: ApiResponse = {
                success: false,
                error: 'Пользователь не найден'
            };
            return res.status(404).json(response);
        }

        const response: ApiResponse = {
            success: true,
            data: { userData }
        };

        res.json(response);
    } catch (error) {
        const response = showBackendError(error, `Ошибка получения информации о текущем пользователе`);

        res.status(500).json(response);
    }
});

router.get('/purchases', authMiddleware, async (req, res) => {
    try {
        const userId:number = (req as any).userId;

        const purchasesList = await UserModel.getPurchases(userId);

        const response: ApiResponse = {
            success: true,
            data: { purchasesList }
        };

        res.status(200).json(response);
    } catch (error) {
        const response = showBackendError(error, `Ошибка получения информации об истории покупок пользователя`);

        res.status(500).json(response);
    }
});

router.post('/purchases', authMiddleware, async (req, res) => {
    try {
        const userId:number = (req as any).userId;
        const requestData = Array.isArray(req.body)
            ? req.body
            : (req.body as { items?: PurchaseCreateItem[] })?.items;

        if (!Array.isArray(requestData) || requestData.length === 0) {
            const response: ApiResponse = {
                success: false,
                error: 'Список покупок пуст'
            };
            return res.status(400).json(response);
        }

        await UserModel.addPurchases(userId, requestData);

        const response: ApiResponse = { success: true };

        res.status(200).json(response);
    } catch (error) {
        const response = showBackendError(error, `Ошибка добавления покупок пользователя`);

        res.status(500).json(response);
    }
});



export default router;
