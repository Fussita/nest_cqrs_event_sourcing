import { DataSource, Repository } from 'typeorm'
import { OrmPost } from '../entity/orm-post'
import { IPostRepository } from 'src/post/domain/repository/post-repository.interface'
import { PostEntity } from 'src/post/domain/entity/post-entity'

export class OrmPostRepository extends Repository<OrmPost> implements IPostRepository {

    constructor( ormDS: DataSource ) {
        super( OrmPost, ormDS.createEntityManager() )
    }

    getPostById(id: string): Promise<PostEntity> {
        throw new Error('Method not implemented.')
    }
    
    async savePost( id: string, content: string ) {
        const date = new Date()
        const orm = OrmPost.create(id, content, date)
        await this.save( orm )        
    }

    async updatePostById( id: string, content: string ) {
        const orm = await this.findOneBy( { id: id } )
        orm.content = content
        orm.last_modified_date = new Date()
        this.save(orm)
    }
    
    async deletePostById( id: string ) {
        const orm = await this.findOneBy( { id: id } )
        await this.delete(orm)
    }

}