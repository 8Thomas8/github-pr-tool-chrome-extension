chrome.runtime.onMessage.addListener(async (request) => {
  // prc-Button-ButtonBase-c50BI is a maybe be a generated class name, it may change in the future
  const actions = {
    checkAll: {
      selector: 'button[type="button"][aria-pressed="false"][class*="prc-Button-ButtonBase-"]',
    },
    uncheckAll: {
      selector: 'button[type="button"][aria-pressed="true"][class*="prc-Button-ButtonBase-"]',
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
