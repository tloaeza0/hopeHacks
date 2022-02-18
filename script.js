const button = document.querySelector('.button')
const inputValue = document.querySelector('.inputValue')
const names = document.querySelector('.names')
const desc = document.querySelector('.desc')
const temp = document.querySelector('.temp')



button.addEventListener('click',function(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&appid=b234a2d9ac016e12f08ba1e3b70c5323')

.then(res => res.json())
.then(data => {
    const nameValue = data['name'];
    const tempValue = `It is ${data.main.temp} degrees outside in ${data.name}`
    const descValue = data['weather'][0]['description'];

    names.innerHTML = nameValue;
    desc.innerHTML = descValue;
    temp.innerHTML = tempValue;
    

})

.catch(err => alert('invalid search query'))
})
