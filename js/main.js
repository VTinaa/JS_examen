

document.addEventListener('DOMContentLoaded', () => {
    getPersons(1, true)
    // // document.querySelector('.number_page').classList.add('visible')
    // setTimeout(() => {document.querySelector('.number_page').classList.add('visible')},5000)
})


function getPersons(page, create = false) {
    let xml = new XMLHttpRequest()
    let url = `https://swapi.dev/api/people/?page=${page}`
    xml.open('GET', url)
    xml.responseType = 'json'
    xml.send()
    xml.onload = () => {
        showAllPerson(xml.response.results)
    }
    if (create) {
        xml.onreadystatechange = () => {
            if (xml.readyState == 4) {
                createPagination(xml.response.count, xml.response.results.length)
                document.querySelector('.number_page').classList.add('visible')
                activePagination()
            }
        }
    }
}

function showAllPerson(data) {
    let content = document.querySelector('.content')
    content.innerHTML = ''
    data.forEach(element => {
        let str = `<div class="card mb-3">
        <h3 class="card-header">${element.name}</h3>
        <img src="https://starwars-visualguide.com/assets/img/characters/${element.url.match(/\/([0-9]*)\/$/)[1]}.jpg" class="d-block user-select-none">
      </div>`
        content.insertAdjacentHTML('beforeend', str)
    });
    showPerson(data)
}

function showPerson(data){
    let blocks = document.querySelectorAll('.content div.card')
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener('click',()=> {
            showDetails(data[i],blocks[i].children[1].src)
            document.querySelector('.details').classList.add('show')
        });
    }
    document.querySelector('.border-info').addEventListener('click',()=>{
        document.querySelector('.details').classList.remove('show')
    })
}

function showDetails(data, url){
    let img = document.querySelector('.details .card-header img')
    let li = document.querySelectorAll('.details .info')
    let title = document.querySelector('.details .card-title')
    const {name,birth_year,eye_color,hair_color,height,mass} =data
    title.textContent = name
    li[0].textContent = birth_year
    li[1].textContent = eye_color
    li[2].textContent = hair_color
    li[3].textContent = height
    li[4].textContent = mass
    img.src = url
}

function activePagination() {
    let page = document.querySelectorAll('.page-item');

    for (let index = 0; index < page.length; index++) {
        page[index].addEventListener('click', function () {
            for (let i = 0; i < page.length; i++) {
                page[i].classList.remove('active');
            }
            this.classList.add('active')
            getPersons(this.firstElementChild.textContent)
        })
    }
}


function createPagination(all, current) {
    let line = ''
    let number = parseInt(all / current) + (all / current > parseInt(all / current) ? 1 : 0)
    for (let i = 0; i < number; i++) {
        if (i == 0) {
            line += `<li class="page-item active"><a class="page-link href="#">${i + 1}</a></li>`
            continue
        }
        line += `<li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>`

    }
    document.querySelector('.pagination li:first-child').insertAdjacentHTML('afterend', line)
}