import { DataSource, Repository } from 'typeorm'
import { OrmPost } from '../entity/orm-post'
import { IPostRepository } from 'src/post/domain/repository/post-repository.interface'

export class OrmPostRepository extends Repository<OrmPost> implements IPostRepository {

    constructor( ormDS: DataSource ) {
        super( OrmPost, ormDS.createEntityManager() )
    }
/*
    async getPostByContent( content: string ): Promise<PostEntity> {
        const result = await this.findOneBy( { content: content } )
        return PostEntity.create( result.id, result.content )
    }

    async getPostById(id: string): Promise<PostEntity> {
        const result = await this.findOneBy( { id: id } )
        return PostEntity.create( result.id, result.content )
    }
  */  
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