import { Provider } from "@nestjs/common";
import { OrmPostRepository } from "src/post/infraestructure/repository/orm-post-repository";
import { PostgresDataBaseProvider } from "../sql/postgres-db-provider";

// Segregate Commands, Queries
export enum EnumDBRepository {
    main_provider = 'MainDataSource', // El Provider de la DB debe llevar esta etiqueta
    post_repository = "PostRepository",
    user_command_repository = "UserCommandRepository",
}

export const EnvironmentPostgresProvider: Provider[] = [
    PostgresDataBaseProvider,    
    
    {
        inject: [EnumDBRepository.main_provider],
        provide: EnumDBRepository.user_command_repository,
        useFactory: async ( dataSource ) => { return new OrmPostRepository( dataSource ) }
    }

]