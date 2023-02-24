// Array of country objects for the flag dropdown.

// Here is the criteria for the plugin to support a given country/territory
// - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
// - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
// - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
// - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml

// Each country array has the following information:
// [
//    Country name,
//    iso2 code,
//    International dial code,
//    Order (if >1 country with same dial code),
//    Area codes
// ]
var allCountries = [
    [
        "Australia",
        "au",
        "61",
        0
    ],
    [
        "New Zealand",
        "nz",
        "64"
    ],
    [
        "Singapore",
        "sg",
        "65"
    ],
    [
        "Malaysia",
        "my",
        "60"
    ],
    [
        "Vietnam (Việt Nam)",
        "vn",
        "84"
    ],
    [
        "Philippines",
        "ph",
        "63"
    ],
    [
        "Indonesia",
        "id",
        "62"
    ],
    [
        "Thailand (ไทย)",
        "th",
        "66"
    ],
    [
        "South Korea (대한민국)",
        "kr",
        "82"
    ],
    [
        "Taiwan (台灣)",
        "tw",
        "886"
    ],
    [
        "Japan (日本)",
        "jp",
        "81"
    ],
    [
        "Hong Kong (香港)",
        "hk",
        "852"
    ],
    [
        "China (中国)",
        "cn",
        "86"
    ],
    [
        "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
        "sa",
        "966"
    ],
    [
        "Morocco (‫المغرب‬‎)",
        "ma",
        "212",
        0
    ],
    [
        "Egypt (‫مصر‬‎)",
        "eg",
        "20"
    ],
    [
        "South Africa",
        "za",
        "27"
    ],
    [
        "Israel (‫ישראל‬‎)",
        "il",
        "972"
    ],
    [
        "Kuwait (‫الكويت‬‎)",
        "kw",
        "965"
    ],
    [
        "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
        "ae",
        "971"
    ],
    [
        "Jordan (‫الأردن‬‎)",
        "jo",
        "962"
    ],
    [
        "Iraq (‫العراق‬‎)",
        "iq",
        "964"
        ],
    [
        "Oman (‫عُمان‬‎)",
        "om",
        "968"
    ],
    [
        "Bahrain (‫البحرين‬‎)",
        "bh",
        "973"
    ],
    [
        "Qatar (‫قطر‬‎)",
        "qa",
        "974"
    ],
];

// loop over all of the countries above, restructuring the data to be objects with named keys
for (var i = 0; i < allCountries.length; i++) {
    var c = allCountries[i];
    allCountries[i] = {
        name: c[0],
        iso2: c[1],
        dialCode: c[2],
        priority: c[3] || 0,
        areaCodes: c[4] || null
    };
}

export default allCountries;
