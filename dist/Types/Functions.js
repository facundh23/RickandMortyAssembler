var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL_CHARACTER = "https://rickandmortyapi.com/api/character";
const BASE_URL_LOCATION = "https://rickandmortyapi.com/api/location";
const BASE_URL_EPISODE = "https://rickandmortyapi.com/api/episode";
const container = document.querySelector("#content");
const cleanScreen = document.querySelector("#cleanData");
cleanScreen === null || cleanScreen === void 0 ? void 0 : cleanScreen.addEventListener("click", () => {
    container === null || container === void 0 ? void 0 : container.replaceChildren();
});
const getEpisodesPagination = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${BASE_URL_EPISODE}?page=${page}`);
        if (response.status === 200) {
            const page = yield response.json();
            return page;
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getDataEpisode = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${BASE_URL_EPISODE}/${id}`);
        if (response.status === 200) {
            const episodeView = yield response.json();
            const { characters, name, id, air_date, episode } = episodeView;
            let informationEpisode = {
                id: id,
                episode: episode,
                air_date: air_date,
                characters: characters,
                name: name
            };
            let episodeNum = episode.substring(4, 6);
            container === null || container === void 0 ? void 0 : container.replaceChildren();
            const firstTitle = document.createElement("h2");
            firstTitle.className = "title-episode text-center w-100";
            firstTitle.textContent = `Episode: ${episodeNum}`;
            const secondRow = document.createElement("p");
            secondRow.className = "date-info text-center w-100";
            secondRow.textContent = `${informationEpisode.air_date} | ${informationEpisode.episode}`;
            container === null || container === void 0 ? void 0 : container.appendChild(firstTitle);
            container === null || container === void 0 ? void 0 : container.appendChild(secondRow);
            characters.forEach((item) => {
                getCharacter(item);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getCharacter = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${url}`);
        if (response.status === 200) {
            const characterInfo = yield response.json();
            const { name, status, species, episode, location, image, id, type, gender, create, origin } = characterInfo;
            let characterInformation = {
                name: name,
                status: status,
                species: species,
                episode: episode,
                location: location,
                image: image,
                id: id,
                gender: gender,
                url: url,
                create: create,
                type: type, origin
            };
            const cardImage = document.createElement("card");
            cardImage.className = "card card-css cardImg";
            const imagePhoto = document.createElement("img");
            imagePhoto.className = "card-img-top";
            imagePhoto.src = `${characterInformation.image}`;
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
            const infoName = document.createElement("p");
            infoName.className = "card-text";
            infoName.textContent = `${characterInformation.name} `;
            const infoParagraph = document.createElement("p");
            infoParagraph.className = "card-text";
            infoParagraph.textContent = `${characterInformation.status} | ${characterInformation.species}`;
            const btnInfo = document.createElement("button");
            btnInfo.className = "btn btn-primary mt-1 w-100  location",
                btnInfo.textContent = `${characterInformation.name} Info`;
            btnInfo.addEventListener("click", () => { characterView(`${characterInformation.id}`); });
            const btnLocation = document.createElement("button");
            btnLocation.className = "btn btn-info w-100 mt",
                btnLocation.textContent = "Location Info";
            btnLocation.addEventListener("click", () => { getDataLocation(id); });
            cardImage.appendChild(imagePhoto);
            cardImage.appendChild(cardBody);
            cardImage.appendChild(infoName);
            cardImage.appendChild(infoParagraph);
            cardImage.appendChild(btnInfo);
            cardImage.appendChild(btnLocation);
            container === null || container === void 0 ? void 0 : container.appendChild(cardImage);
        }
    }
    catch (error) {
        console.log(error);
    }
});
const characterView = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idCharacter = parseInt(id);
    try {
        const response = yield fetch(`${BASE_URL_CHARACTER}/${idCharacter}`);
        const data = yield response.json();
        const { name, status, species, episode, location, image, id, type, gender, create, origin, url } = data;
        let characterInformation = {
            name: name,
            status: status,
            species: species,
            episode: episode,
            location: location,
            image: image,
            id: id,
            gender: gender,
            url: url,
            create: create,
            type: type,
            origin: origin.name
        };
        container === null || container === void 0 ? void 0 : container.replaceChildren();
        const photo = document.createElement("img");
        photo.className = "photoInfo";
        photo.src = `${characterInformation.image}`;
        const nameCharacter = document.createElement("p");
        nameCharacter.className = "w-100 text-center fs-3";
        nameCharacter.textContent = `${characterInformation.name}`;
        const nameInfo = document.createElement("p");
        nameInfo.className = "w-100 text-center fs-2";
        nameInfo.textContent = `${characterInformation.species} | ${characterInformation.status} | ${characterInformation === null || characterInformation === void 0 ? void 0 : characterInformation.gender} | ${characterInformation === null || characterInformation === void 0 ? void 0 : characterInformation.origin} `;
        episode.forEach((e) => {
            getEpisodes(e);
        });
        container === null || container === void 0 ? void 0 : container.appendChild(photo);
        container === null || container === void 0 ? void 0 : container.appendChild(nameCharacter);
        container === null || container === void 0 ? void 0 : container.appendChild(nameInfo);
    }
    catch (error) {
    }
});
const getEpisodes = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${url}`);
        if (response.status === 200) {
            const episodes = yield response.json();
            const { id, name, air_date, characters, episode } = episodes;
            let informationEpisode = {
                id: id,
                episode: episode,
                air_date: air_date,
                characters: characters,
                name: name
            };
            const paragraphContainer = document.createElement("div");
            paragraphContainer.className = "containerInfoEpisode w-25";
            paragraphContainer.addEventListener("click", () => getDataEpisode(id));
            const episodeNumber = document.createElement("p");
            episodeNumber.textContent = `Episode ${informationEpisode.id}`;
            const seasonNumber = document.createElement("p");
            seasonNumber.textContent = `${informationEpisode.episode}`;
            paragraphContainer.appendChild(episodeNumber);
            paragraphContainer.appendChild(seasonNumber);
            container === null || container === void 0 ? void 0 : container.appendChild(paragraphContainer);
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getDataLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${BASE_URL_LOCATION}/${id}`);
        if (response.status === 200) {
            const locatioN = yield response.json();
            const { id, name, type, dimension, residents, url, created } = locatioN;
            let locationInfo = {
                id: id,
                name: name,
                type: type,
                dimension: dimension,
                residents: residents,
                url: url,
                created: created
            };
            container === null || container === void 0 ? void 0 : container.replaceChildren();
            const titleLocation = document.createElement("h1");
            titleLocation.className = "btn_data_location";
            titleLocation.addEventListener("click", () => { characterView(id); });
            titleLocation.textContent = `${locationInfo.name} | (${locationInfo.dimension})`;
            const informationLocation = document.createElement("p");
            informationLocation.className = "text-center w-100";
            informationLocation.textContent = `Planet | ${locationInfo.dimension}`;
            container === null || container === void 0 ? void 0 : container.appendChild(titleLocation);
            container === null || container === void 0 ? void 0 : container.appendChild(informationLocation);
            residents.forEach((resident) => {
                getResident(resident);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getResident = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${url}`);
        const resident = yield response.json();
        const { name, status, species, image, location, id } = resident;
        let residentInformation = {
            id: id,
            name: name,
            status: status,
            species: species,
            image: image,
            location: location
        };
        const cardImage = document.createElement("card");
        cardImage.className = "card card-css cardImg";
        cardImage.addEventListener("click", () => { characterView(id); });
        const imagePhoto = document.createElement("img");
        imagePhoto.className = "card-img-top";
        imagePhoto.src = `${residentInformation.image}`;
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
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
        container === null || container === void 0 ? void 0 : container.appendChild(cardImage);
    }
    catch (error) {
        console.log(error);
    }
});
export { getDataEpisode, getEpisodesPagination, };
//# sourceMappingURL=Functions.js.map