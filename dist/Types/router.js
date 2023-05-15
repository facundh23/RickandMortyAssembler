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
const BASE_URL_EPISODE = "https://rickandmortyapi.com/api/episode";
const BASE_URL_LOCATION = "https://rickandmortyapi.com/api/location";
export const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
};
const routes = {
    "/": `${BASE_URL_CHARACTER}`,
    "/episode": `${BASE_URL_EPISODE}`,
    "/location": `${BASE_URL_LOCATION}`,
};
const handleLocation = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = yield fetch(route).then((data) => DataTransfer.text());
    (_a = document.querySelector("#content")) === null || _a === void 0 ? void 0 : _a.appendChild(html);
});
window.onpopstate = handleLocation;
window.route = route;
handleLocation();
//# sourceMappingURL=router.js.map