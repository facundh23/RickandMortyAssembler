import { Character} from './Types/Character';
import { Episode } from './Types/Episodes';
import { Location } from './Types/Location';
import {  getEpisodesPagination,  getDataEpisode, getAllCharacter, getCharacterId, getEpisodeId, getLocationId } from './Types/Functions.js';



//* HTML Elements
const container = document.querySelector("#content");
const listEpisodes = document.querySelector("#episodesList");
const sectionInfo = document.querySelector("#infoContainer");
const infoCharacter = document.querySelector("#infoCharacter");



let page = 1;
let characterPages = 1;
let anchorItemSidebar = document.createElement("a");
anchorItemSidebar.className = "selectedEpisode nav-link"
let sectionLocation = document.createElement("section");
sectionLocation.className = "location-header w-100";
// Controller
let paginatorController = new IntersectionObserver(( inbounds, paginatorController ) => {
      //* Si el ultimo elemento esta en pantalla ejecuto el codigo
    inbounds.forEach(inbound => {
                if(inbound.isIntersecting){
                    page++
                    showListEpisodes(page)
                }
        })
    }, {
        rootMargin:'0px 0px 0px 0px',
        threshold:1.0
    });
let containerController = new IntersectionObserver(( inbounds, containerController ) => {
      //* Si el ultimo elemento esta en pantalla ejecuto el codigo
    inbounds.forEach(inbound => {
                if(inbound.isIntersecting){
                    characterPages++
                    showAllCharacters(characterPages)
                }
        })
    }, {
        rootMargin:'0px 0px -90px 0px',
        threshold:1.0
    });

const showEpisode = async(id:number) => {
    const response = await getDataEpisode(id);
    console.log(response)
    
}

const showListEpisodes = async( page:number ) => {

    if(page < 4){
        const response = await getEpisodesPagination(page)
        response?.results.forEach((episodeInfo: string) => {
                    const { episode, id, air_date, characters, name } = episodeInfo;
                    let infoEp: Episode ={
                        id: id,
                        episode: episode,
                        air_date: air_date,
                        characters: characters,
                        name: name
                    }
                    anchorItemSidebar = document.createElement("a");
                    anchorItemSidebar.className = "selectedEpisode nav-link infoEpisode"
                    anchorItemSidebar.id = `${infoEp.id}`;
                    anchorItemSidebar.onclick = getEpisodeId
                    listEpisodes?.appendChild(anchorItemSidebar);
                    anchorItemSidebar.textContent = `Season ${episode.charAt(2)}-Episode: ${episode.substr(4,5)}`;
                })
                // console.log(sectionLocation);
                // container?.appendChild(sectionLocation);
                listEpisodes?.appendChild(anchorItemSidebar);
               
                //* Acceder al ultimo elemento en la lista
                const ListInView = document.querySelectorAll(".aside-section .episodes .selectedEpisode");
                let lastEpisode = ListInView[ListInView.length - 1 ]
                paginatorController.observe(lastEpisode)
            }
}
const showAllCharacters = async( characterPages:number ) => {
    if (characterPages < 42 ){
        const response = await getAllCharacter();
        // console.log(response.results);
        response.results.forEach((character:any )=> {
           const {id, name, gender, image, species, status,location, episode } = character;
           let characterInfo: Character = {
                        id: id,
                        name: name, 
                        status: status, 
                        species: species,
                        url: image,
                        location:location.name
                    }
                    const card= document.createElement("div")
                    card.className = "card card-css cardImg";
                    const cardImg = document.createElement("img");
                    cardImg.className = "card-img-top cardImgBody h-75";
                    cardImg.src= `${characterInfo.url}`;
                    cardImg.alt = `${characterInfo.name}`
                    const cardTitle = document.createElement("h5");
                    cardTitle.className = "card-title";
                    cardTitle.textContent = `${characterInfo.name}`;
                    const spanParagraph= document.createElement("span");
                    spanParagraph.className = "card-text";
                    spanParagraph.textContent = `Location: ${characterInfo.location}`;
                    const spanTitle = document.createElement("span");
                    spanTitle.className = "card-text mt-2 fw-bolder fs-2";
                    spanTitle.textContent = `Specie: ${characterInfo.species} | Status: ${characterInfo.status}`;
                    const btnInfoCharacter = document.createElement("a");
                    btnInfoCharacter.className = "btn btn-primary mt-3 d-block p-4 info";
                    btnInfoCharacter.id = id;
                    btnInfoCharacter.textContent = "Info Character";
                    btnInfoCharacter.onclick = getCharacterId;
                    const btnInfoLocation = document.createElement("a");
                    btnInfoLocation.className = "btn btn-primary mt-3 d-block p-4 location";
                    btnInfoLocation.id = id;
                    btnInfoLocation.textContent = "Info Location";
                    btnInfoLocation.onclick = getLocationId;
                    card.appendChild(cardImg)
                    card.appendChild(cardTitle)
                    card.appendChild(spanTitle)
                    card.appendChild(spanParagraph)
                    card.appendChild(btnInfoCharacter)
                    card.appendChild(btnInfoLocation)

                    container?.appendChild(card)

                    const LastInView = document.querySelectorAll(".container div.cardImg");
                    let lastEpisode = LastInView[LastInView.length - 1 ]
                    containerController.observe(lastEpisode)
        });
    }
}


showAllCharacters(characterPages)
showListEpisodes(page)

