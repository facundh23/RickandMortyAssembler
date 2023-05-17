import { Episode } from './Types/Episodes';

import {  getEpisodesPagination,  getDataEpisode } from './Types/Functions.js';

window.onload = () => {showListEpisodes(page)}

//* HTML Elements

const listEpisodes = document.querySelector("#episodesList");
const sectionInfo = document.querySelector("#sectionInfo");


let page = 1;
let btnListEpisodes = document.createElement("a");
btnListEpisodes.className = "selectedEpisode nav-link";
let sectionLocation = document.createElement("section");
sectionLocation.className = "location-header w-100";
let titleContainer = document.createElement("div");
titleContainer.className = "title_container";

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



const showListEpisodes = async( page:number ) => {

    if(page < 4){
        const response = await getEpisodesPagination(page)
        response?.results.forEach((episodeInfo:any) => {
                    const { episode, id, air_date, characters, name } = episodeInfo;
                    let infoEp: Episode ={
                        id: id,
                        episode: episode,
                        air_date: air_date,
                        characters: characters,
                        name: name
                    }
                    btnListEpisodes = document.createElement("a");
                    btnListEpisodes.className = "selectedEpisode btn btn-success mb-3 w-100 infoEpisode"
                    btnListEpisodes.id = `${infoEp.id}`;
                    btnListEpisodes.setAttribute("data-id", `${infoEp.id}`);
                    btnListEpisodes.onclick = () => {getDataEpisode(id)}
                    listEpisodes?.appendChild(btnListEpisodes);
                    btnListEpisodes.textContent = `Season ${episode.charAt(2)}-Episode: ${episode.substr(4,5)}`;
                })
                sectionInfo?.appendChild(titleContainer)
                listEpisodes?.appendChild(btnListEpisodes);

                //* Acceder al ultimo elemento en la lista
                const ListInView = document.querySelectorAll(".aside-section .episodes .selectedEpisode");
                let lastEpisode = ListInView[ListInView.length - 1 ]
                paginatorController.observe(lastEpisode)
            }
}









