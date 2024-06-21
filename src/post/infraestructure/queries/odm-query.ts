import { PostEntity } from "src/post/domain/entity/post-entity";
import { IPostQuery } from "./interfaces/query-post.interface";
import { Model, Mongoose } from "mongoose";
import { OdmPost, OdmPostSchema } from "../entity/odm-post";

export class OdmQuery implements IPostQuery {
    
    private readonly model: Model<OdmPost>;

    constructor( ods: Mongoose ) { this.model = ods.model('OdmPost', OdmPostSchema) }

    async getPostById( id: string ): Promise<PostEntity> {
        const result = await this.model.findOne( { id_post: id } )
        return PostEntity.create( result.id, result.content )
    }

    async getPostByContent( content: string ): Promise<PostEntity> {
        const result = await this.model.findOne( { content: content } )
        return PostEntity.create( result.id, result.content )
    }

}