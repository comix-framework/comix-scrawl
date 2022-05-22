import { Injectable } from '@nestjs/common'
import { LeechService } from '@shared/leech/leech.service'
import {
  IChapterData,
  IChapterSelector,
  IStoriesSelector,
  IStoryData,
  IStorySelector
} from '@shared/site/types/services'
import { AxiosRequestHeaders } from 'axios'

@Injectable()
export class SiteService {
  constructor(
    readonly leechService: LeechService,
    readonly stories: IStoriesSelector,
    readonly story: IStorySelector,
    readonly chapter: IChapterSelector
  ) {}

  /**
   * Load Crawler
   */
  async load(url: string, headers: AxiosRequestHeaders = {}) {
    await this.leechService.auto(url, headers)
  }

  /**
   * Lấy mảng link truyện
   */
  getStories(): string[] {
    return this.leechService.getAttr(this.stories.stories, 'href').array()
  }

  /**
   * Lấy tên truyện
   */
  getName() {
    return this.leechService.getText(this.story.name).single()
  }

  /**
   * Lấy ảnh bìa truyện
   */
  getAvatar(attr = 'src') {
    return this.leechService.getAttr(this.story.avatar, attr).single()
  }

  /**
   * Lấy danh sách tác giả
   */
  getAuthor(): string {
    return this.leechService.getText(this.story.author).single()
  }

  /**
   * Lấy mảng thể loại => upsert
   */
  getCategories() {
    return this.leechService.getText(this.story.categories).array()
  }

  /**
   * Lấy giới thiệu truyện
   */
  getContent() {
    return this.leechService.getText(this.story.content).single()
  }

  /**
   * Lấy mảng linh tuyện
   */
  getChapters(attr = 'href') {
    return this.leechService.getAttr(this.story.chapters, attr).array()
  }

  /**
   * Tổng hợp dữ liệu truyện
   */
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
   * Tên chương
   */
  chapterName() {
    return this.leechService.getText(this.chapter.name).single()
  }

  /**
   * Mảng url hình ảnh
   */
  chapterImages(attr = 'src'): string[] | Promise<string[]> {
    return this.leechService.getAttr(this.chapter.images, attr).array()
  }

  /**
   * Nội dung crawl chương
   */
  async getChapterData(): Promise<IChapterData> {
    return {
      name: this.chapterName(),
      images: await this.chapterImages()
    }
  }
}
