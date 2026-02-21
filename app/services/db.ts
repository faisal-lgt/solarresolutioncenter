import mongoose from "mongoose";

const uri: string | undefined = process.env.MONGODB_URI;

let cachedDb: mongoose.Connection | null = null;

export async function connectToDB(): Promise<mongoose.Connection> {
    if (cachedDb) return cachedDb;

    try {
        await mongoose.connect(uri as string);
        cachedDb = mongoose.connection;
        return cachedDb;
    } catch (error: unknown) {
        // @ts-ignore
        throw new Error("Failed to connect to MongoDB: " + error.toString());
    }
}
