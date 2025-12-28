export interface BlogPost {
    title: string,
    category: string,
    body: string,
    description: string,
    status: PostStatus,
}

export type PostStatus = 'published' | 'draft' | 'disable'