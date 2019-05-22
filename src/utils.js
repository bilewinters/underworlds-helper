const deepClone = src => JSON.parse(JSON.stringify(src));

const getTitleFontPaddingTop = os => (os === 'ios' ? 8 : 0);
const getLabelFontPaddingTop = os => (os === 'ios' ? 6 : 0);

export { deepClone, getTitleFontPaddingTop, getLabelFontPaddingTop };
