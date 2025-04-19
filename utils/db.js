import { neon } from "@neondatabase/serverless";

const database = process.env.DATABASE_URI;

if (!database) {
    throw new Error("Enviroment not set yet!")
}

const sql = neon(database)

async function pool(text, params = []) {
    try {
        return await sql.query(text, params)
    } catch (error) {
        console.error("Database could not reach", error)
        throw new Error("Failed to executed")
    }
}

export async function getMenus() {
    return pool("SELECT * FROM menus", [])
}
