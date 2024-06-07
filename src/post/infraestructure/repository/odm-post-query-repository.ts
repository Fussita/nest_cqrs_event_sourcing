import { IPostQueryRepository } from 'src/post/domain/repository/post-query-repository';
import { OdmPost, OdmPostSchema } from '../entity/odm-post'
import { Model, Mongoose } from 'mongoose';
import { PostEntity } from 'src/post/domain/entity/post-entity';

export class OdmPostQueryRepository implements IPostQueryRepository {

    private readonly model: Model<OdmPost>;

    constructor( ods: Mongoose ) {
        this.model = ods.model('OdmPost', OdmPostSchema)
    }

    async getPostById( id: string ): Promise<PostEntity> {
        const result = await this.model.findOne( { id_post: id } )
        return PostEntity.create( result.id, result.content )
    }

}

