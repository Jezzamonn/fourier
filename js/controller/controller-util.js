export function getScrollPosition(elem) {
    const boundingRect = elem.getBoundingClientRect();
    const centerY = (boundingRect.top + boundingRect.bottom) / 2;
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight)
    return centerY / windowHeight;
}

export function elementInView(elem) {
    // Thanks stack overflow https://stackoverflow.com/a/7557433
    const boundingRect = elem.getBoundingClientRect();

    return (
        boundingRect.bottom >= 0 &&
        boundingRect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        boundingRect.right >= 0 &&
        boundingRect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}