import { TargetDocument } from '@schema/targets/entities/target.entity'
import { PostDocument } from '@schema/posts/entities/post.entity'

export class CrawlStoryNettruyenDto {
  constructor(
    readonly source: string,
    readonly story: PostDocument,
    readonly target: TargetDocument
  ) {}
}
