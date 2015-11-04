/*global chrome*/

chrome.downloads.onDeterminingFilename.addListener(
  function(item, suggest) {
    'use strict';

    var filenameWithoutExtension, fileExtensionPosition, filenameMIMEmap;

    filenameMIMEmap = {
      'image/jpeg': '.jpg',
      'image/gif': '.gif',
      'image/png': '.png',
      'image/tiff': '.tiff',
      'image/bmp': '.bmp',
      'image/webp': '.webp',
      'image/x-icon': '.ico'
    };

    fileExtensionPosition = item.filename.lastIndexOf('.');
    filenameWithoutExtension = item.filename;

    if (fileExtensionPosition !== -1)
    {
      filenameWithoutExtension = item.filename.substr(0, fileExtensionPosition);
    }

    if (filenameMIMEmap.hasOwnProperty(item.mime))
    {
      suggest({ filename: filenameWithoutExtension + filenameMIMEmap[item.mime] });
    }
  }
);
