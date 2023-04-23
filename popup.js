

console.log('popup.js is running :D');

const list = document.getElementById('list');
console.log(list);
const radios = list.querySelectorAll('input[type="radio"]');
console.log(radios);
const storageKey = 'selectedItem';

// Load selected item from storage
// const selectedItem = localStorage.getItem(storageKey);
let selectedItem = null
chrome.storage.local.get(storageKey, function (result) {
    // result is an object like: result = {'selectedItem':'someValue'}
    selectedItem = result[storageKey]
    console.log('chrome.storage.local.get: ' + result[storageKey]);
    
    if (selectedItem) {
        radios.forEach(radio => {
            if (radio.value === selectedItem) {
                radio.checked = true;
            }
        });
    }
});

// Handle radio bdutton click
radios.forEach(radio => {
    radio.addEventListener('click', () => {
        // Unselect previously selected radio
        radios.forEach(r => r.checked = false);
        // Save selected item to storage
        // localStorage.setItem(storageKey, radio.value);
        const obj = {}
        obj[storageKey] = radio.value
        chrome.storage.local.set(obj, function () {
            console.log('chrome.storage.local.set done!');
        });
        // Select the clicked radio
        radio.checked = true;

        sendLanguageSelectedEvent(radio.value);
    });
});

function sendLanguageSelectedEvent(selectedLanguage) {
    (async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        // @todo change 'language' to variable.
        const response = await chrome.tabs.sendMessage(tab.id, {language: `${selectedLanguage}`});
        // do something with response here, not outside the function
        console.log(response);
      })();
}



