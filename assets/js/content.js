chrome.runtime.onMessage.addListener(async (request) => {
  const actions = {
    checkAll: {
      selector: 'button[type="button"][aria-pressed="false"][class*="prc-Button-ButtonBase-"]',
    },
    uncheckAll: {
      selector: 'button[type="button"][aria-pressed="true"][class*="prc-Button-ButtonBase-"]',
    },
  }

  const action = actions[request.action]
  if (action) {
    await processElements(action.selector)
  }
})

async function processElements(selector, maxRetries = 6) {
  let processed = 0
  let attempt = 0
  while (attempt < maxRetries) {
    const seen = new Set()
    const elements = [...document.querySelectorAll(selector)].filter(
      (el) => !seen.has(el) && seen.add(el)
    )

    if (elements.length === 0) break
    let clickedThisRound = 0
    for (const el of elements) {
      try {
        el.scrollIntoView({ behavior: 'auto', block: 'center' })
        el.click()
        el.setAttribute('data-gprt-processed', '1')
        clickedThisRound++
        await delay(150)
      } catch {
        // ignore errors to continue
      }
    }
    processed += clickedThisRound
    if (clickedThisRound === 0) break
    attempt++
    await delay(300)
  }
  document
    .querySelectorAll('[data-gprt-processed="1"]')
    .forEach((el) => el.removeAttribute('data-gprt-processed'))
  return processed
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
