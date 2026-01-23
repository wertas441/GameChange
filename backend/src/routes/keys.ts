import { Router } from 'express';
import { ApiResponse } from "../types";
import { showBackendError } from "../lib/indexUtils";
import { KeyModel } from "../models/Key";

const router = Router();


router.get('/', async (req, res) => {
   try {
       const keys = await KeyModel.getKeys();

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

        const keyDetails = await KeyModel.getKeyDetails(keyUrl);

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

router.post('/key', async (req, res) => {
    // const { requestBody } : {requestData: } = req.body;
});

router.put('/key', async (req, res) => {

});

router.delete('/key', async (req, res) => {

});

export default router;
