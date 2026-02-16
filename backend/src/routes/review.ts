import { Router } from 'express';
import { ApiResponse } from "../types";
import { showBackendError } from "../lib/indexUtils";
import {authMiddleware} from "../middleware/authMiddleware";
import {ReviewModel} from "../models/Review";
import {ReviewBaseStructure} from "../types/review";
import {validateReviewData} from "../lib/validators/review";

const router = Router();

router.get('/reviews', async (req, res) => {
    try {
        const reviews = await ReviewModel.getList();

        if (!reviews) {
            const response: ApiResponse = {
                success: false,
                message: 'Ошибка со стороны сервера при получении данных'
            };

            return res.status(500).json(response);
        }

        const response: ApiResponse = {
            success: true,
            data: { reviews }
        };

        res.status(200).json(response);
    } catch (error) {
        const response = showBackendError(error, 'Ошибка при получении списка отзывов');

        res.status(500).json(response);
    }
});

router.post('/review', authMiddleware, async (req, res) => {
    try {
        const requestData: ReviewBaseStructure = req.body;
        const userId:number = (req as any).userId;

        const validationResult = validateReviewData(requestData);

        if (!validationResult) {
            const response: ApiResponse = {
                success: false,
                error: `Ошибка добавления нового отзыва, пожалуйста проверьте введенные вами данные`
            };
            return res.status(400).json(response);
        }

        const result = await ReviewModel.add(userId, requestData);

        if (!result) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка добавления нового отзыва, пожалуйста попробуйте позже'
            };
            return res.status(400).json(response);
        }

        const response: ApiResponse = { success: true };

        return res.status(200).json(response);
    } catch (error){
        const response = showBackendError(error, 'Ошибка при добавлении нового отзыва');

        res.status(500).json(response);
    }
});

export default router;
