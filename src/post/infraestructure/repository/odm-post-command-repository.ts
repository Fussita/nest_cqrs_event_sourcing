import { OdmPost, OdmPostSchema } from '../entity/odm-post'
import { Model, Mongoose } from 'mongoose';

export class OdmPostCommandRepository {

    private readonly model: Model<OdmPost>;

    constructor( ods: Mongoose ) { this.model = ods.model('OdmPost', OdmPostSchema) }

    async savePost( id: string, content: string ) {
        const result = await this.model.create( { id_post: id, content: content, last_modified_date: new Date() } )
        return result
    }

    async delPostById( id: string ){
        const result = await this.model.findOneAndDelete( { id_post: id } )
        return result
    }

    async updatePostById( id: string, content: string ){
        const resultFind = await this.model.findOne( { id_post: id } )
        const resultUpdate = await resultFind.updateOne( { content: content, last_modified_date: new Date() }  )
        return resultUpdate
    }

}

