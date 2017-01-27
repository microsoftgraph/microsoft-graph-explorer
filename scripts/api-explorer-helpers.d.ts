declare const s: any;
declare const ace: any;
declare const jQuery: any;
declare const $: any;
declare const hello: any;
declare function run($scope: any, url: any, apiService: any): void;
declare function formatXml(xml: any): string;
declare function showDuration($scope: any, startTime: any): void;
declare function insertHeadersIntoResponseViewer($scope: any, headers: any, status: any): void;
declare function getRequestBodyEditor(): any;
declare function getJsonViewer(): any;
declare function showResults($scope: any, results: any, headers: any, status: any, responseContentType: any): void;
declare function handleImageResponse($scope: any, apiService: any, startTime: any, headers: any, status: any, handleUnsuccessfulQueryResponse: any): void;
declare function handleHtmlResponse($scope: any, startTime: any, results: any, headers: any, status: any): void;
declare function handleJsonResponse($scope: any, startTime: any, results: any, headers: any, status: any): void;
declare function handleXmlResponse($scope: any, startTime: any, results: any, headers: any, status: any): void;
declare function isImageResponse(headers: any): boolean;
declare function isHtmlResponse(headers: any): boolean;
declare function isXmlResponse(results: any): boolean;
declare function isJsonResponse(headers: any): boolean;
declare function getContentType(headers: any): any;
interface GraphNodeLink {
    isACollection: boolean;
    isEntitySet: boolean;
    type: string;
    name: string;
}
interface GraphEntity {
    name: string;
    links: {
        [Name: string]: GraphNodeLink;
    };
}
declare function getEntitySets(metadata: any): {};
declare function formatRequestHeaders(headers: any): {};
declare function createEntityTypeObject(DOMarray: any): {};
declare function showRequestHeaders($scope: any): void;
declare function getEntityTypes(metadata: any): {};
declare function myTrim(word: any): any;
declare function getEntityName(URL: any): any;
declare function getEntityFromTypeName(service: any, typePossiblyWithPrefix: string): any;
declare function constructGraphLinksFromServicePath(service: any): GraphEntity[];
declare function combineUrlOptionsWithCurrentUrl(service: any, urlOptions: string[]): string[];
declare function getUrlsFromServiceURL(service: any, lastCallSuccessful: any): string[];
declare function showRequestBodyEditor(): void;
declare function setSelectedTab(num: any): void;
declare function handleQueryString(service: any, actionValue: any, versionValue: any, requestValue: any): void;
declare function getUrlsFromEntityType(service: any, entity: GraphEntity): string[];
declare function parseMetadata(service: any, $scope: any): void;
