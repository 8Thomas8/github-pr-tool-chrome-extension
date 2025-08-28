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
})
