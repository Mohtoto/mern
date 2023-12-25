import mongoose from 'mongoose'


const MONGO_URI = process.env.MONGODB_URI

let cached = (global as any).mongoose || {conn: null, promsie :null};


export const connectToDatabase = async () => {

if(cached.conn) return cached.conn;
if(!MONGO_URI) throw new Error('MONGODB URI NOT FOUND')

cached.promsie = cached.promise || mongoose.connect(MONGO_URI , {

    dbName: 'EventSphere',
    bufferCommands: false
})


cached.conn = await cached.promise;

return cached.conn

}



