/**
 * Function holding some useful methods.
 */
export function getBaseUrl() {
    if (!document) return null
    const regex = /(http|https):\/\/[\w\n:\-.]*/gm
    return regex.exec(document.URL)[0]
}
export function isTactil() {
    if (!window) return null
    return window.TouchEvent
}
const t = {
    getBaseUrl:getBaseUrl,
    isTactil:isTactil
}
export default t