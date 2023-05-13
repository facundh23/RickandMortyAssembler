import { Character} from './Types/Character';
import { Episode } from './Types/Episodes';
import { Location } from './Types/Location';
import { getLocation, getCharacter, getCharacters, getEpisodes, getEpisodesPagination } from './Types/Functions.js';

//* HTML Elements
const btnCharacterNav = document.querySelector("#charactersMain");
const btnEpisodeNav = document.querySelector("#episodesSection");
const btnLocationNav = document.querySelector("#locationSection");
const listEpisodes = document.querySelector("#episodesList");


    btnCharacterNav?.addEventListener("click", async() => {

        const response = await getCharacters();
    })

    btnEpisodeNav?.addEventListener("click", async() => {
        const response = await getEpisodes();
    })

    btnLocationNav?.addEventListener("click", async () => {
        const response = await getLocation();
    })


let page = 1
let anchorItemSidebar = document.createElement("a");
anchorItemSidebar.className = "selectedEpisode nav-link"

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


const showListEpisodes = async(page) => {
 
        
if(page < 4){

    const response = await getEpisodesPagination(page)
    response?.results.forEach((episodeLi: string) => {
                const { episode } = episodeLi
                anchorItemSidebar = document.createElement("a");
                anchorItemSidebar.className = "selectedEpisode nav-link"
                anchorItemSidebar.id = `${episode.id}`;
                anchorItemSidebar.onclick = () => {console.log('click');}
                listEpisodes?.appendChild(anchorItemSidebar);
                anchorItemSidebar.textContent = `Season ${episode.charAt(2)}-Episode: ${episode.substr(4,5)}`;
    
            })
            listEpisodes?.appendChild(anchorItemSidebar);
    
         
            //* Acceder al ultimo elemento en la lista
            const ListInView = document.querySelectorAll(".aside-section .episodes .selectedEpisode");
            let lastEpisode = ListInView[ListInView.length - 1 ]
            paginatorController.observe(lastEpisode)
}
    

    
    // listEpisodes?.appendChild(anchorItemSidebar);


    
}

showListEpisodes(page)
