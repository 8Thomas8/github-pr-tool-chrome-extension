chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === 'checkAll') {
        await checkAllElements();
    }
    if (request.action === 'uncheckAll') {
        await uncheckAllElements();
    }
});

async function checkAllElements() {
    const elements = document.querySelectorAll('label.js-reviewed-toggle.color-border-muted');

    for (let i = 0; i < elements.length; i++) {
        await clickElement(elements[i]);
        await new Promise(resolve => setTimeout(resolve, 150));
    }

    console.log("All files are checked !");
}

async function uncheckAllElements() {
    const elements = document.querySelectorAll('label.js-reviewed-toggle.color-border-accent');

    for (let i = 0; i < elements.length; i++) {
        await clickElement(elements[i]);
        await new Promise(resolve => setTimeout(resolve, 150));
    }

    console.log("All files are unchecked !");
}

async function clickElement(element) {
    return new Promise(resolve => {
        if (element) {
            element.click();
            resolve();
        } else {
            setTimeout(async () => {
                await clickElement(element);
                resolve();
            }, 50);
        }
    });
}
