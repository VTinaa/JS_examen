

document.addEventListener('DOMContentLoaded', () => {
    getPersons(1, true)
})


function getPersons(page, create = false) {
    let xml = new XMLHttpRequest()
    let url = `https://swapi.dev/api/planets/?page=${page}`
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

// function showAllPerson(data) {
//     let content = document.querySelector('.content')
//     content.innerHTML = ''
//     data.forEach(element => {
//         let str = `<div class="card mb-3">
//         <h3 class="card-header">${element.name}</h3>
//         <img src="https://starwars-visualguide.com/assets/img/planets/${element.url.match(/\/([0-9]*)\/$/)[1]}.jpg" class="d-block user-select-none">
//       </div>`
//         content.insertAdjacentHTML('beforeend', str)
//     });
//     showPerson(data)
// }


/////////////////////////////////////////////
function showAllPerson(data){
    let content = document.querySelector('.content')
    content.innerHTML = ''
    data.forEach(element => {
        // let xml = new XMLHttpRequest()
        let imgURL = `https://starwars-visualguide.com/assets/img/planets/${element.url.match(/\/([0-9]*)\/$/)[1]}.jpg`
        // xml.open('GET', imgURL)
        // // xml.responseType = 'json'
        // xml.send()
        // xml.onload = () => {
        //     if(xml.status == 404) {
        //         imgURL = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
        //         console.log(`ERROR` + xml.status)
        //     }
        //     else{
        //         console.log(`GOOD` + xml.status)
        //         imgURL = `https://starwars-visualguide.com/assets/img/planets/${element.url.match(/\/([0-9]*)\/$/)[1]}.jpg`
        //     }
        //     console.log(`imgURL` + imgURL)

            let str = `<div class="card mb-3">
            <h3 class="card-header">${element.name}</h3>
            <img src="${imgURL}" class="d-block user-select-none"
            </div>`
            content.insertAdjacentHTML('beforeend', str) // HTML
        
    });
    showPerson(data)
}
////////////////////////////////


function showPerson(data){
    console.log('Show Person', data)
    let blocks = document.querySelectorAll('.content div.card')

    for (let j = 0; j < blocks.length; j++) {
        blocks[j].children[1].onerror = function(){
           blocks[j].children[1].src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
        } 
    }

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
    const {name,rotation_period,orbital_period,diameter,climate,gravity} =data
    title.textContent = name
    li[0].textContent = rotation_period
    li[1].textContent = orbital_period
    li[2].textContent = diameter
    li[3].textContent = climate
    li[4].textContent = gravity
    // img.src = url
    img.src = url
    // let xml = new XMLHttpRequest()
    // let pageUrl = url
    // xml.open('GET', pageUrl)
    // // xml.responseType = 'json'
    // xml.send()
    // xml.onload = () => {
    //     if(xml.status == 404){
    //         img.src = `https://starwars-visualguide.com/assets/img/placeholder`
    //     }
    //     else{
    //         img.src = url
    //     }
    // }
}

function activePagination() {
    let page = document.querySelectorAll('.page-item');

    for (let index = 0; index < page.length; index++) {
        page[index].addEventListener('click', function () {
            
            if(this == page[page.length - 1]) {
                for (let i = 0; i < page.length; i++) {
                    page[i].classList.remove('active');
                }
                // this.classList.add('active')
                page[page.length - 2].classList.add('active')
                // getPersons(this.firstElementChild.textContent)
                getPersons(page[page.length - 2].firstElementChild.textContent)
            }
            else if (this == page[0]){
                for (let i = 0; i < page.length; i++) {
                    page[i].classList.remove('active')
                }
                page[1].classList.add('active')
                getPersons(page[1].firstElementChild.textContent)
            }
            else{
                for (let i = 0; i < page.length; i++) {
                    page[i].classList.remove('active')
                }
                this.classList.add('active')
                getPersons(this.firstElementChild.textContent)
            }
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