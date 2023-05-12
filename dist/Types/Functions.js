var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getLocation = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://rickandmortyapi.com/api/location");
        if (response.status === 200) {
            const location = yield response.json();
            return location;
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://rickandmortyapi.com/api/character");
        if (response.status === 200) {
            const characters = yield response.json();
            return characters;
        }
    }
    catch (error) {
        console.log(error);
    }
});
const getEpisodes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://rickandmortyapi.com/api/episode");
        if (response.status === 200) {
            const episodes = yield response.json();
            return episodes;
        }
    }
    catch (error) {
        console.log(error);
    }
});
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
const getCharacter = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (response.status === 200) {
            const character = yield response.json();
            return character;
        }
    }
    catch (error) {
        console.log(error);
    }
});
export { getLocation, getCharacters, getEpisodes, getCharacter, getEpisodesPagination };
//# sourceMappingURL=Functions.js.map