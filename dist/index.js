var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodesPagination, getDataEpisode, getAllCharacter, getCharacterId, getEpisodeId, getLocationId } from './Types/Functions.js';
const container = document.querySelector("#content");
const listEpisodes = document.querySelector("#episodesList");
const sectionInfo = document.querySelector("#infoContainer");
const infoCharacter = document.querySelector("#infoCharacter");
let page = 1;
let characterPages = 1;
let anchorItemSidebar = document.createElement("a");
anchorItemSidebar.className = "selectedEpisode nav-link";
let sectionLocation = document.createElement("section");
sectionLocation.className = "location-header w-100";
let paginatorController = new IntersectionObserver((inbounds, paginatorController) => {
    inbounds.forEach(inbound => {
        if (inbound.isIntersecting) {
            page++;
            showListEpisodes(page);
        }
    });
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0
});
let containerController = new IntersectionObserver((inbounds, containerController) => {
    inbounds.forEach(inbound => {
        if (inbound.isIntersecting) {
            characterPages++;
            showAllCharacters(characterPages);
        }
    });
}, {
    rootMargin: '0px 0px -90px 0px',
    threshold: 1.0
});
const showEpisode = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield getDataEpisode(id);
    console.log(response);
});
const showListEpisodes = (page) => __awaiter(void 0, void 0, void 0, function* () {
    if (page < 4) {
        const response = yield getEpisodesPagination(page);
        response === null || response === void 0 ? void 0 : response.results.forEach((episodeInfo) => {
            const { episode, id, air_date, characters, name } = episodeInfo;
            let infoEp = {
                id: id,
                episode: episode,
                air_date: air_date,
                characters: characters,
                name: name
            };
            anchorItemSidebar = document.createElement("a");
            anchorItemSidebar.className = "selectedEpisode nav-link infoEpisode";
            anchorItemSidebar.id = `${infoEp.id}`;
            anchorItemSidebar.onclick = getEpisodeId;
            listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(anchorItemSidebar);
            anchorItemSidebar.textContent = `Season ${episode.charAt(2)}-Episode: ${episode.substr(4, 5)}`;
        });
        listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(anchorItemSidebar);
        const ListInView = document.querySelectorAll(".aside-section .episodes .selectedEpisode");
        let lastEpisode = ListInView[ListInView.length - 1];
        paginatorController.observe(lastEpisode);
    }
});
const showAllCharacters = (characterPages) => __awaiter(void 0, void 0, void 0, function* () {
    if (characterPages < 42) {
        const response = yield getAllCharacter();
        response.results.forEach((character) => {
            const { id, name, gender, image, species, status, location, episode } = character;
            let characterInfo = {
                id: id,
                name: name,
                status: status,
                species: species,
                url: image,
                location: location.name
            };
            const card = document.createElement("div");
            card.className = "card card-css cardImg";
            const cardImg = document.createElement("img");
            cardImg.className = "card-img-top cardImgBody h-75";
            cardImg.src = `${characterInfo.url}`;
            cardImg.alt = `${characterInfo.name}`;
            const cardTitle = document.createElement("h5");
            cardTitle.className = "card-title";
            cardTitle.textContent = `${characterInfo.name}`;
            const spanParagraph = document.createElement("span");
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
            card.appendChild(cardImg);
            card.appendChild(cardTitle);
            card.appendChild(spanTitle);
            card.appendChild(spanParagraph);
            card.appendChild(btnInfoCharacter);
            card.appendChild(btnInfoLocation);
            container === null || container === void 0 ? void 0 : container.appendChild(card);
            const LastInView = document.querySelectorAll(".container div.cardImg");
            let lastEpisode = LastInView[LastInView.length - 1];
            containerController.observe(lastEpisode);
        });
    }
});
showAllCharacters(characterPages);
showListEpisodes(page);
//# sourceMappingURL=index.js.map