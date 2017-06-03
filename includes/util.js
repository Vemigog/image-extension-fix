/* global URL, extensionMapping */
/* eslint no-unused-vars: ['error', { 'varsIgnorePattern': 'getFilenameForDownloadItem' }] */

function getHostname ({ stringURL, includeSubdomain = true }) {
  const fullHostname = new URL(stringURL).hostname
  const hostnameTld = fullHostname.substr(fullHostname.lastIndexOf('.'))
  const hostnameNoTld = fullHostname.substr(0, fullHostname.lastIndexOf('.'))
  const subdomainEndPos = hostnameNoTld.lastIndexOf('.')
  let baseHostname

  if (subdomainEndPos !== -1) {
    baseHostname = hostnameNoTld.substr(subdomainEndPos + 1).concat(hostnameTld)
  } else {
    baseHostname = fullHostname
  }

  return (includeSubdomain) ? fullHostname : baseHostname
}

function getFilenameInfo (filename) {
  const extensionPos = filename.lastIndexOf('.')
  let fileBasename, fileExtension

  if (extensionPos !== -1) {
    fileBasename = filename.substr(0, extensionPos)
    fileExtension = filename.substr(extensionPos - 1)
  } else {
    fileBasename = filename
    fileExtension = null
  }

  return {
    basename: fileBasename,
    extension: fileExtension
  }
}

function getFilenameForDownloadItem (downloadItem) {
  const filenameInfo = getFilenameInfo(downloadItem.filename)

  const matchedRule = extensionMapping.filter((rule) => {
    if (!rule.hasOwnProperty('matchMIME') ||
       (rule.hasOwnProperty('matchMIME') &&
        rule.matchMIME !== downloadItem.mime)) return false

    if (rule.hasOwnProperty('matchExtension') &&
       (rule.matchExtension !== filenameInfo.extension)) return false

    if (rule.hasOwnProperty('matchDomains') &&
        isDomainMatchedRuleForDownloadItem({
          matchDomains: rule.matchDomains,
          downloadItem: downloadItem }).length < 1) return false

    if (!rule.hasOwnProperty('suggestExtension')) return false

    return true
  })[0]

  if (typeof matchedRule !== 'undefined') {
    return filenameInfo.basename.concat(matchedRule.suggestExtension)
  } else {
    return null
  }
}

function isDomainMatchedRuleForDownloadItem ({ matchDomains, downloadItem }) {
  let ruleValidated = false
  const candidateURLs = (downloadItem.hasOwnProperty('finalUrl'))
    ? [downloadItem.url, downloadItem.finalUrl]
    : [downloadItem.url]

  candidateURLs.some((candidateURL) => {
    const candidateHostnameFull = getHostname({stringURL: candidateURL})
    const candidateHostnameBase = getHostname({stringURL: candidateURL, includeSubdomain: false})

    if (matchDomains.includes(candidateHostnameFull) ||
        matchDomains.includes('*'.concat(candidateHostnameBase))) {
      ruleValidated = true
      return true
    }
  })

  return ruleValidated
}
