import { Entity } from "src/common/domain/entity/entity.interface";

export class PostEntity extends Entity<string> {
    content: string
    
    private constructor( id: string, content: string ){
        super(id)
        this.content = content
    }

    public static create( id: string, content: string ) {
        return new PostEntity( id, content )
    }

    equals( entity: PostEntity ): boolean {
        throw new Error("Method not implemented.");
    }

}