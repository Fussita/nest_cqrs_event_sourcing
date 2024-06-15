import { Controller, Get, Inject } from "@nestjs/common";
import { DataSource } from 'typeorm'
import { Mongoose } from "mongoose";
import { v4 as uuidv4 } from 'uuid'
import { EventBus } from "../event-store/event-store";
import { PostAddedEvent } from "../../domain/events/post-events";
import { IPostRepository } from "src/post/domain/repository/post-repository.interface";
import { OdmPostRepository } from "../repository/odm-post-repository";
import { OrmPostRepository } from "../repository/orm-post-repository";

@Controller('post')
export class PostController {

    noSQLPostRepository: IPostRepository 
    SQLPostRepository: IPostRepository
    eventBus: EventBus
    id_testing = '4f83b9ee-7489-4c06-9069-f3ea6471d9cf'
        
    constructor(
        @Inject('SQLDataSource') ormDS: DataSource,
        @Inject('NoSQLDataSource') odmDS: Mongoose,
    ) {
        this.noSQLPostRepository = new OdmPostRepository( odmDS )
        this.SQLPostRepository = new OrmPostRepository( ormDS )
        this.eventBus = EventBus.getInstance()
    }

    @Get('sql') 
    async readsql() {
        const result = await this.SQLPostRepository.getPostById(this.id_testing)
        return result
    }

    @Get('nosql') 
    async readnosql() {
        const result = await this.noSQLPostRepository.getPostById(this.id_testing)
        return result
    }

    @Get('write')
    async writeRoute() {
        
        const suscription = this.eventBus.subscriber(
            (event: PostAddedEvent) => {
                this.noSQLPostRepository.savePost( event.post_id, event.content )
            }
        )
        const eventCreated = new PostAddedEvent(uuidv4(), '-rantext')
        const result = await this.SQLPostRepository.savePost( eventCreated.post_id, eventCreated.content )
        this.eventBus.publisher(suscription.id, eventCreated)
        suscription.unsuscribe()   
        
    }

}