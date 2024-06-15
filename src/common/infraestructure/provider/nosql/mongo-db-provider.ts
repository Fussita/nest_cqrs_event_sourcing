import { Provider } from "@nestjs/common";
import { connect } from "mongoose";

export const MongoDataBaseProvider: Provider = 
  {
    provide: 'MongoDataSource',
    useFactory: async () => {
      try {
        const connection = await connect('mongodb://localhost:27017/mongodb');
        return connection;
      } catch (error) {
        console.log(`Error al conectar a MongoDB: ${error.message}`);
        throw error;
      }
    },
  }

