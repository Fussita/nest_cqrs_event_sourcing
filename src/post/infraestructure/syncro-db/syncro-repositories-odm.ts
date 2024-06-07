import { PostAddedEvent, PostUpdateEvent, PostDeleteEvent } from "../event-persistence/post-events"
import { OdmPostCommandRepository } from "../repository/odm-post-command-repository"
import { EventStore } from "./event-store"

export class SyncEventService {
    private odmRepository: OdmPostCommandRepository
    private eventStore: EventStore
    private lastSyncDate: Date = new Date()

    constructor ( 
        odmRepository: OdmPostCommandRepository
    ) {
        this.odmRepository = odmRepository
        this.eventStore = EventStore.getInstance()
    }
    
    public sync() {
        const newSyncDate = new Date()
        const eventsFilter = this.eventStore.getEventsAfterOrderByAsc( this.lastSyncDate )
        for ( const e of eventsFilter ) { 
            
            if ( e instanceof PostAddedEvent ) this.applyEventAdd( e )
            if ( e instanceof PostDeleteEvent ) this.applyEventDelete( e )
            if ( e instanceof PostUpdateEvent ) this.applyEventUpdate( e )
        
        }
        this.lastSyncDate = newSyncDate
    }
    
    private applyEventAdd( event: PostAddedEvent ): void {
        this.odmRepository.savePost( event.post_id, event.content )
        console.log(' applied on mongodb: addEvent '+ event.post_id)
    }

    private applyEventUpdate( event: PostUpdateEvent ): void { 
        this.odmRepository.updatePostById( event.post_id, event.content )
        console.log(' applied on mongodb: updateEvent '+ event.post_id)
    }

    private applyEventDelete( event: PostDeleteEvent ): void { 
        this.odmRepository.delPostById( event.post_id )
        console.log(' applied on mongodb: delEvent ' + event.post_id)
    }

}

