import dotenv from "dotenv";

dotenv.config();

export const config = {
    MONGODB_URI : process.env.MONGODB_URI || "",
    TOKEN : process.env.TOKEN || "",
    WEATHER_API_KEY : process.env.WEATHER_API_KEY || "",
    ADMIN_ID : process.env.ADMIN_ID || ""
}