/* global chrome, getFilenameForDownloadItem */
'use strict'

chrome.downloads.onDeterminingFilename.addListener(
  function (downloadItem, suggest) {
    const suggestedFilename = getFilenameForDownloadItem(downloadItem)

    if (suggestedFilename !== null) {
      suggest({ filename: suggestedFilename })
    }

    // suggest() will be called automatically at this point if not yet called
  }
)
