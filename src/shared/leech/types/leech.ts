import { Observable } from 'rxjs'
import { AxiosRequestHeaders, AxiosResponse } from 'axios'
import { CheerioAPI } from 'cheerio/lib/load'

interface LechState {
  obs: Observable<AxiosResponse>
  html: string
  $: CheerioAPI
}

interface IGetAttr {
  array: () => string[]
  single: () => string | null
}

interface LeechSetup {
  init: (url: string, headers: AxiosRequestHeaders) => Observable<AxiosResponse>
  get: () => void
  load: () => void
}

interface LeechMethods {
  getAttr: (selector: string, attr: string) => IGetAttr
  getText: (selector: string) => IGetAttr
  getHTML: (selector: string) => string | null
}

export type ILeechService = LechState & LeechSetup & LeechMethods
