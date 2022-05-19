import { Injectable, Logger } from '@nestjs/common'
import { CreateRequestDto } from './dto/create-request.dto'
import { HttpService } from '@nestjs/axios'
import { AxiosRequestHeaders, AxiosResponse } from 'axios'
import { catchError, firstValueFrom, map, Observable } from 'rxjs'
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
    this.obs = this.httpService.get(url, {
      headers
    })
    return this.obs
  }

  async get() {
    const _sub = this.obs.pipe(
      map((data) => data.data),
      catchError((err) => {
        this.logger.error(err)
        throw 'Error: ' + err
      })
    )

    this.html = await firstValueFrom<string>(_sub)
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

  create(createRequestDto: CreateRequestDto) {
    return 'This action adds a new leech'
  }
}
