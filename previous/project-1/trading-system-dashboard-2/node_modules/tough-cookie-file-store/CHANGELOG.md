# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v2.0.3] - 2020-09-28
### Changed
- Replaced Travis CI by Github Actions

## [v2.0.2] - 2020-05-16
### Fixed
- [#9][1] missed inspect rename from b27a42bc

## [v2.0.1] - 2020-05-05
### Fixed
- [#7][0] findCookies is incompatible with tough-cookie 4

## [v2.0.0] - 2020-05-03
### Added
- `tough-cookie@4` support.
- Code style: ESLint + Standard + Prettier.
- Test coverage.
- JSDoc documentation.

### Changed
- Refactored module.

### Removed
- Removed isEmtpy() and isExpired() methods in favor of pure implementation of Store class.

## [v1.2.0] - 2016-08-09
### Added
- Added getAllCookies() method.

### Changed
- Updated tough-cookie dependency.

### Fixed
- Avoid redundant fs.writeFile() operations on same file.

## [v1.1.1] - 2016-08-09
### Changed
- Updated tough-cookie dependency.

## [v1.1.0] - 2016-02-10
### Added
- Added isEmpty() method.

## [v1.0.0] - 2016-02-10
- Initial version.

[unreleased]: https://github.com/ivanmarban/tough-cookie-file-store/compare/v2.0.3...develop
[v2.0.2]: https://github.com/ivanmarban/tough-cookie-file-store/compare/v2.0.2...v2.0.3
[v2.0.2]: https://github.com/ivanmarban/tough-cookie-file-store/compare/v2.0.1...v2.0.2
[v2.0.1]: https://github.com/ivanmarban/tough-cookie-file-store/compare/v2.0.0...v2.0.1
[v2.0.0]: https://github.com/ivanmarban/tough-cookie-file-store/compare/v1.2.0...v2.0.0
[v1.2.0]: https://github.com/ivanmarban/tough-cookie-file-store/compare/v1.1.1...v1.2.0
[v1.1.1]: https://github.com/ivanmarban/tough-cookie-file-store/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/ivanmarban/tough-cookie-file-store/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/ivanmarban/tough-cookie-file-store/releases/tag/v1.0.0
[0]: https://github.com/ivanmarban/tough-cookie-file-store/issues/7
[1]: https://github.com/ivanmarban/tough-cookie-file-store/pull/9
