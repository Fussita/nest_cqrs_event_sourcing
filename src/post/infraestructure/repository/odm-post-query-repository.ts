import { OdmPost, OdmPostSchema } from '../entity/odm-post'
import { Model, Mongoose } from 'mongoose';

export class OdmPostQueryRepository {

    private readonly model: Model<OdmPost>;

    constructor( ods: Mongoose ) {
        this.model = ods.model('OdmPost', OdmPostSchema)
    }

    async getPostById( id: string ){
        const result = await this.model.findOne( { id_post: id } )
        return result
    }

}

