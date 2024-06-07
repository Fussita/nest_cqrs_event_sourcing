import { PostEntity } from "../entity/post-entity";

export interface IPostQueryRepository {
    getPostById( id: string ): Promise<PostEntity>
}

