export function encodeHack(hack) {
  const json = JSON.stringify(hack);
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeHack(encoded) {
  const json = decodeURIComponent(escape(atob(encoded)));
  return JSON.parse(json);
}

export function getShareUrl(encoded) {
  return `${window.location.origin}${window.location.pathname}?h=${encoded}`;
}