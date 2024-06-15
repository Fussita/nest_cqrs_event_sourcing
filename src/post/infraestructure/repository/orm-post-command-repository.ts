import { DataSource, Repository } from 'typeorm'
import { OrmPost } from '../entity/orm-post'
import { PostAddedEvent, PostDeleteEvent, PostUpdateEvent } from '../event-persistence/post-events'
import { EventStore } from '../syncro-db/event-store'
import { IPostCommandRepository } from 'src/post/domain/repository/post-command-repository'

export class OrmPostCommandRepository extends Repository<OrmPost> implements IPostCommandRepository {

    private eventStore: EventStore
    
    constructor( ormDS: DataSource ) {
        super( OrmPost, ormDS.createEntityManager() )
        this.eventStore = EventStore.getInstance()
    }
    
    async savePost( id: string, content: string ) {
        const date = new Date()
        const orm = OrmPost.create(id, content, date)
        await this.save( orm )        
        this.eventStore.addEvent( new PostAddedEvent(id, content) ) 
    }

    async updatePostById( id: string, content: string ) {
        const orm = await this.findOneBy( { id: id } )
        orm.content = content
        orm.last_modified_date = new Date()
        this.save(orm)
        this.eventStore.addEvent( new PostUpdateEvent(id, content) )
    }
    
    async deletePostById( id: string ) {
        const orm = await this.findOneBy( { id: id } )
        await this.delete(orm)
        this.eventStore.addEvent( new PostDeleteEvent(id) )
    }

}