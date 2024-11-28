import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient()

async function test() {
    const token = await db.sMStoken.findUnique({
        where:{
            id:1
        }
    })
    console.log('token',token)
}
test()
export default db