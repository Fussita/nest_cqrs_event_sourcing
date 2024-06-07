import { Controller, Get, Inject } from "@nestjs/common";
import { SyncEventService } from "../syncro-db/syncro-repositories-odm";
import { OdmPostQueryRepository  } from "../repository/odm-post-query-repository";
import { OrmPostCommandRepository } from "../repository/orm-post-command-repository";
import { DataSource } from 'typeorm'
import { Mongoose } from "mongoose";
import { v4 as uuidv4 } from 'uuid'
import { OdmPostCommandRepository } from "../repository/odm-post-command-repository";

@Controller('post')
export class PostController {

    mongoPostQueryRepository: OdmPostQueryRepository 
    mongoPostCommandRepository: OdmPostCommandRepository 
    postgresPostCommandRepository: OrmPostCommandRepository
    syncroService: SyncEventService
        
    constructor(
        @Inject('PostgresDataSource') ormDS: DataSource,
        @Inject('MongoDataSource') odmDS: Mongoose,
    ) {
        this.mongoPostQueryRepository = new OdmPostQueryRepository( odmDS )
        this.mongoPostCommandRepository = new OdmPostCommandRepository( odmDS )
        this.postgresPostCommandRepository = new OrmPostCommandRepository( ormDS )
        this.syncroService = new SyncEventService( new OdmPostCommandRepository( odmDS ) )
    }

    @Get('write')
    async writeRoute() {
        const result = await this.postgresPostCommandRepository.savePost( uuidv4(), 'works?' )
    }

    @Get('read')
    async readRoute() {
        this.syncroService.sync()
        // query
    }

}