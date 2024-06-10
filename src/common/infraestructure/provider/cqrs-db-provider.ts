import { Provider } from "@nestjs/common"

export const CQRSDatabaseProvider: Provider[] = [
    {
      provide: 'SQLProvider',
      useFactory: async (connection) => { return connection },  
      inject: ['PostgresCommandUser'],
    },

    {
      provide: 'NoSQLProvider',
      useFactory: async (connection) => { return connection },  
      inject: ['MongoQueryUser'],
    },    
]
  