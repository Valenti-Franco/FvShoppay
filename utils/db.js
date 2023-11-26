import mongoose from "mongoose";
const connection ={};

async function connectDb(){
    if(connection.isConnected){
        console.log("se conecto");
        return;

    }
    if(mongoose.connections.length>0){
        connection.isConnected = mongoose.connections[0].readyState;
        if(connection.isConnected===1){
            console.log("use previus connection to the database");
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect('mongodb+srv://franco:53liCiD1SYK4kOug@cluster0.kefxai9.mongodb.net/shoppay?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true,

  
    });
    console.log("New connection to the database.");
    connection.isConnected = db.connections[0].readyState;
}

async function disconnectDb(){
    if(connection.isConnected){
      if(process.env.NOVE_END === "production"){
        await mongoose.disconnect();
          connection.isConnected = false;
      }else{
        console.log("not diconnectiong from the database")
      }
    }
  }

  const db={connectDb, disconnectDb};
  export default db;