import { Router } from 'express';
import { ApiResponse } from "../types";
import { showBackendError } from "../lib/indexUtils";
import {authMiddleware} from "../middleware/authMiddleware";
import {TicketModel} from "../models/Ticket";
import {TicketBaseStructure} from "../types/support";
import {validateTicketData} from "../lib/validators/ticket";

const router = Router();

router.post('/ticket', authMiddleware, async (req, res) => {
    try {
        const requestData: TicketBaseStructure = req.body;
        const userId:number = (req as any).userId;

        const validationResult = validateTicketData(requestData);

        if (!validationResult) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка добавления нового обращения, пожалуйста проверьте введенные вами данные.'
            };
            return res.status(400).json(response);
        }

        const result = await TicketModel.add(userId, requestData);

        if (!result) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка добавления нового обращения, пожалуйста попробуйте позже.'
            };
            return res.status(400).json(response);
        }

        const response: ApiResponse = {
            success: true,
            data: {
                ticketDetails: result
            }
        };

        return res.status(200).json(response);
    } catch (error){
        const response = showBackendError(error, 'Ошибка при добавлении нового обращения');

        res.status(500).json(response);
    }
});

router.get('/tickets', authMiddleware, async (req, res) => {
    try {
        const userId:number = (req as any).userId;
        const tickets = await TicketModel.getList(userId);

        if (!tickets) {
            const response: ApiResponse = {
                success: false,
                message: 'Ошибка со стороны сервера при получении данных'
            };

            return res.status(500).json(response);
        }

        const response: ApiResponse = {
            success: true,
            data: { tickets }
        };

        res.status(200).json(response);
    } catch (error) {
        const response = showBackendError(error, 'Ошибка при получении списка обращений');

        res.status(500).json(response);
    }
});

router.get('/ticket', authMiddleware, async (req, res) => {
    try {
        const ticketId = String(req.query.ticketId ?? '').trim();
        const userId:number = (req as any).userId;

        if (!ticketId) {
            const response: ApiResponse = {
                success: false,
                message: 'Параметр ticketId обязателен'
            };

            return res.status(400).json(response);
        }

        const result = await TicketModel.getDetails(ticketId, userId);

        if (!result) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка при получении данных обращения, пожалуйста попробуйте позже.'
            };
            return res.status(400).json(response);
        }

        const response: ApiResponse = {
            success: true,
            data: {
                ticketDetails: result
            }
        };

        return res.status(200).json(response);
    } catch (error){
        const response = showBackendError(error, 'Ошибка при получении данных обращения');

        res.status(500).json(response);
    }
});



router.post('/ticket/answer', authMiddleware, async (req, res) => {
    try {
        const ticketId = String(req.body?.ticketId ?? '').trim();
        const answer = String(req.body?.answer ?? '').trim();
        const userId:number = (req as any).userId;

        if (!ticketId || !answer) {
            const response: ApiResponse = {
                success: false,
                message: 'Параметры ticketId и answer обязательны'
            };

            return res.status(400).json(response);
        }

        const result = await TicketModel.gaveAnswer(ticketId, userId, answer);

        if (!result) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка при обновлении обращения, пожалуйста попробуйте позже.'
            };
            return res.status(400).json(response);
        }

        const response: ApiResponse = {
            success: true,
            data: {
                ticket: result
            }
        };

        return res.status(200).json(response);
    } catch (error){
        const response = showBackendError(error, 'Ошибка при обновлении обращения');

        res.status(500).json(response);
    }
});

router.delete('/ticket', authMiddleware, async (req, res) => {
    try {
        const ticketId = String(req.body?.ticketId ?? '').trim();
        const userId:number = (req as any).userId;

        if (!ticketId) {
            const response: ApiResponse = {
                success: false,
                message: 'Параметр ticketId обязателен'
            };

            return res.status(400).json(response);
        }

        const result = await TicketModel.delete(ticketId, userId);

        if (!result) {
            const response: ApiResponse = {
                success: false,
                error: 'Ошибка при удалении обращения, пожалуйста попробуйте позже.'
            };
            return res.status(400).json(response);
        }

        const response: ApiResponse = { success: true };

        return res.status(200).json(response);
    } catch (error){
        const response = showBackendError(error, 'Ошибка при удалении обращения');

        res.status(500).json(response);
    }
});

export default router;
