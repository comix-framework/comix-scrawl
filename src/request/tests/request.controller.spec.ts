import { Test, TestingModule } from '@nestjs/testing'
import { RequestController } from '../request.controller'
import { RequestService } from '../request.service'
import { HttpModule } from '@nestjs/axios'
import {
  catchError,
  firstValueFrom,
  lastValueFrom,
  map,
  max,
  take,
  tap
} from 'rxjs'
import * as cheerio from 'cheerio'
import { data } from 'cheerio/lib/api/attributes'

describe('RequestService', () => {
  let controller: RequestController
  let services: RequestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [RequestController],
      providers: [RequestService]
    }).compile()

    controller = module.get<RequestController>(RequestController)
    services = module.get<RequestService>(RequestService)
  })

  it('request home', (done) => {
    try {
      const obs = services
        .get('http://www.nettruyenco.com')
        .pipe(
          map((data) => data.data),
          catchError((err) => {
            throw 'Error: ' + err // Use console.log(err) for detail
          })
        )
        .subscribe((data) => {
          console.log('ok')
          done()
        })
    } catch (e) {
      console.log('lỗi')
    }
  }, 1500)
})
