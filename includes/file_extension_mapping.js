/* eslint no-unused-vars: ['error', { 'varsIgnorePattern': 'extensionMapping' }] */

/* Extension mapping rules follow the format:
   {
     matchMIME:        'text/html', // Match on this MIME only
     matchExtension:   '.gifv',    // (optional) Match on this extension only
     matchDomains:     [
                         '*.imgur.com',
                         'i.imgur.com',
                         'imgur.com'
                       ]        // (optional) Match on these domains only
     suggestExtension: '.gif', // Extension to suggest
   }
*/

const extensionMapping = [
  {
    matchMIME: 'text/html',
    matchExtension: '.gifv',
    matchDomains: ['*.imgur.com'],
    suggestExtension: '.mp4'
  },
  {
    matchMIME: 'image/bmp',
    suggestExtension: '.bmp'
  },
  {
    matchMIME: 'image/gif',
    suggestExtension: '.gif'
  },
  {
    matchMIME: 'image/jpeg',
    suggestExtension: '.jpg'
  },
  {
    matchMIME: 'image/png',
    suggestExtension: '.png'
  },
  {
    matchMIME: 'image/svg+xml',
    suggestExtension: '.svg'
  },
  {
    matchMIME: 'image/tiff',
    suggestExtension: '.tiff'
  },
  {
    matchMIME: 'image/webp',
    suggestExtension: '.webp'
  },
  {
    matchMIME: 'image/webp',
    suggestExtension: '.webp'
  },
  {
    matchMIME: 'image/x-icon',
    suggestExtension: '.ico'
  }
]
