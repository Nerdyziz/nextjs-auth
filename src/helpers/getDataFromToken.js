import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(req = NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            return null;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id;
    } catch (error) {
        return null;
    }
}