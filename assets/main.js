
let renderItems = (data) => {
    let containerEl = document.querySelector('#convo-prompts')
    containerEl.innerHTML = ''
    
    let itemHtml = `
    <li>
        <h2>${data[Math.floor(Math.random() * data.length)].prompt}</h2>
    </li>
    `
        containerEl.insertAdjacentHTML('beforeend', itemHtml)
    }
// I wanted the convo prompts to generate randomly each time so I added Math.ramdom () found on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
	    renderItems(data)
	})