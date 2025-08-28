document.addEventListener('DOMContentLoaded', function () {
  const checkAllBtn = document.getElementById('check-all-files-btn')
  const uncheckAllBtn = document.getElementById('uncheck-all-files-btn')

  checkAllBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'checkAll' })
    })
  })

  uncheckAllBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'uncheckAll' })
    })
  })
})
