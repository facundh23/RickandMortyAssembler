var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodesPagination, getId } from './Types/Functions.js';
const listEpisodes = document.querySelector("#episodesList");
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
    if (page < 4) {
        const response = yield getEpisodesPagination(page);
        response === null || response === void 0 ? void 0 : response.results.forEach((episodeLi) => {
            const { episode, id } = episodeLi;
            anchorItemSidebar = document.createElement("a");
            anchorItemSidebar.className = "selectedEpisode nav-link";
            anchorItemSidebar.id = `${id}`;
            anchorItemSidebar.onclick = getId;
            listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(anchorItemSidebar);
            anchorItemSidebar.textContent = `Season ${episode.charAt(2)}-Episode: ${episode.substr(4, 5)}`;
        });
        listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(anchorItemSidebar);
        const ListInView = document.querySelectorAll(".aside-section .episodes .selectedEpisode");
        let lastEpisode = ListInView[ListInView.length - 1];
        paginatorController.observe(lastEpisode);
    }
});
showListEpisodes(page);
//# sourceMappingURL=index.js.map