chrome.commands.onCommand.addListener((command) => {
  let action = ''

  if (command === 'check-all-files') {
    action = 'checkAll'
  } else if (command === 'uncheck-all-files') {
    action = 'uncheckAll'
  }

  if (action) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action })
      }
    })
  }
})
