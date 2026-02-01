import { pool } from '../config/database';
import {ReviewBaseStructure, ReviewListStructure} from "../types/reviewTypes";

export class ReviewModel {

    static async getList(): Promise<ReviewListStructure[] | undefined> {

    }


    static async add(data: ReviewBaseStructure) {

    }
}