let { mode, brand, country } = process.env;

const FRONT_END_FOLDER = ".";
const WEB_FOLDER = "..";
brand = brand != undefined ? brand : "electrolux";
country = country != undefined ? country : "au";
const THEME_FOLDER = `themes/${brand}/${country}`;

const pathObj = {
    theme: {
        entry: `${FRONT_END_FOLDER}`,
        outRoot: `${WEB_FOLDER}/dist//`,
        outTheme: `${WEB_FOLDER}/dist//${brand}/${country}`,
        outTemplates: `${WEB_FOLDER}/dist//templates`,
        templatesPath: `${FRONT_END_FOLDER}/templates`,
        cssPath: `${FRONT_END_FOLDER}/styles/${THEME_FOLDER}/scss/entry`,
        assetsPath: `${FRONT_END_FOLDER}/styles/${THEME_FOLDER}/assets`,
        beLayout: `${WEB_FOLDER}/Features/Shared/Resources`,
        masterLayout: `${WEB_FOLDER}/Features/Shared`,
        publicPath: "../../www/electrolux",
        brandNme: `${brand}`,
        countryName: `${country}`,
    },
    default: {
        entry: `${FRONT_END_FOLDER}`,
        outRoot: `${WEB_FOLDER}/dist/`,
        outTheme: `${WEB_FOLDER}/dist//${brand}/${country}`,
        outTemplates: `${WEB_FOLDER}/dist//templates`,
        templatesPath: `${FRONT_END_FOLDER}/templates`,
        cssPath: `${FRONT_END_FOLDER}/styles/${THEME_FOLDER}/scss/entry`,
        assetsPath: `${FRONT_END_FOLDER}/styles/${THEME_FOLDER}/assets`,
        beLayout: `${WEB_FOLDER}/Features/Shared/Resources`,
        masterLayout: `${WEB_FOLDER}/Features/Shared`,
        publicPath: "../../www/electrolux",
        brandNme: `${brand}`,
        countryName: `${country}`,
    },
};

const entryPath = pathObj[mode] ? pathObj[mode].entry : pathObj.default.entry;
const outRoot = pathObj[mode] ? pathObj[mode].outRoot : pathObj.default.outRoot;
const outTheme = pathObj[mode] ? pathObj[mode].outTheme : pathObj.default.outTheme;
const outTemplates = pathObj[mode] ? pathObj[mode].outTemplates : pathObj.default.outTemplates;
const templatesPath = pathObj[mode] ? pathObj[mode].templatesPath : pathObj.default.templatesPath;
const assetsPath = pathObj[mode] ? pathObj[mode].assetsPath : pathObj.default.assetsPath;
const cssPath = pathObj[mode] ? pathObj[mode].cssPath : pathObj.default.cssPath;
const beLayout = pathObj[mode] ? pathObj[mode].beLayout : pathObj.default.beLayout;
const masterLayout = pathObj[mode] ? pathObj[mode].masterLayout : pathObj.default.masterLayout;
const publicPath = pathObj[mode] ? pathObj[mode].publicPath : pathObj.default.publicPath;
const brandName = pathObj[mode] ? pathObj[mode].brandNme : pathObj.default.brandNme;
const countryName = pathObj[mode] ? pathObj[mode].countryName : pathObj.default.countryName;

module.exports = {
    entryPath,
    FRONT_END_FOLDER,
    outRoot,
    outTheme,
    outTemplates,
    templatesPath,
    assetsPath,
    cssPath,
    beLayout,
    masterLayout,
    publicPath,
    BUILD_TIME: process.env.BUILD_TIME,
    brandName,
    countryName,
};