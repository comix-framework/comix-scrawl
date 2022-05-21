import {
  IChapterSelector,
  IStoriesSelector,
  IStorySelector
} from '@shared/site/types/services'

export const NETTRUYEN_STORIES: IStoriesSelector = {
  stories: '.items .item .image a'
}

export const NETTRUYEN_STORY: IStorySelector = {
  name: 'ul.breadcrumb > li:last-child span',
  avatar: '.col-image img',
  author: '.author .col-xs-8',
  categories: '.kind a',
  content: '.detail-content .shortened',
  chapters: '.list-chapter div.chapter a'
}

export const NETTRUYEN_CHAPTER: IChapterSelector = {
  name: '.breadcrumb a.active span',
  images: '.reading .reading-detail img'
}
