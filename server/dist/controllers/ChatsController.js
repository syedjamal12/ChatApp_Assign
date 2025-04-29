import prisma from "../config/db.config.js";
class ChatsController {
    static async index(req, res) {
        const { groupId } = req.params;
        const chats = await prisma.chats.findMany({
            where: {
                group_id: groupId
            }
        });
        res.json({ message: "chats fetch successfully", data: chats });
    }
    static async store(req, res) {
        try {
            const body = req.body;
            const data = await prisma.chats.create({
                data: {
                    group_id: body.id,
                    name: body.name,
                    message: body.message
                },
            });
            return res.json({ message: "msg fetch Successfully", data: data });
        }
        catch (error) {
            console.error("Error adding group user:", error); // Logs the exact error
            res.status(500).json({
                message: "An error occurred",
                error: error.message, // Optionally include the error message in the response
            });
        }
    }
}
export default ChatsController;
