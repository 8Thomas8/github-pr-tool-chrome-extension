chrome.commands.onCommand.addListener((command) => {
  if (command === 'check-all-files') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'checkAll' })
    })
  } else if (command === 'uncheck-all-files') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'uncheckAll' })
    })
  }
})
