import { Injectable } from '@nestjs/common'
import { SiteService } from '@shared/site/site.service'
import { LeechService } from '@shared/leech/leech.service'

@Injectable()
export class NettruyenService extends SiteService {
  constructor(readonly leechService: LeechService) {
    super(
      leechService,
      {
        name: 'ul.breadcrumb > li:last-child span',
        avatar: '.col-image img',
        author: '.author .col-xs-8',
        categories: '.kind a',
        content: '.detail-content .shortened',
        chapters: '.list-chapter div.chapter a'
      },
      {
        name: '.breadcrumb a.active span',
        images: '.reading .reading-detail img'
      }
    )
  }
}
