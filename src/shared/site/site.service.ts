import { Injectable } from '@nestjs/common'
import { LeechService } from '@shared/leech/leech.service'
import {
  IChapterSelector,
  IStoryData,
  IStorySelector
} from '@shared/site/types/services'
import { AxiosRequestHeaders } from 'axios'

@Injectable()
export class SiteService {
  constructor(
    readonly leechService: LeechService,
    readonly selectors: IStorySelector,
    readonly chapterSelectors: IChapterSelector
  ) {}

  async load(url: string, headers: AxiosRequestHeaders = {}) {
    await this.leechService.auto(url, headers)
  }

  /**
   * Story Data
   */

  getName() {
    return this.leechService.getText(this.selectors.name).single()
  }

  getAvatar() {
    return this.leechService.getAttr(this.selectors.avatar, 'src').single()
  }

  getAuthor() {
    return this.leechService.getText(this.selectors.author).single()
  }

  getCategories() {
    return this.leechService.getText(this.selectors.categories).array()
  }

  getContent() {
    return this.leechService.getText(this.selectors.content).single()
  }

  getChapters() {
    return this.leechService.getAttr(this.selectors.chapters, 'href').array()
  }

  getStoryData(): IStoryData {
    return {
      name: this.getName(),
      author: this.getAuthor(),
      avatar: this.getAvatar(),
      categories: this.getCategories(),
      content: this.getContent(),
      chapters: this.getChapters()
    }
  }

  /**
   * Chapter Data
   */
  chapterName() {
    return this.leechService.getText(this.chapterSelectors.name).single()
  }

  chapterImages() {
    return this.leechService
      .getAttr(this.chapterSelectors.images, 'src')
      .array()
  }
}
