chrome.runtime.onMessage.addListener(async (request) => {
  const actions = {
    checkAll: {
      selector: 'label.js-reviewed-toggle.color-border-muted',
    },
    uncheckAll: {
      selector: 'label.js-reviewed-toggle.color-border-accent',
    },
  }

  if (actions[request.action]) {
    await processElements(actions[request.action].selector)
  }
})

async function processElements(selector) {
  const elements = document.querySelectorAll(selector)
  for (const element of elements) {
    element.click()
    await delay(150)
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
