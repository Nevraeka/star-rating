export function getCSS(path){
    let link = document.createElement('link');
    link.href = path;
    link.rel = "stylesheet";
    document.head.appendChild(link);
}


export default function exists(testItem) {
    return typeof testItem !== "undefined" && testItem !== null;
}