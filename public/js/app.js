
fetch('http://puzzle.mead.io/puzzle').then ((response) => {
    response.json().then ((data) => {
        console.log(data)

    })

})


const weatherForm = document.querySelector('form') // indexte olustugumuz forma bi sey girdgindde cevap )

const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent = 'From Java'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value

    messageOne.textContent= 'Loading..'
    messageTwo.textContent= ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent= data.forecast
            

        }   

    })
})

})