import { PostDocument } from '@schema/posts/entities/post.entity'

export class CrawChapterNettruyenDto {
  constructor(readonly chapter: PostDocument, readonly order: number) {}
}
