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


    let results = []

    data.forEach(prompt => {
        if (prompt.mode === mode && 
            prompt.number === number && 
            prompt.topic === topic) {

//I wanted the convo prompts to generate randomly each time so I added Math.ramdom () found on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//but for it to randomly "choose one of the matching prompts" I first have to collect them into an array
//Found that push method allows me to "add specific elements (aka the 10 prompts that match the user's selection) into an array" https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
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