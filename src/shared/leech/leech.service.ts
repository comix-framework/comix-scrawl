import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosRequestHeaders, AxiosResponse } from 'axios'
import { first, lastValueFrom, map, Observable } from 'rxjs'
import { CheerioAPI } from 'cheerio/lib/load'
import { load } from 'cheerio'
import { ILeechService } from '@shared/leech/types/leech'

@Injectable()
export class LeechService implements ILeechService {
  private readonly logger = new Logger(LeechService.name)

  obs: Observable<AxiosResponse>
  html: string
  public $: CheerioAPI

  constructor(private httpService: HttpService) {}

  init(url: string, headers: AxiosRequestHeaders = {}) {
    this.logger.debug('Request to: ' + url)
    this.obs = this.httpService.get(url, {
      headers
    })
    return this.obs
  }

  async get() {
    const time = Date.now()
    this.html = await lastValueFrom<string>(
      this.obs.pipe(
        first(),
        map((data) => data.data)
      )
    )
    this.logger.debug('Response during: ' + (Date.now() - time) + 'ms')
    return this.html
  }

  load() {
    this.$ = load(this.html)
  }

  async auto(url: string, headers: AxiosRequestHeaders = {}) {
    this.init(url, headers)
    await this.get()
    this.load()
  }

  getAttr(selector, attr) {
    return {
      array: () => {
        const list = []
        for (const link of this.$(selector)) {
          list.push(
            this.$(link)
              .attr(attr || 'href')
              .trim()
          )
        }
        return list
      },
      single: () => {
        return this.$(selector)
          .attr(attr || 'href')
          ?.trim()
      }
    }
  }

  getText(selector) {
    return {
      single: () => this.$(selector).first()?.text()?.trim(),
      array: () => {
        const list = []
        for (const link of this.$(selector)) {
          list.push(this.$(link).text()?.trim())
        }
        return list
      }
    }
  }

  getHTML(selector) {
    return this.$(selector).html()
  }
}
