
(() => {

  //todo remove
    console.log('contentScript is running :)');

    /* @todo make this variable universal. */
    const storageKey = "selectedItem"

    chrome.storage.local.get(storageKey, function (result) {
    // result is an object like: result = {'selectedItem':'someValue'}
    const selectedItem = result[storageKey]
    
    console.log(`selected language is: ${selectedItem}`);

    const liFa = document.querySelector(`a[lang="${selectedItem}"]`);
    if(liFa) {
        const title = liFa.title
        console.log(title);
        console.log(liFa.href);

        appendToHeading(title, liFa.href);
    }
});
    
    
    
})();

function appendToHeading(str, link) {
  const heading = document.getElementById('firstHeading');

  const br = document.createElement("br");
  heading.appendChild(br);

  const span = document.createElement("a"); 
  span.textContent = str;
  span.href = link
  span.style.fontSize = "15px";
  heading.appendChild(span);

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

  
  