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
const getEpisodesPagination = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
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
            const episode = yield response.json();
            console.log(episode);
            return episode;
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getCharacter = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${BASE_URL_CHARACTER}/${id}`);
        if (response.status === 200) {
            const character = yield response.json();
            console.log(character);
            return character;
        }
    }
    catch (error) {
    }
});
const getDataLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${BASE_URL_LOCATION}/${id}`);
        if (response.status === 200) {
            const locatioN = yield response.json();
            console.log(locatioN);
            return locatioN;
        }
    }
    catch (error) {
    }
});
const getAllCharacter = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${BASE_URL_CHARACTER}`);
        if (response.status === 200) {
            const data = yield response.json();
            return data;
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getCharacterId = (e) => {
    if (e.target.classList.contains("info")) {
        const idCharacter = parseInt(e.target.id);
        getCharacter(idCharacter);
    }
    ;
};
const getEpisodeId = (e) => {
    if (e.target.classList.contains("infoEpisode")) {
        const idCharacter = parseInt(e.target.id);
        getDataEpisode(idCharacter);
    }
    ;
};
const getLocationId = (e) => {
    if (e.target.classList.contains("location")) {
        const idCharacter = parseInt(e.target.id);
        getDataLocation(idCharacter);
    }
    ;
};
export { getDataEpisode, getEpisodesPagination, getAllCharacter, getCharacterId, getEpisodeId, getLocationId };
//# sourceMappingURL=Functions.js.map