import mongoose from "mongoose"

let alreadyDone = false

export async function ensureDbConnected(){
    if(alreadyDone){
        return;
    }
    alreadyDone = true 
    await mongoose.connect("");
    console.log("db connected");
}