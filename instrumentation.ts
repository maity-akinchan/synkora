import { dbConnection } from "@/lib/db";
import { connected } from "process";

dbConnection.then((connection) => {
        console.log("connected");
}).catch((err) => {
    console.log(err);
})