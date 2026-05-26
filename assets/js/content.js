if (!window.__gprtContentLoaded) {
  window.__gprtContentLoaded = true

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
      await processElements(selector, signal, 6, (processed, total) => {
        chrome.runtime.sendMessage({ type: 'progress', processed, total })
      })
      chrome.runtime.sendMessage({ type: 'done' })
    }
  })

  async function processElements(selector, signal, maxRetries, onProgress) {
    const targets = new Set()
    const done = new Set()
    const discover = () => document.querySelectorAll(selector).forEach((el) => targets.add(el))

    discover()
    onProgress(0, targets.size)

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      if (signal.aborted) return

      discover()
      const pending = [...targets].filter((el) => !done.has(el) && el.isConnected)
      if (pending.length === 0) return

      let clicked = 0
      for (const el of pending) {
        if (signal.aborted) return
        try {
          el.scrollIntoView({ behavior: 'auto', block: 'center' })
          el.click()
          done.add(el)
          clicked++
          onProgress(done.size, targets.size)
          await delay(150)
        } catch {
          // ignore errors to continue
        }
      }
      if (clicked === 0) return
      await delay(300)
    }
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
