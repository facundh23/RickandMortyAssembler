var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodesPagination, getDataEpisode } from './Types/Functions.js';
window.onload = () => { showListEpisodes(page); };
const listEpisodes = document.querySelector("#episodesList");
const sectionInfo = document.querySelector("#sectionInfo");
let page = 1;
let characterPages = 1;
let btnListEpisodes = document.createElement("a");
btnListEpisodes.className = "selectedEpisode nav-link";
let sectionLocation = document.createElement("section");
sectionLocation.className = "location-header w-100";
let titleContainer = document.createElement("div");
titleContainer.className = "title_container";
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
            btnListEpisodes = document.createElement("a");
            btnListEpisodes.className = "selectedEpisode btn btn-success mb-3 w-100 infoEpisode";
            btnListEpisodes.id = `${infoEp.id}`;
            btnListEpisodes.setAttribute("data-id", `${infoEp.id}`);
            btnListEpisodes.onclick = () => { getDataEpisode(id); };
            listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(btnListEpisodes);
            btnListEpisodes.textContent = `Season ${episode.charAt(2)}-Episode: ${episode.substr(4, 5)}`;
        });
        sectionInfo === null || sectionInfo === void 0 ? void 0 : sectionInfo.appendChild(titleContainer);
        listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(btnListEpisodes);
        const ListInView = document.querySelectorAll(".aside-section .episodes .selectedEpisode");
        let lastEpisode = ListInView[ListInView.length - 1];
        paginatorController.observe(lastEpisode);
    }
});
//# sourceMappingURL=index.js.map