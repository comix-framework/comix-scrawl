import { Test, TestingModule } from '@nestjs/testing'
import { LeechService } from '../leech.service'
import { HttpModule } from '@nestjs/axios'

describe('Get home page', () => {
  let service: LeechService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [LeechService]
    }).compile()

    service = module.get<LeechService>(LeechService)
  })

  it('init', () => {
    expect(service.init('http://www.nettruyenco.com/'))
  })

  it('should get a list url', async () => {
    await service.auto('http://www.nettruyenco.com/')
    const links = service.getAttr('.items .item .image a', 'href').array()
    if (!Array.isArray(links)) {
      throw Error('should get a list url')
    }
    console.table(links)
  })
})

describe('Get story single', () => {
  let service: LeechService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [LeechService]
    }).compile()

    service = module.get<LeechService>(LeechService)
  })

  it('should be a title', async () => {
    await service.auto(
      'http://www.nettruyenco.com/truyen-tranh/su-song-sot-cua-ke-chieu-hon-60763'
    )
    expect(
      service.getText('ul.breadcrumb > li:last-child span').single()
    ).toEqual('Sự Sống Sót Của Kẻ Chiêu Hồn')
  })

  it('should get a avatar url', async () => {
    await service.auto(
      'http://www.nettruyenco.com/truyen-tranh/su-song-sot-cua-ke-chieu-hon-60763'
    )
    expect(service.getAttr('.col-image img', 'src').single()).toEqual(
      '//st.nettruyenco.com/data/comics/91/su-song-sot-cua-ke-chieu-hon.jpg'
    )
  })
  // .author .col-xs-8
  it('should get a Author', async () => {
    await service.auto(
      'http://www.nettruyenco.com/truyen-tranh/su-song-sot-cua-ke-chieu-hon-60763'
    )
    expect(service.getText('.author .col-xs-8').single()).toEqual(
      'Đang cập nhật'
    )
  })

  it('should get a list categories', async () => {
    await service.auto(
      'http://www.nettruyenco.com/truyen-tranh/su-song-sot-cua-ke-chieu-hon-60763'
    )

    const categories = service.getText('.kind a').array()
    if (!Array.isArray(categories)) {
      throw new Error('should get a list categories')
    }

    console.table(categories)
  })

  it('should be a content', async () => {
    await service.auto(
      'http://www.nettruyenco.com/truyen-tranh/su-song-sot-cua-ke-chieu-hon-60763'
    )
    expect(
      service.getText('.detail-content .shortened').single()
    ).not.toBeNull()
  })

  it('should be a list chapter', async () => {
    await service.auto(
      'http://www.nettruyenco.com/truyen-tranh/su-song-sot-cua-ke-chieu-hon-60763'
    )
    const chapters = service
      .getAttr('.list-chapter div.chapter a', 'href')
      .array()
    if (!Array.isArray(chapters)) {
      throw new Error('should be a list chapter')
    }
    console.table(chapters)
  })
})

describe('Get chapter single', () => {
  let service: LeechService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [LeechService]
    }).compile()

    service = module.get<LeechService>(LeechService)
  })

  it('should be a title', async () => {
    await service.auto(
      'http://www.nettruyenco.com/truyen-tranh/su-song-sot-cua-ke-chieu-hon/chap-26/854410'
    )
    expect(service.getText('.breadcrumb a.active span').single()).toEqual(
      'Chapter 26'
    )
  })

  it('should be a list image', async () => {
    await service.auto(
      'http://www.nettruyenco.com/truyen-tranh/su-song-sot-cua-ke-chieu-hon/chap-26/854410'
    )

    const images = service
      .getAttr('.reading .reading-detail img', 'src')
      .array()

    if (!Array.isArray(images)) {
      throw new Error('should be a list image')
    }

    console.table(images)
  })
})
