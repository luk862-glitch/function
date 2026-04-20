let data = []

let hideClass = 'hidden'
let showClass = 'active'


fetch('assets/data.json')
    .then(response => response.json())
    .then(prompt => {
        data = prompt
    })

// if user clicks "start" button, hide page 1 and show form
document.querySelector('#start-button').addEventListener('click', () => {
    document.querySelector('#page-1').classList.add(hideClass)
    document.querySelector('#some-form').classList.remove(hideClass)
    document.querySelector('#some-form').classList.add(showClass)
})

//when user clicks "generate" button, hide form and show page 3 (result)
document.querySelector('#some-form').addEventListener('submit', (event) => {
    event.preventDefault()
    document.querySelector('#some-form').classList.remove(showClass)
    document.querySelector('#some-form').classList.add(hideClass)
    document.querySelector('#page-3').classList.remove(hideClass)
    document.querySelector('#page-3').classList.add(showClass)
    renderItems()
})

//when user clicks "back" button, go back to form
document.querySelector('#back-button').addEventListener('click', () => {
    document.querySelector('#page-3').classList.remove(showClass)
    document.querySelector('#page-3').classList.add(hideClass)
    document.querySelector('#some-form').classList.remove(hideClass)
    document.querySelector('#some-form').classList.add(showClass)
})


let renderItems = () => {
    let mode = document.querySelector('input[name="mode"]:checked').value
    let setting = document.querySelector('input[name="setting"]:checked').value
    let topic = document.querySelector('input[name="topic"]:checked').value


//I wanted the convo prompts to generate randomly each time so I added Math.ramdom () found on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//but for it to randomly "choose one of the matching prompts" I first have to collect them into an array
//Found that push method allows me to "add specific elements (aka the 10 prompts that match the user's selection) into an array" https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
    
    let results = []

    data.forEach(prompt => {

    //If user selects a specific mode & setting, but leave topic as "All"
        if (prompt.mode === mode &&
            prompt.setting === setting &&
            topic === "All") //If user selects "All" for topic, which only exists in the html dropdown not in json
        {
            results.push(prompt)
        }
    
    // If user selects a specific mode & setting & topic
        else if (prompt.mode === mode && 
            prompt.setting === setting && 
            prompt.topic === topic) 
        {
            results.push(prompt)
        }
    }
)

//generate a prompt randomly that matches the user's selection
    let random = results[Math.floor(Math.random() * results.length)]

    let containerEl = document.querySelector('#convo-prompts')
    containerEl.innerHTML = ''
    
    let itemHtml =
    `
    <li>
        <p class="result-text">${random.prompt}</p>
        <button class="button button-primary" id="next">Next</button>
        <button class="button button-secondary" id="save">Save</button>
    </li>
    `
    containerEl.insertAdjacentHTML('beforeend', itemHtml)

}


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
            mode: document.querySelector('input[name="mode"]:checked').value,
            setting: document.querySelector('input[name="setting"]:checked').value,
            topic: document.querySelector('input[name="topic"]:checked').value
        }

        // add it to the saved list
        savedPrompts.push(currentPrompt) //push current prompt into the empty savedPrompts array I set earlier
    }
    })


modalButton.addEventListener('click', () => {
    let savedList = document.querySelector('#saved-list')
    savedList.innerHTML = ''

//if user did not save any prompt
    if (savedPrompts.length === 0) {
        savedList.innerHTML = 
        `
        <p>You do not have any saved questions atm!</
        `

        // I want to show user input as tags under the prompt besides the prompt
        } else {
            savedPrompts.forEach(item => {
            let itemHtml =
            `
            <li>
                <h2>${item.prompt}</h2>
                <p>${item.mode} | ${item.setting} | ${item.topic}</p> 
            </li>
            `
            savedList.insertAdjacentHTML('beforeend', itemHtml)
        })
    }

    modalDialog.showModal()
})