import { EventPersistence } from 'src/common/domain/event/event-persistence'
import { v4 as uuidv4 } from 'uuid'

export interface EventStored {
    id_owner: string
    consecuence: Function
}

export class EventBus {

    private static singleton: EventBus
    private eventStore: EventStored[] = []

    public static getInstance() {
        if ( !EventBus.singleton ) EventBus.singleton = new EventBus()
        return EventBus.singleton
    }

    public publisher( id_owner: string, event: EventPersistence ) {
        const filt = this.eventStore.filter( e => e.id_owner == id_owner )
        if ( filt.length > 0 ) filt.forEach( e => { e.consecuence( event ) } )
    }

    public subscriber( consecuence: Function ) {
        const id = uuidv4()
        this.eventStore.push( { id_owner: id, consecuence: consecuence } )
        return { 
            id: id,
            unsuscribe: () => { this.eventStore = this.eventStore.filter( e => e.id_owner !== id ) }
        }
    }

}