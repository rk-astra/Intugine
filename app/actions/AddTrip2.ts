"use server"
import client from "@/prisma/singleton";


export const addTripToDatabase = async (tripData: {
    tripId: string;
    transporter: string;
    source: string;
    dest: string;
    phoneNumber: string;
    etaDays: number;
}) => {
    try {
        console.log("in addTripToDatabase");
        await client.trip.create({
            data: {
                tripId: tripData.tripId,
                transporter: tripData.transporter,
                tripStartTime: new Date().toISOString(),
                currentStatusCode: "BKD",
                currenStatus: "Booked",
                phoneNumber: BigInt(tripData.phoneNumber.replace(/\D/g, '')),
                etaDays: 0,
                distanceRemaining: 0,
                tripEndTime: "N/A",
                source: tripData.source,
                sourceLatitude: 0,
                sourceLongitude: 0,
                dest: tripData.dest,
                destLatitude: 0,
                destLongitude: 0,
                lastPingTime: new Date().toISOString() || "N/A",
                createdAt: new Date().toISOString() || "N/A",
            },
        });
    } catch (error) {
        console.error("Error adding trip to the database:", error);
        throw new Error("Database operation failed");
    }
};
