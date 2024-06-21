import { PostEntity } from "src/post/domain/entity/post-entity"

export interface IPostQuery {
    getPostById( id: string ): Promise<PostEntity>
    getPostByContent( content: string ): Promise<PostEntity>
}

