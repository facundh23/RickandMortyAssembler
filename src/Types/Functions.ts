import { Character } from "./Character";
import { Episode } from "./Episodes";
import { Location } from "./Location";

const BASE_URL_CHARACTER = "https://rickandmortyapi.com/api/character";
const BASE_URL_LOCATION = "https://rickandmortyapi.com/api/location";
const BASE_URL_EPISODE = "https://rickandmortyapi.com/api/episode";

const container = document.querySelector("#content");
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
            const episodeView = await response.json();
            const {characters, name, id, air_date, episode} = episodeView;
            let informationEpisode: Episode ={
                id: id,
                episode: episode,
                air_date: air_date,
                characters: characters,
                name: name
            }
            container?.replaceChildren()
            const firstTitle = document.createElement("h2");
            firstTitle.className = "title-episode w-100";
            firstTitle.textContent = `Episode: ${informationEpisode.id}`;
            const secondRow = document.createElement("p");
            secondRow.className =  "date-info w-100";
            secondRow.textContent = `${informationEpisode.air_date} | ${informationEpisode.episode}`
            container?.appendChild(firstTitle)
            container?.appendChild(secondRow)
            characters.forEach( (item:string) => {
                getCharacter(item)
            })
        }
    } catch (error) {
        console.log(error);
    }
}
const getCharacter = async( url:string):Promise<void>  => {
        try {
            const response = await fetch(`${url}`);
            if(response.status === 200){
                const characterInfo = await response.json();
                const {name, status, species, episode,location,image, id, type,gender,create, origin } = characterInfo
                let characterInformation: Character = {
                    name:name,
                    status: status,
                    species:species, 
                    episode:episode,
                    location:location,
                    image:image,
                    id:id,
                    gender:gender,
                    url:url, 
                    create:create,
                    type:type, origin
                }
                const cardImage = document.createElement("card");
                cardImage.className ="card card-css cardImg";
                // cardImage.addEventListener("click", ()=> {characterView(`${characterInformation.id}`)})
                const imagePhoto = document.createElement("img");
                imagePhoto.className = "card-img-top";
                imagePhoto.src = `${characterInformation.image}`
                const cardBody = document.createElement("div");
                cardBody.className ="card-body";
                const infoName = document.createElement("p");
                infoName.className = "card-text";
                infoName.textContent = `${characterInformation.name} `;
                const infoParagraph = document.createElement("p");
                infoParagraph.className = "card-text";
                infoParagraph.textContent = `${characterInformation.status} | ${characterInformation.species}`;
                const btnInfo = document.createElement("button");
                btnInfo.className ="btn btn-info mt-1 w-100  location",
                btnInfo.textContent = `${characterInformation.name} Info`
                btnInfo.addEventListener("click", ()=> {characterView(`${characterInformation.id}`)})
                const btnLocation = document.createElement("button");
                btnLocation.className ="btn btn-warning w-100 mt-1  location",
                btnLocation.textContent = ` Location: ${characterInformation.location.name}`;
                btnLocation.addEventListener("click", () => {getDataLocation(id)})
                cardImage.appendChild(imagePhoto);
                cardImage.appendChild(cardBody);
                cardImage.appendChild(infoName);
                cardImage.appendChild(infoParagraph);
                cardImage.appendChild(btnInfo);
                cardImage.appendChild(btnLocation);
                container?.appendChild(cardImage);
            }
        } catch (error) {
            console.log(error);
        }
}
const characterView = async (id:string):Promise<void> => {
    const idCharacter = parseInt(id);
    try {
        const response = await  fetch(`${BASE_URL_CHARACTER}/${idCharacter}`);
        const data = await response.json();
        const {name, status, species, episode,location,image, id, type,gender,create, origin, url } = data
        let characterInformation: Character = {
            name:name,
            status: status,
            species:species, 
            episode:episode,
            location:location,
            image:image,
            id:id,
            gender:gender,
            url:url, 
            create:create,
            type:type, 
            origin:origin
        }
        container?.replaceChildren()
        const photo = document.createElement("img");
        photo.className = "photoInfo";
        photo.src = `${characterInformation.image}`
        const nameCharacter = document.createElement("p");
        nameCharacter.className = "w-100 fs-3"
        nameCharacter.textContent= `${characterInformation.name}`
        const nameInfo = document.createElement("p");
        nameInfo.className = "w-100 fs-2"
        nameInfo.textContent = `${characterInformation.species} | ${characterInformation.status} | ${characterInformation.gender} | ${characterInformation.origin.name} `;
        episode.forEach((e:string )=> {
            getEpisodes(e)
        })
        container?.appendChild(photo)
        container?.appendChild(nameCharacter)
        container?.appendChild(nameInfo)
    } catch (error) {
    }
}
const getEpisodes = async(url:string):Promise<void> => {
    try {
        const response = await fetch(`${url}`);
        if(response.status === 200){
            const episodes = await response.json();
            const {id, name, air_date, characters, episode} = episodes;
            let informationEpisode: Episode ={
                id: id,
                episode: episode,
                air_date: air_date,
                characters: characters,
                name: name
            }
            
            const paragraphContainer = document.createElement("div");
            paragraphContainer.className = "containerInfoEpisode w-100";
            paragraphContainer.addEventListener("click", () => getDataEpisode(id))
            const episodeNumber = document.createElement("p");
            episodeNumber.className ="fw-bold w-100";
            episodeNumber.textContent = `Episode ${informationEpisode.id}`;
            const seasonNumber = document.createElement("p");
            seasonNumber.className ="fw-bolder"
            seasonNumber.textContent= `${informationEpisode.episode}`
            paragraphContainer.appendChild(episodeNumber);
            paragraphContainer.appendChild(seasonNumber);
            container?.appendChild(paragraphContainer)
        }
    } catch (error) {
        console.log(error);
    }
}
const getDataLocation = async( id:number):Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL_LOCATION}/${id}`);
            if(response.status === 200){
                const locatioN = await response.json();
                
                const { id, name, type, dimension, residents, url, created } = locatioN;
                let locationInfo:Location = {
                    id: id,
                    name:name, 
                    type:type,
                    dimension:dimension, 
                    residents:residents, 
                    url:url, 
                    created: created
                }
                container?.replaceChildren()
                const titleLocation = document.createElement("h1");
                titleLocation.addEventListener("click", () => {characterView(id)})
                titleLocation.textContent = `${locationInfo.name} | (${locationInfo.dimension})`;
                const informationLocation = document.createElement("p");
                informationLocation.className = "text-content w-100";
                informationLocation.textContent = `Planet | ${locationInfo.dimension}`
                container?.appendChild(titleLocation);
                container?.appendChild(informationLocation);
                residents.forEach((resident:string )=> {
                    getResident(resident)
                })
            }
        } catch (error) {
            console.log(error);
        }

}
const getResident = async(url:string):Promise<void> => {
    try {
        const response = await fetch(`${url}`);
        const resident = await response.json();
        const {name,status, species, image, location,id } = resident;
        let residentInformation: Character = {
            id:id,
            name:name,
            status: status,
            species:species,
            image:image,
            location: location
        }
        
        const cardImage = document.createElement("card");
        cardImage.className ="card card-css cardImg";
        const imagePhoto = document.createElement("img");
        imagePhoto.addEventListener("click", () => {getDataLocation(id)})
        imagePhoto.className = "card-img-top";
        imagePhoto.src = `${residentInformation.image}`
        const cardBody = document.createElement("div");
        cardBody.className ="card-body";
        const infoName = document.createElement("p");
        infoName.className = "card-text text-decoration-none";
        infoName.textContent = `${residentInformation.name} `;
        const infoParagraph = document.createElement("p");
        infoParagraph.className = "card-text";
        infoParagraph.textContent = `${residentInformation.status} | ${residentInformation.species}`;
        cardImage.appendChild(cardBody);
        cardImage.appendChild(imagePhoto);
        cardImage.appendChild(infoName);
        cardImage.appendChild(infoParagraph);
        container?.appendChild(cardImage)
    } catch (error) {
        console.log(error);
    }
}

export {
        getDataEpisode,
        getEpisodesPagination,
    }
