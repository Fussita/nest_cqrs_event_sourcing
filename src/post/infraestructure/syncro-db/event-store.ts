import { EventPersistence } from "src/common/domain/event-persistence/event-persistence"

export class EventStore {
    private eventStore: EventPersistence[] = []
    private static singleton: EventStore
 
    public static getInstance() {
        if ( !EventStore.singleton ) EventStore.singleton = new EventStore()
        return EventStore.singleton
    }

    public addEvent(event: EventPersistence): void {
        this.eventStore.push(event)
    }

    public getEventsAfterOrderByAsc( date: Date ): EventPersistence[] {
        return this.eventStore.filter( e => e.date >= date )
    }

}