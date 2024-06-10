import { EventPersistence } from "src/common/domain/event/event-persistence"

export class PostAddedEvent extends EventPersistence {
    post_id: string
    content: string
    last_modified_date: Date
    constructor( post_id: string, content: string ){
        super()
        this.post_id = post_id
        this.content = content
    }
}

export class PostDeleteEvent extends EventPersistence {
    post_id: string
    constructor( post_id: string ){
        super()
        this.post_id = post_id
    }
}

export class PostUpdateEvent extends EventPersistence {
    post_id: string
    content: string
    constructor( post_id: string, content: string ){
        super()
        this.post_id = post_id
        this.content = content
    }
}
