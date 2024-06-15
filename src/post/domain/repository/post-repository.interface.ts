import { PostEntity } from "../entity/post-entity"

export interface IPostRepository {
    savePost( id: string, content: string ): void
    deletePostById( id: string ): void
    updatePostById( id: string, content: string ): void
    getPostById( id: string ): Promise<PostEntity>
    getPostByContent( content: string ): Promise<PostEntity>
}

