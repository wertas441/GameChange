import { Router } from 'express';
import { ApiResponse } from "../types";
import { showBackendError } from "../lib/indexUtils";
import { KeyModel } from "../models/Key";

const router = Router();

router.post('/key', async (req, res) => {
    // const { requestBody } : {requestData: } = req.body;
});

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

router.get('/key:id', async (req, res) => {

});

router.put('/key', async (req, res) => {

});

router.delete('/key', async (req, res) => {

});

export default router;
