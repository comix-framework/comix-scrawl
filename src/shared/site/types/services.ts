export interface IStoriesSelector {
  stories: string
}

export interface IStorySelector {
  name: string
  avatar: string
  author: string
  categories: string
  content: string
  chapters: string
}

export interface IStoryData {
  name: string
  avatar: string
  author: string
  categories: string[]
  content: string
  chapters: string[]
}

export interface IChapterSelector {
  name: string
  images: string
}

export interface IChapterData {
  name: string
  images: string[]
}
