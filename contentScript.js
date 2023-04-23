
(() => {

  //todo remove
  console.log('contentScript is running :)');

  /* @todo make this variable universal. */
  const storageKey = "selectedItem"

  chrome.storage.local.get(storageKey, function (result) {
    // result is an object like: result = {'selectedItem':'someValue'}
    const selectedItem = result[storageKey]

    console.log(`selected language is: ${selectedItem}`);

    updateViewWithSelectedLanguage(selectedItem);

  });

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");


      console.log('selectedLanguage:' + request.language);
      updateViewWithSelectedLanguage(request.language);
    }
  );

})();

function updateViewWithSelectedLanguage(selectedLanguage) {
  const liFa = document.querySelector(`a[lang="${selectedLanguage}"]`);
  if (liFa) {
    const title = liFa.title
    console.log(title);
    console.log(liFa.href);

    appendToHeading(title, liFa.href);
  }
}

function appendToHeading(str, link) {
  const heading = document.getElementById('firstHeading');

  let span = document.querySelector('#secondLanguageTitle');
  if (!span) {
    const br = document.createElement("br");
    heading.appendChild(br);

    span = document.createElement("a");
    span.id = "secondLanguageTitle";
    span.style.fontSize = "15px";
    heading.appendChild(span);
  }

  span.textContent = str;
  span.href = link;

  return heading.textContent;
}

/**
 * Finds the first <h1> tag in the webpage with ID "firstHeading".
 * @returns {HTMLElement|null} The <h1> element, or null if not found.
 */
function findFirstHeading() {
  const firstHeading = document.querySelector('#firstHeading h1');
  if (firstHeading) {
    return firstHeading;
  } else {
    return 'No heading found.';
  }
}


