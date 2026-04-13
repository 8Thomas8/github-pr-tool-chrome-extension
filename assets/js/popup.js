document.addEventListener('DOMContentLoaded', () => {
  const addClickListener = (btnId, action) => {
    const btn = document.getElementById(btnId)
    if (btn) {
      btn.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action })
        })
      })
    }
  }

  addClickListener('check-all-files-btn', 'checkAll')
  addClickListener('uncheck-all-files-btn', 'uncheckAll')

  chrome.storage.local.get('updateNotification').then((result) => {
    const notification = result.updateNotification
    if (!notification) return

    const link = document.getElementById('update-link')
    const versionEl = document.getElementById('update-version')
    if (!link || !versionEl) return

    versionEl.textContent = `v${notification.version}`
    link.href = `https://github.com/8Thomas8/github-pr-tool-chrome-extension/releases/tag/${notification.version}`
    link.hidden = false

    link.addEventListener('click', () => {
      chrome.storage.local.remove('updateNotification')
    })
  })
})
