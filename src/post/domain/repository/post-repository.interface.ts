export interface IPostRepository {
    savePost( id: string, content: string ): void
    deletePostById( id: string ): void
    updatePostById( id: string, content: string ): void
}

