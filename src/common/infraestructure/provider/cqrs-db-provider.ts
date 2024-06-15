import { Provider } from "@nestjs/common"
import { MongoDataBaseProvider } from "./nosql/mongo-db-provider"
import { PostgresDataBaseProvider } from "./sql/postgres-db-provider"

export const CQRSDatabaseProvider: Provider[] = [
  MongoDataBaseProvider,
  PostgresDataBaseProvider,
  {
    provide: 'SQLDataSource',
    useFactory: async (connection) => { return connection },  
    inject: ['PostgresDataSource'],
  },

  {
    provide: 'NoSQLDataSource',
    useFactory: async (connection) => { return connection },  
    inject: ['MongoDataSource'],
  },    

]
  