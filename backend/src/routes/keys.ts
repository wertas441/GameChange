import { Router } from 'express';
import { ApiResponse } from "../types";
import { showBackendError } from "../lib/indexUtils";
import { KeyModel } from "../models/Key";
import {AddKeyData} from "../types/keysTypes";
import {
    validateKeyActivationPlatform, validateKeyCPU, validateKeyDescription, validateKeyDeveloper, validateKeyGenres,
    validateKeyGPU,
    validateKeyMainPicture, validateKeyMemory,
    validateKeyName, validateKeyOperationSystem, validateKeyOtherPictures, validateKeyPublisher, validateKeyRAM,
    validateKeyReleaseDate,
    validateKeyUrl
} from "../lib/validators/keyValidation";

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
    try {
        const { requestData }:{requestData: AddKeyData} = req.body;

        const validateKeyData = () => {
            const { minimal, recommended } = requestData.systemRequirements;

            const checks = [
                validateKeyName(requestData.name),
                validateKeyUrl(requestData.keyUrl),
                validateKeyMainPicture(requestData.mainPicture),
                validateKeyReleaseDate(requestData.releaseDate),
                validateKeyOperationSystem(requestData.operationSystem),
                validateKeyActivationPlatform(requestData.activationPlatform),
                validateKeyGenres(requestData.genres),
                validateKeyDescription(requestData.description),
                validateKeyOtherPictures(requestData.otherPictures),
                validateKeyDeveloper(requestData.developer),
                validateKeyPublisher(requestData.publisher),
                validateKeyCPU(minimal.CPU),
                validateKeyGPU(minimal.GPU),
                validateKeyRAM(minimal.RAM),
                validateKeyMemory(minimal.memory),
                validateKeyCPU(recommended.CPU),
                validateKeyGPU(recommended.GPU),
                validateKeyRAM(recommended.RAM),
                validateKeyMemory(recommended.memory),
            ].flat();

            return checks.every(Boolean);
        };

        const validationResult = validateKeyData();

        if (!validationResult) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка добавления нового ключа, пожалуйста проверьте введенные вами данные.'
            };
            return res.status(400).json(response);
        }

        await KeyModel.addNewKey(requestData);

        const response: ApiResponse = { success: true };

        return res.status(200).json(response);
    } catch (error){
        const response = showBackendError(error, 'Ошибка при добавлении нового ключа');

        res.status(500).json(response);
    }
});

router.put('/key', async (req, res) => {

});

router.delete('/key', async (req, res) => {

});

export default router;
