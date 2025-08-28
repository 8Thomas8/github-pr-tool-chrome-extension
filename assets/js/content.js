chrome.runtime.onMessage.addListener(async (request) => {
  // prc-Button-ButtonBase-c50BI is a maybe be a generated class name, it may change in the future
  const actions = {
    checkAll: {
      selector:
        'label.js-reviewed-toggle.color-border-muted, button[type="button"][aria-pressed="false"].prc-Button-ButtonBase-c50BI',
    },
    uncheckAll: {
      selector:
        'label.js-reviewed-toggle.color-border-accent, button[type="button"][aria-pressed="true"].prc-Button-ButtonBase-c50BI',
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
