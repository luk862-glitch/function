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

    let random = results[Math.floor(Math.random() * results.length)]

    let containerEl = document.querySelector('#convo-prompts')
    containerEl.innerHTML = ''
    let itemHtml =
    `
    <li>
        <h2>${random.prompt}</h2>
    </li>
    `
    containerEl.insertAdjacentHTML('beforeend', itemHtml)
}




document.querySelector('#some-form').addEventListener('submit', (event) => {
    event.preventDefault()
    renderItems()
})

// document.querySelector('#next').addEventListener('click', () => {
//     renderItems()
// })