const getLocation = async() => {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/location");
        if(response.status === 200){
            const location = await response.json();
            return location
        }
    } catch (error) {
        console.log(error);
    }
}

const getCharacters = async() => {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        if(response.status === 200){
            const characters = await response.json();
            return characters
        }
    } catch (error) {
        console.log(error);
    }
}

const getEpisodes = async() => {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/episode");
        if(response.status === 200){
            const episodes = await response.json();
            return episodes
        }
    } catch (error) {
        console.log(error);
    }
}
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



const getCharacter = async(id:number) => {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if(response.status === 200){
            const character = await response.json();
            return character
        }
    } catch (error) {
        console.log(error);
    }
}

const getId = (e:any) =>{
    if(e.target.classList.contains("selectedEpisode")){
        const episodeId = parseInt(e.target.id)
        return episodeId
    }
//  console.log(e.target.classList);
}

export {
    getLocation,
    getCharacters,
    getEpisodes,
    getCharacter,
    getEpisodesPagination,
    getId
}