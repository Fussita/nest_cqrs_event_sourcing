import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class OrmPost {
    @PrimaryColumn( {type: 'uuid'} )
    id: string
    @Column( 'varchar' )
    content: string
    @Column( 'date' )
    last_modified_date: Date

    static create ( 
        id: string,
        content: string,
        last_modified_date: Date,
    ) {
        const user = new OrmPost()
        user.id = id
        user.content = content
        user.last_modified_date = last_modified_date
        return user
    }
}

