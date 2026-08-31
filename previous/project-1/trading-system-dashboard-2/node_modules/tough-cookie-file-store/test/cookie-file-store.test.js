const chai = require('chai')
const should = require('chai').should()
const expect = require('chai').expect
const fs = require('fs')
const path = require('path')
const { Cookie, Store } = require('tough-cookie')
chai.use(require('chai-datetime'))
let cookieStore
const FileCookieStore = require('../lib/cookie-file-store').FileCookieStore
const cookiesFile = path.join(__dirname, '/cookies.json')
const cookiesFileParseError = path.join(__dirname, '/cookies-parse-error.json')
const cookiesFileEmpty = path.join(__dirname, '/cookies-empty.json')
const expiresDate = new Date('Fri Jan 01 2021 10:00:00 GMT')
const creationDate = new Date('Wed, Jan 2020 10:00:00 GMT')
const lastAccessedDate = creationDate

describe('Test cookie-file-store', function () {
  beforeEach(function () {
    cookieStore = new FileCookieStore(cookiesFile)
  })

  describe('load', function () {
    it('FileCookieStore should be instance of Store class', function (done) {
      expect(cookieStore).to.be.instanceof(Store)
      done()
    })
  })

  describe('#constructor', function () {
    it('Should create object of FileCookieStore class', function (done) {
      expect(cookieStore).to.be.instanceof(FileCookieStore)
      done()
    })

    it('Should throw an error when filePath is undefined', function (done) {
      ;(() => new FileCookieStore()).should.throw(Error, /Unknown/)
      done()
    })

    it('Should throw an error when file can not be parsed', function (done) {
      ;(() => new FileCookieStore(cookiesFileParseError)).should.throw(Error, /Could not parse cookie/)
      done()
    })
  })

  describe('#inspect', function () {
    it('idx should contain object ', function (done) {
      const idx = cookieStore._inspect()
      expect(idx).to.not.eq(null)
      done()
    })
  })

  describe('#findCookie', function () {
    it('Should find a cookie with the given domain, path and key (example.com, /, foo)', function (done) {
      cookieStore.findCookie('example.com', '/', 'foo', function (error, cookie) {
        expect(error).to.eq(null)
        expect(cookie).to.be.instanceof(Cookie)
        expect(cookie.key).to.eq('foo')
        expect(cookie.value).to.eq('foo')
        expect(cookie.expires).to.equalDate(expiresDate)
        expect(cookie.domain).to.eq('example.com')
        expect(cookie.path).to.eq('/')
        expect(cookie.hostOnly).to.eq(false)
        expect(cookie.creation).to.equalDate(creationDate)
        expect(cookie.lastAccessed).to.equalDate(lastAccessedDate)
      })
      done()
    })

    it('Should not find a cookie with the given domain, path and key (foo.com, /, bar)', function (done) {
      cookieStore.findCookie('foo.com', '/', 'bar', function (error, cookie) {
        expect(error).to.eq(null)
        expect(cookie).to.eq(undefined)
      })
      done()
    })

    it('Should not find a cookie with the given domain, path and key (example.com, /home, bar)', function (done) {
      cookieStore.findCookie('example.com', '/home', 'bar', function (error, cookie) {
        expect(error).to.eq(null)
        expect(cookie).to.eq(undefined)
      })
      done()
    })

    it('Should not find a cookie with the given domain, path and key (exmaple.com, /, c)', function (done) {
      cookieStore.findCookie('example.com', '/', 'c', function (error, cookie) {
        expect(error).to.eq(null)
        expect(cookie).to.eq(null)
      })
      done()
    })
  })

  describe('#findCookies', function () {
    it('Should find cookies matching the given domain and path (example.com, all paths)', function (done) {
      cookieStore.findCookies('example.com', null, function (error, cookies) {
        expect(error).to.eq(null)
        expect(cookies).to.be.an('array')
        expect(cookies).to.have.lengthOf(2)
        expect(cookies[0]).to.be.instanceof(Cookie)
        expect(cookies[0].key).to.eq('foo')
        expect(cookies[0].value).to.eq('foo')
        expect(cookies[0].expires).to.equalDate(expiresDate)
        expect(cookies[0].domain).to.eq('example.com')
        expect(cookies[0].path).to.eq('/')
        expect(cookies[0].hostOnly).to.eq(false)
        expect(cookies[0].creation).to.equalDate(creationDate)
        expect(cookies[0].lastAccessed).to.equalDate(lastAccessedDate)
      })
      done()
    })

    it('Should find cookies matching the given domain and path (example.com, /login)', function (done) {
      cookieStore.findCookies('example.com', '/login', function (error, cookies) {
        expect(error).to.eq(null)
        expect(cookies).to.be.an('array')
        expect(cookies).to.have.lengthOf(2)
        expect(cookies[1]).to.be.instanceof(Cookie)
        expect(cookies[1].key).to.eq('bar')
        expect(cookies[1].value).to.eq('bar')
        expect(cookies[1].expires).to.equalDate(expiresDate)
        expect(cookies[1].domain).to.eq('example.com')
        expect(cookies[1].path).to.eq('/login')
        expect(cookies[1].hostOnly).to.eq(false)
        expect(cookies[1].creation).to.equalDate(creationDate)
        expect(cookies[1].lastAccessed).to.equalDate(lastAccessedDate)
      })
      done()
    })

    it('Should not find cookies matching the given domain and path (foo.com, all paths)', function (done) {
      cookieStore.findCookies('foo.com', '/', function (error, cookies) {
        expect(error).to.eq(null)
        expect(cookies).to.be.an('array')
        expect(cookies).to.have.lengthOf(0)
      })
      done()
    })

    it('Should not find cookies matching the given domain and path (no domain)', function (done) {
      cookieStore.findCookies(null, '/', function (error, cookies) {
        expect(error).to.eq(null)
        expect(cookies).to.be.an('array')
        expect(cookies).to.have.lengthOf(0)
      })
      done()
    })

    it('Should not find cookies matching the given domain (.local domain)', function (done) {
      cookieStore.findCookies('.local', '/', function (error, cookies) {
        expect(error).to.eq(null)
        expect(cookies).to.be.an('array')
        expect(cookies).to.have.lengthOf(0)
      })
      done()
    })

    it('Should not find cookies matching the given domain and path (no domain)', function (done) {
      cookieStore.findCookies(null, '/', null, function (error, cookies) {
        expect(error).to.eq(null)
        expect(cookies).to.be.an('array')
        expect(cookies).to.have.lengthOf(0)
      })
      done()
    })
  })

  describe('#putCookie', function () {
    after(function () {
      fs.writeFileSync(cookiesFileEmpty, '{}', { encoding: 'utf8', flag: 'w' })
    })

    it('Should add a new "baz" cookie to the store', function (done) {
      const cookie = Cookie.parse('baz=baz; Domain=example.com; Path=/')
      cookie.expires = expiresDate
      cookie.creation = creationDate
      cookie.lastAccessed = lastAccessedDate
      cookieStore.putCookie(cookie, function () {
        cookieStore.findCookie('example.com', '/', 'baz', function (error, cookie) {
          expect(error).to.eq(null)
          expect(cookie).to.be.instanceof(Cookie)
          expect(cookie.key).to.eq('baz')
          expect(cookie.value).to.eq('baz')
          expect(cookie.expires).to.equalDate(expiresDate)
          expect(cookie.domain).to.eq('example.com')
          expect(cookie.path).to.eq('/')
          expect(cookie.creation).to.equalDate(creationDate)
          expect(cookie.lastAccessed).to.equalDate(lastAccessedDate)
          cookieStore.removeCookie('example.com', '/', 'baz', function () {})
        })
      })
      done()
    })

    it('Should add a new "baz" cookie to the store', function (done) {
      const cookie = Cookie.parse('baz=baz; Domain=example.com; Path=/')
      cookie.expires = expiresDate
      cookie.creation = creationDate
      cookie.lastAccessed = lastAccessedDate
      cookieStore = new FileCookieStore(cookiesFileEmpty)
      cookieStore.putCookie(cookie, function () {
        cookieStore.findCookie('example.com', '/', 'baz', function (error, cookie) {
          expect(error).to.eq(null)
          expect(cookie).to.be.instanceof(Cookie)
          expect(cookie.key).to.eq('baz')
          expect(cookie.value).to.eq('baz')
          expect(cookie.expires).to.equalDate(expiresDate)
          expect(cookie.domain).to.eq('example.com')
          expect(cookie.path).to.eq('/')
          expect(cookie.creation).to.equalDate(creationDate)
          expect(cookie.lastAccessed).to.equalDate(lastAccessedDate)
        })
      })
      done()
    })
  })

  describe('#updateCookie', function () {
    after(function () {
      const cookie = Cookie.parse('foo=foo; Domain=example.com; Path=/')
      cookie.expires = expiresDate
      cookie.creation = creationDate
      cookie.hostOnly = false
      cookie.lastAccessed = lastAccessedDate
      cookieStore.putCookie(cookie, function () {})
    })

    it('Should update the value of an existing "foo" cookie', function (done) {
      const oldCookie = Cookie.parse('foo=foo; Domain=example.com; Path=/')
      oldCookie.expires = expiresDate
      oldCookie.creation = creationDate
      oldCookie.hostOnly = false
      oldCookie.lastAccessed = lastAccessedDate
      const newCookie = oldCookie
      newCookie.value = 'bar'
      cookieStore.updateCookie(oldCookie, newCookie, function () {
        cookieStore.findCookie('example.com', '/', 'foo', function (error, cookie) {
          expect(error).to.eq(null)
          expect(cookie).to.be.instanceof(Cookie)
          expect(cookie.key).to.eq('foo')
          expect(cookie.value).to.eq('bar')
          expect(cookie.expires).to.equalDate(expiresDate)
          expect(cookie.domain).to.eq('example.com')
          expect(cookie.path).to.eq('/')
          expect(cookie.creation).to.equalDate(creationDate)
          expect(cookie.lastAccessed).to.equalDate(lastAccessedDate)
        })
      })
      done()
    })
  })

  describe('#removeCookie', function () {
    it('Should remove a cookie from the store', function (done) {
      const cookie = Cookie.parse('foo=foo; Domain=example.com; Path=/')
      cookieStore = new FileCookieStore(cookiesFileEmpty)
      cookieStore.putCookie(cookie, function () {})
      cookieStore.removeCookie('example.com', '/', 'foo', function () {
        cookieStore.findCookies('example.com', '/', function (error, cookies) {
          expect(error).to.eq(null)
          expect(cookies).to.be.an('array')
          expect(cookies).to.have.lengthOf(0)
        })
      })
      done()
    })
  })

  describe('#removeCookies', function () {
    it('Should remove matching cookies from the store (domain + path)', function (done) {
      const fooCookie = Cookie.parse('foo=foo; Domain=example.com; Path=/')
      const barCookie = Cookie.parse('bar=bar; Domain=example.com; Path=/bar')
      cookieStore = new FileCookieStore(cookiesFileEmpty)
      cookieStore.putCookie(fooCookie, function () {})
      cookieStore.putCookie(barCookie, function () {})
      cookieStore.removeCookies('example.com', '/', function () {
        cookieStore.findCookies('example.com', '/', function (error, cookies) {
          expect(error).to.eq(null)
          expect(cookies).to.be.an('array')
          expect(cookies).to.have.lengthOf(0)
        })
      })
      done()
    })

    it('Should remove matching cookies from the store (domain)', function (done) {
      const fooCookie = Cookie.parse('foo=foo; Domain=example.com; Path=/')
      const barCookie = Cookie.parse('bar=bar; Domain=example.com; Path=/bar')
      cookieStore = new FileCookieStore(cookiesFileEmpty)
      cookieStore.putCookie(fooCookie, function () {})
      cookieStore.putCookie(barCookie, function () {})
      cookieStore.removeCookies('example.com', null, function () {
        cookieStore.findCookies('example.com', null, function (error, cookies) {
          expect(error).to.eq(null)
          expect(cookies).to.be.an('array')
          expect(cookies).to.have.lengthOf(0)
        })
      })
      done()
    })
  })

  describe('#removeAllCookies', function () {
    it('Should remove all cookies from the store', function (done) {
      const fooCookie = Cookie.parse('foo=foo; Domain=example.com; Path=/')
      const barCookie = Cookie.parse('bar=bar; Domain=example.com; Path=/bar')
      cookieStore = new FileCookieStore(cookiesFileEmpty)
      cookieStore.putCookie(fooCookie, function () {})
      cookieStore.putCookie(barCookie, function () {})
      cookieStore.removeAllCookies(function () {
        cookieStore.findCookies('example.com', '/', function (error, cookies) {
          expect(error).to.eq(null)
          expect(cookies).to.be.an('array')
          expect(cookies).to.have.lengthOf(0)
        })
      })
      done()
    })
  })

  describe('#getAllCookies', function () {
    after(function () {
      fs.writeFileSync(cookiesFileEmpty, '{}', { encoding: 'utf8', flag: 'w' })
    })

    it('Should return an "Array" of cookies', function (done) {
      cookieStore.getAllCookies(function (error, cookies) {
        expect(error).to.eq(null)
        expect(cookies).to.be.an('array')
        expect(cookies).to.have.lengthOf(2)
      })
      done()
    })

    it('Should return an "Array" of cookies', function (done) {
      const fooCookie = Cookie.parse('foo=foo; Domain=example.com; Path=/')
      const barCookie = Cookie.parse('bar=bar; Domain=example.com; Path=/bar')
      fooCookie.creationIndex = null
      barCookie.creationIndex = null
      cookieStore = new FileCookieStore(cookiesFileEmpty)
      cookieStore.putCookie(fooCookie, function () {})
      cookieStore.putCookie(barCookie, function () {})
      cookieStore.getAllCookies(function (error, cookies) {
        expect(error).to.eq(null)
        expect(cookies).to.be.an('array')
        expect(cookies).to.have.lengthOf(2)
      })
      done()
    })
  })
})
