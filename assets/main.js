let data = []

fetch('assets/data.json')
    .then(response => response.json())
    .then(prompt => {
        data = prompt
    })


let renderItems = () => {
    let mode = document.querySelector('#mode').value
    let number = document.querySelector('#number').value
    let topic = document.querySelector('#topic').value


//I wanted the convo prompts to generate randomly each time so I added Math.ramdom () found on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//but for it to randomly "choose one of the matching prompts" I first have to collect them into an array
//Found that push method allows me to "add specific elements (aka the 10 prompts that match the user's selection) into an array" https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
    
    let results = []

    data.forEach(prompt => {

    //If user selects a specific mode & number, but leave topic as "All"
        if (prompt.mode === mode &&
            prompt.number === number &&
            topic === "All") //If user selects "All" for topic, which only exists in the html dropdown not in json
        {
            results.push(prompt)
        }
    
    // If user selects a specific mode & number & topic
        else if (prompt.mode === mode && 
            prompt.number === number && 
            prompt.topic === topic) 
        {
            results.push(prompt)
        }

    })

//generate a prompt randomly that matches the user's selection
    let random = results[Math.floor(Math.random() * results.length)]

    let containerEl = document.querySelector('#convo-prompts')
    containerEl.innerHTML = ''
    
    let itemHtml =
    `
    <li>
        <h2>${random.prompt}</h2>
        <button id="next" class="next-button">Next</button>
        <button id="save">Save</button>
    </li>
    `
    containerEl.insertAdjacentHTML('beforeend', itemHtml)

}


document.querySelector('#some-form').addEventListener('submit', (event) => {
    event.preventDefault()
    renderItems()
})

//generate a new prompt when user slects "next"
//targeting #convo-prompts so it only appears when a prompt is shown & page loads. event.target.id on MDN: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events#event_delegation
document.querySelector('#convo-prompts').addEventListener('click', (event) => {
    if (event.target.id === 'next') {
        renderItems()
    }
})



// I need a saved convo prompt button & modal. The following is from class site example
let modalButton = document.querySelector('#modal') // Get the "view saved" button 
let modalDialog = document.querySelector('#dialog') // get the modal
let closeButton = modalDialog.querySelector('button') // get the close button in the modal

modalButton.addEventListener('click', () => { // “Listen” for clicks.
	modalDialog.showModal() // This opens it up.
})

closeButton.addEventListener('click', () => {
	modalDialog.close() // And this closes it!
})

// Listen to *all* clicks, now including the `event` parameter…
document.addEventListener('click', (event) => {
	// Only clicks on the page itself behind the `dialog`.
	if (event.target == document.documentElement) {
		modalDialog.close() // Close it too then.
	}
})



// set an empty array to store the saved prompts
let savedPrompts = []

document.querySelector('#convo-prompts').addEventListener('click', (event) => {
    if (event.target.id === 'save') {
        
        // grab the current prompt text and tags from the page
        // here I'm changing the current prompt into an "object". Found how to do this here https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics
        let currentPrompt = {
            prompt: document.querySelector('#convo-prompts').textContent, //I googled "javascript get text" and found this Stackoverflow thread that suggests using textContent https://stackoverflow.com/questions/6743912/how-to-get-the-pure-text-without-html-element-using-javascript 
            mode: document.querySelector('#mode').value,
            number: document.querySelector('#number').value,
            topic: document.querySelector('#topic').value
        }

        // add it to the saved list
        savedPrompts.push(currentPrompt) //push current prompt into the empty savedPrompts array I set earlier
})
