import { pool } from '../config/database';
import {KeyDataStructure} from "../types/keysTypes";



export class KeyModel {

    static async getKeys(): Promise<KeyDataStructure[] | null> {
        const query = `
            SELECT id, 
                   public_id,
                   name, 
                   description,
                   price
                   release_date AS releaseDate,
                   main_picture_url,
                   developer,
                   publisher,
            FROM keys
            `;

        const { keys } = await pool.query(query);

        if (!keys) {
            return null;
        }

        return keys as KeyDataStructure[];
    }


}