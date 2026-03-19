'use strict'
const { Store, permuteDomain, pathMatch, Cookie } = require('tough-cookie')
const util = require('util')
const fs = require('fs')

/**
 * Class representing a JSON file store.
 *
 * @augments Store
 */
class FileCookieStore extends Store {
  /**
   * Creates a new JSON file store in the specified file.
   *
   * @param {string} filePath - The file in which the store will be created.
   */
  constructor (filePath) {
    super()
    this.synchronous = true
    this.idx = {}
    this.filePath = filePath
    /* istanbul ignore else  */
    if (util.inspect.custom) {
      this[util.inspect.custom] = this._inspect
    }
    const self = this
    /* istanbul ignore else  */
    if (!filePath) {
      throw new Error('Unknown file for read/write cookies')
    }
    this._loadFromFile(this.filePath, function (dataJson) {
      /* istanbul ignore else  */
      if (dataJson) self.idx = dataJson
    })
  }

  /**
   * The findCookie callback.
   *
   * @callback FileCookieStore~findCookieCallback
   * @param {Error} error - The error if any.
   * @param {Cookie} cookie - The cookie found.
   */

  /**
   * Retrieve a cookie with the given domain, path and key.
   *
   * @param {string} domain - The cookie domain.
   * @param {string} path - The cookie path.
   * @param {string} key - The cookie key.
   * @param {FileCookieStore~findCookieCallback} cb - The callback.
   */
  findCookie (domain, path, key, cb) {
    if (!this.idx[domain]) {
      cb(null, undefined)
    } else if (!this.idx[domain][path]) {
      cb(null, undefined)
    } else {
      cb(null, this.idx[domain][path][key] || null)
    }
  }

  /**
   * The findCookies callback.
   *
   * @callback FileCookieStore~allowSpecialUseDomainCallback
   * @param {Error} error - The error if any.
   * @param {Cookie[]} cookies - Array of cookies.
   */

  /**
   * The findCookies callback.
   *
   * @callback FileCookieStore~findCookiesCallback
   * @param {Error} error - The error if any.
   * @param {Cookie[]} cookies - Array of cookies.
   */

  /**
   * Locates cookies matching the given domain and path.
   *
   * @param {string} domain - The cookie domain.
   * @param {string} path - The cookie path.
   * @param {FileCookieStore~allowSpecialUseDomainCallback} allowSpecialUseDomain - The callback.
   * @param {FileCookieStore~findCookiesCallback} cb - The callback.
   */
  findCookies (domain, path, allowSpecialUseDomain, cb) {
    const results = []

    if (typeof allowSpecialUseDomain === 'function') {
      cb = allowSpecialUseDomain
      allowSpecialUseDomain = false
    }

    if (!domain) {
      cb(null, [])
    }

    let pathMatcher
    if (!path) {
      pathMatcher = function matchAll (domainIndex) {
        for (const curPath in domainIndex) {
          const pathIndex = domainIndex[curPath]
          for (const key in pathIndex) {
            results.push(pathIndex[key])
          }
        }
      }
    } else {
      pathMatcher = function matchRFC (domainIndex) {
        Object.keys(domainIndex).forEach(cookiePath => {
          if (pathMatch(path, cookiePath)) {
            const pathIndex = domainIndex[cookiePath]
            for (const key in pathIndex) {
              results.push(pathIndex[key])
            }
          }
        })
      }
    }

    const domains = permuteDomain(domain, allowSpecialUseDomain) || [domain]
    const idx = this.idx
    domains.forEach(curDomain => {
      const domainIndex = idx[curDomain]
      if (!domainIndex) {
        return
      }
      pathMatcher(domainIndex)
    })

    cb(null, results)
  }

  /**
   * The putCookie callback.
   *
   * @callback FileCookieStore~putCookieCallback
   * @param {Error} error - The error if any.
   */

  /**
   * Adds a new cookie to the store.
   *
   * @param {Cookie} cookie - The cookie.
   * @param {FileCookieStore~putCookieCallback} cb - The callback.
   */
  putCookie (cookie, cb) {
    if (!this.idx[cookie.domain]) {
      this.idx[cookie.domain] = {}
    }
    if (!this.idx[cookie.domain][cookie.path]) {
      this.idx[cookie.domain][cookie.path] = {}
    }
    this.idx[cookie.domain][cookie.path][cookie.key] = cookie
    this._saveToFile(this.filePath, this.idx, function () {
      cb(null)
    })
  }

  /**
   * The updateCookie callback.
   *
   * @callback FileCookieStore~updateCookieCallback
   * @param {Error} error - The error if any.
   */

  /**
   * Update an existing cookie.
   *
   * @param {Cookie} oldCookie - The old cookie.
   * @param {Cookie} newCookie - The new cookie.
   * @param {FileCookieStore~updateCookieCallback} cb - The callback.
   */
  updateCookie (oldCookie, newCookie, cb) {
    this.putCookie(newCookie, cb)
  }

  /**
   * The removeCookie callback.
   *
   * @callback FileCookieStore~removeCookieCallback
   * @param {Error} error - The error if any.
   */

  /**
   * Remove a cookie from the store.
   *
   * @param {string} domain - The cookie domain.
   * @param {string} path - The cookie path.
   * @param {string} key - The cookie key.
   * @param {FileCookieStore~removeCookieCallback} cb - The callback.
   */
  removeCookie (domain, path, key, cb) {
    /* istanbul ignore else  */
    if (this.idx[domain] && this.idx[domain][path] && this.idx[domain][path][key]) {
      delete this.idx[domain][path][key]
    }
    this._saveToFile(this.filePath, this.idx, function () {
      cb(null)
    })
  }

  /**
   * The removeCookies callback.
   *
   * @callback FileCookieStore~removeCookiesCallback
   * @param {Error} error - The error if any.
   */

  /**
   * Removes matching cookies from the store.
   *
   * @param {string} domain - The cookie domain.
   * @param {string} path - The cookie path.
   * @param {FileCookieStore~removeCookiesCallback} cb - The callback.
   */
  removeCookies (domain, path, cb) {
    /* istanbul ignore else  */
    if (this.idx[domain]) {
      if (path) {
        delete this.idx[domain][path]
      } else {
        delete this.idx[domain]
      }
    }
    this._saveToFile(this.filePath, this.idx, function () {
      cb(null)
    })
  }

  /**
   * The removeAllCookies callback.
   *
   * @callback FileCookieStore~removeAllCookiesCallback
   * @param {Error} error - The error if any.
   */

  /**
   * Removes all cookies from the store.
   *
   * @param {FileCookieStore~removeAllCookiesCallback} cb - The callback.
   */
  removeAllCookies (cb) {
    this.idx = {}
    this._saveToFile(this.filePath, this.idx, function () {
      cb(null)
    })
  }

  /**
   * The getAllCookies callback.
   *
   * @callback FileCookieStore~getAllCookiesCallback
   * @param {Error} error - The error if any.
   * @param {Array} cookies - An array of cookies.
   */

  /**
   * Produces an Array of all cookies from the store.
   *
   * @param {FileCookieStore~getAllCookiesCallback} cb - The callback.
   */
  getAllCookies (cb) {
    const cookies = []
    const idx = this.idx

    const domains = Object.keys(idx)
    domains.forEach(domain => {
      const paths = Object.keys(idx[domain])
      paths.forEach(path => {
        const keys = Object.keys(idx[domain][path])
        keys.forEach(key => {
          /* istanbul ignore else  */
          if (key !== null) {
            cookies.push(idx[domain][path][key])
          }
        })
      })
    })

    cookies.sort((a, b) => {
      return (a.creationIndex || 0) - (b.creationIndex || 0)
    })

    cb(null, cookies)
  }

  /**
   * Returns a string representation of the store object for debugging purposes.
   *
   * @returns {string} - The string representation of the store.
   * @private
   */
  _inspect () {
    return `{ idx: ${util.inspect(this.idx, false, 2)} }`
  }

  /**
   * The loadFromFile callback.
   *
   * @callback FileCookieStore~loadFromFileCallback
   * @param {object} dataJson - The content of the store.
   */

  /**
   * Load the store from file.
   *
   * @param {string} filePath - The file in which the store will be created.
   * @param {FileCookieStore~loadFromFileCallback} cb - The callback.
   * @private
   */
  _loadFromFile (filePath, cb) {
    let data = null
    let dataJson = null

    /* istanbul ignore else  */
    if (fs.existsSync(filePath)) {
      data = fs.readFileSync(filePath, 'utf8')
    }

    /* istanbul ignore else  */
    if (data) {
      try {
        dataJson = JSON.parse(data)
      } catch (e) {
        throw new Error(`Could not parse cookie file ${filePath}. Please ensure it is not corrupted.`)
      }
    }

    for (const domainName in dataJson) {
      for (const pathName in dataJson[domainName]) {
        for (const cookieName in dataJson[domainName][pathName]) {
          dataJson[domainName][pathName][cookieName] = Cookie.fromJSON(
            JSON.stringify(dataJson[domainName][pathName][cookieName])
          )
        }
      }
    }

    cb(dataJson)
  }

  /**
   * The saveToFile callback.
   *
   * @callback FileCookieStore~saveToFileCallback
   */

  /**
   * Saves the store to a file.
   *
   * @param {string} filePath - The file in which the store will be created.
   * @param {object} data - The data to be saved.
   * @param {FileCookieStore~saveToFileCallback} cb - The callback.
   * @private
   */
  _saveToFile (filePath, data, cb) {
    fs.writeFileSync(filePath, JSON.stringify(data))
    cb()
  }
}

exports.FileCookieStore = FileCookieStore
