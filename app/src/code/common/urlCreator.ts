
export class UrlCreator {
    static createUrl(query : string) {
        let url = window.location.origin + window.location.pathname + "?" + query;

        return url;
    }
}