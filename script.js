const button = document.querySelector('.button')
const names = document.querySelector('.names')
const desc = document.querySelector('.desc')
const temp = document.querySelector('.temp')
const apiKey = '301a67e1-6a30-415f-b3f4-c118cc060012'



function fetchStates(){
    fetch(`http://api.airvisual.com/v2/states?country=USA&key=${apiKey}`)
        .then(res => res.json())
        .then(res => {
            const states = res.data.map(s => s.state)
            const statesDataList = document.querySelector('#states')
            states.forEach(stateName => {
                const optionNode = document.createElement('option')
                optionNode.setAttribute('value', stateName)
                statesDataList.appendChild(optionNode)
            });
        })
        .catch(err => console.log(err))
}  
fetchStates()


function fetchCities(state){
    fetch(`http://api.airvisual.com/v2/cities?state=${state}&country=USA&key=${apiKey}`)
        .then(res => res.json())
        .then(res => {
            const cities = res.data.map(c => c.city)
            const citiesDataList = document.querySelector('#cities')
            while (citiesDataList.firstChild) citiesDataList.firstChild.remove()
            cities.forEach(cityName => {
                const optionNode = document.createElement('option')
                optionNode.setAttribute('value', cityName)
                citiesDataList.appendChild(optionNode)
            });
        })
        .catch(err => console.log(err))
}

state.addEventListener('change', e =>{
    document.getElementById('city').value = ''
    fetchCities(e.target.value)
})


city.addEventListener('change', e =>{
    const state = document.getElementById('state').value
    fetch(`http://api.airvisual.com/v2/city?city=${e.target.value}&state=${state}&country=USA&key=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.data.current.weather)
            
            const tempF = data.data.current.weather.tp * 9 / 5 + 32

            names.innerHTML = `The temperature in ${e.target.value} is ${tempF} degrees`
            
        })
        .catch(err => console.log(err))
})