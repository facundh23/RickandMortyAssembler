var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getLocation, getCharacters, getEpisodes, getEpisodesPagination } from './Types/Functions.js';
const btnCharacterNav = document.querySelector("#charactersMain");
const btnEpisodeNav = document.querySelector("#episodesSection");
const btnLocationNav = document.querySelector("#locationSection");
const listEpisodes = document.querySelector("#episodesList");
btnCharacterNav === null || btnCharacterNav === void 0 ? void 0 : btnCharacterNav.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield getCharacters();
}));
btnEpisodeNav === null || btnEpisodeNav === void 0 ? void 0 : btnEpisodeNav.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield getEpisodes();
}));
btnLocationNav === null || btnLocationNav === void 0 ? void 0 : btnLocationNav.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield getLocation();
}));
let page = 1;
let anchorItemSidebar = document.createElement("a");
anchorItemSidebar.className = "selectedEpisode nav-link";
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
const showListEpisodes = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield getEpisodesPagination(page);
    listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(anchorItemSidebar);
    response === null || response === void 0 ? void 0 : response.results.forEach((episodeLi) => {
        const { episode } = episodeLi;
        anchorItemSidebar = document.createElement("a");
        anchorItemSidebar.className = "selectedEpisode nav-link";
        listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(anchorItemSidebar);
        anchorItemSidebar.textContent = `Season ${episode.charAt(2)} - Episode: ${episode.substr(4, 5)}`;
    });
    listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(anchorItemSidebar);
    const ListInView = document.querySelectorAll(".aside-section .episodes .selectedEpisode");
    let lastEpisode = ListInView[ListInView.length - 1];
    paginatorController.observe(lastEpisode);
});
window.onload = showListEpisodes;
//# sourceMappingURL=index.js.map