import { Router } from 'express';
import { ApiResponse } from "../types";
import { showBackendError } from "../lib/indexUtils";
import { KeyModel } from "../models/Key";
import {AddKeyData, KeyDetailsData} from "../types/keysTypes";
import {validateKeyData} from "../lib/validators/key";
import {adminMiddleware} from "../middleware/adminMiddleware";

const router = Router();

router.get('/', async (req, res) => {
   try {
       const keys = await KeyModel.getList();

       if (!keys) {
           const response: ApiResponse = {
               success: false,
               message: 'Ошибка со стороны сервера при получении данных'
           };

            return res.status(500).json(response);
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

router.get('/key', async (req, res) => {
    try {
        const keyUrl = String(req.query.keyUrl ?? '').trim();

        if (!keyUrl) {
            const response: ApiResponse = {
                success: false,
                message: 'Параметр keyUrl обязателен'
            };

            return res.status(400).json(response);
        }

        const keyDetails = await KeyModel.getDetails(keyUrl);

        if (!keyDetails) {
            const response: ApiResponse = {
                success: false,
                message: 'Ключ не найден'
            };

            return res.status(404).json(response);
        }

        const response: ApiResponse = {
            success: true,
            data: { keyDetails }
        };

        res.status(200).json(response);
    } catch (error) {
        const response = showBackendError(error, 'Ошибка при получении подробностей о ключе');

        res.status(500).json(response);
    }
});

router.post('/key', adminMiddleware, async (req, res) => {
    try {
        const requestData: AddKeyData = req.body;

        const validationResult:boolean = validateKeyData(requestData);

        if (!validationResult) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка добавления нового ключа, пожалуйста проверьте введенные вами данные.'
            };
            return res.status(400).json(response);
        }

        await KeyModel.add(requestData);

        const response: ApiResponse = { success: true };

        return res.status(200).json(response);
    } catch (error){
        const response = showBackendError(error, 'Ошибка при добавлении нового ключа');

        res.status(500).json(response);
    }
});

router.put('/key', adminMiddleware, async (req, res) => {
    try {
        const requestData: KeyDetailsData = req.body;

        const validationResult:boolean = validateKeyData(requestData);

        if (!validationResult) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка изменения существующего ключа, пожалуйста проверьте введенные вами данные.'
            };
            return res.status(400).json(response);
        }

        await KeyModel.change(requestData);

        const response: ApiResponse = { success: true };

        return res.status(200).json(response);
    } catch (error){
        const response = showBackendError(error, 'Ошибка при изменении существующего ключа');

        res.status(500).json(response);
    }
});

router.delete('/key', adminMiddleware, async (req, res) => {
    try {
        const { keyId } = req.body;

        if (!Number.isInteger(keyId) || keyId <= 0) {
            const response: ApiResponse = {
                success: false,
                error: 'Некорректный id ключа.'
            };
            return res.status(400).json(response);
        }

        const deleted = await KeyModel.delete(keyId);

        if (!deleted) {
            const response: ApiResponse = {
                success: false,
                error: 'Ключ не найден'
            };
            return res.status(404).json(response);
        }

        const response: ApiResponse = { success: true };

        return res.status(200).json(response);
    } catch (error){
        const response = showBackendError(error, 'Ошибка при удалении существующего ключа');

        res.status(500).json(response);
    }
});

export default router;
