const showUpdateBadge = () => {
  chrome.action.setBadgeText({ text: '1' })
  chrome.action.setBadgeBackgroundColor({ color: '#0969da' })
}

const clearUpdateBadge = () => {
  chrome.action.setBadgeText({ text: '' })
}

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'update') {
    const currentVersion = chrome.runtime.getManifest().version
    chrome.storage.local.set({
      updateNotification: {
        version: currentVersion,
        previousVersion: details.previousVersion,
      },
    })
    showUpdateBadge()
  }
})

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get('updateNotification').then((result) => {
    if (result.updateNotification) {
      showUpdateBadge()
    }
  })
})

chrome.storage.onChanged.addListener((changes) => {
  if (changes.updateNotification && !changes.updateNotification.newValue) {
    clearUpdateBadge()
  }
})
