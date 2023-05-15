import { Character } from './Character';
import { Episode } from "./Episodes";


const BASE_URL_CHARACTER = "https://rickandmortyapi.com/api/character"
const BASE_URL_LOCATION = "https://rickandmortyapi.com/api/location"
const BASE_URL_EPISODE = "https://rickandmortyapi.com/api/episode"
// const container = document.querySelector("#content");


const getEpisodesPagination = async(page:number) => {

        try {
                const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
                if(response.status === 200){
                    const page = await response.json();
                    return page
                }
            } catch (error) {
            console.log(error);
        }
        
    }
    
const getDataEpisode = async(id:number) => {
    try {
        const response = await fetch(`${BASE_URL_EPISODE}/${id}`);
        if(response.status === 200){
            const episode = await response.json();
            console.log(episode);
            return episode;
        }
    } catch (error) {
        console.log(error);
    }
}
const getCharacter = async( id:number) => {
        try {
            const response = await fetch(`${BASE_URL_CHARACTER}/${id}`);
            if(response.status === 200){
                const character = await response.json();
                console.log(character);
                return character;
            }
        } catch (error) {
        }

}
const getDataLocation = async( id:number) => {
        try {
            const response = await fetch(`${BASE_URL_LOCATION}/${id}`);
            if(response.status === 200){
                const locatioN = await response.json();
                console.log(locatioN);
                return locatioN;
            }
        } catch (error) {
        }

}

const getAllCharacter = async () => {
    try {
        const response = await fetch(`${BASE_URL_CHARACTER}`);
        if(response.status === 200){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}


const getCharacterId=(e:any) => {
        if(e.target.classList.contains("info")){
        const idCharacter = parseInt(e.target.id);
        getCharacter(idCharacter)
        };
}
const getEpisodeId=(e:any) => {
        if(e.target.classList.contains("infoEpisode")){
        const idCharacter = parseInt(e.target.id);
        getDataEpisode(idCharacter)
        };
}
const getLocationId=(e:any) => {
        if(e.target.classList.contains("location")){
        const idCharacter = parseInt(e.target.id);
        getDataLocation(idCharacter)
        };
}


export {
        getDataEpisode,
        getEpisodesPagination,
        getAllCharacter,
        getCharacterId,
        getEpisodeId,
        getLocationId
    }
