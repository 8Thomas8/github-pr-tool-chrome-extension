let currentController = null

chrome.runtime.onMessage.addListener(async (request) => {
  if (currentController) {
    currentController.abort()
  }
  currentController = new AbortController()
  const { signal } = currentController

  const newExperience = {
    checkAll: 'button[type="button"][aria-pressed="false"][class*="prc-Button-ButtonBase-"]',
    uncheckAll: 'button[type="button"][aria-pressed="true"][class*="prc-Button-ButtonBase-"]',
  }

  const classicExperience = {
    checkAll: 'input.js-reviewed-checkbox:not(:checked)',
    uncheckAll: 'input.js-reviewed-checkbox:checked',
  }

  const selector = [newExperience, classicExperience]
    .map((exp) => exp[request.action])
    .filter(Boolean)
    .join(', ')

  if (selector) {
    const countTotal = () =>
      document.querySelectorAll(selector).length +
      document.querySelectorAll('[data-gprt-processed="1"]').length
    chrome.runtime.sendMessage({ type: 'progress', processed: 0, total: countTotal() })
    await processElements(selector, signal, 6, (processed) => {
      chrome.runtime.sendMessage({ type: 'progress', processed, total: countTotal() })
    })
    chrome.runtime.sendMessage({ type: 'done' })
  }
})

async function processElements(selector, signal, maxRetries = 6, onProgress) {
  let processed = 0
  let attempt = 0
  while (attempt < maxRetries) {
    if (signal.aborted) break

    const seen = new Set()
    const elements = [...document.querySelectorAll(selector)].filter(
      (el) => !seen.has(el) && seen.add(el)
    )

    if (elements.length === 0) break
    let clickedThisRound = 0
    for (const el of elements) {
      if (signal.aborted) break
      try {
        el.scrollIntoView({ behavior: 'auto', block: 'center' })
        el.click()
        el.setAttribute('data-gprt-processed', '1')
        clickedThisRound++
        processed++
        onProgress?.(processed)
        await delay(150)
      } catch {
        // ignore errors to continue
      }
    }
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
