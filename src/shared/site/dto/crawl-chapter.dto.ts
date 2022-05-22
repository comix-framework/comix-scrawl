import { PostDocument } from '@schema/posts/entities/post.entity'

export class CrawChapterDto {
  constructor(readonly chapter: PostDocument, readonly order: number) {}
}
