const { execSync } = require("child_process");
process.env.BUILD_TIME = new Date().getTime();
console.log("🚀 ~ file: buildThemes.js ~ line 3 ~ process.env", process.env)
const themeArgv = process.argv[2];
const countryArgv = process.argv[3];
const brands = {
  electrolux: ["au", "il", "nz", "my", "th", "kr", "vn", "hk", "id", "ilrtl", "ph", "tw", "za", "sg", "sa", "sartl", "jp", "arabia", "arabiartl"],
  aeg: ["au", "cn", "il", "jp", "nz", "ma", "za"],
  beefeater: ["au", "nz"],
  westinghouse: ["au", "nz"],
  kelvinator: ["au", "nz"],
  chef: ["au"],
  zanussi: ["ma", "eg", "il"],
  authurmartin: ["ma"],
};

const buildTheme = (brand, country) => `set brand=${brand}&& set country=${country}&& gulp build-theme`;
function PerformTask(theme, country) {
  const command = buildTheme(theme, country);
  console.log(`set mode=theme&& ${command}`);
  execSync(`set mode=theme&& ${command} --production`, { stdio: [0, 1, 2] });
}
(function () {
  execSync(`set mode=theme&& gulp preprocessing`, { stdio: [0, 1, 2] });

  if (themeArgv && countryArgv) {
    PerformTask(themeArgv, countryArgv);
  } else {
    for (let theme in brands) {
      const countries = brands[theme];
      for (let country of countries) {
        console.log(`theme=${theme}, counry=${country}`);
        PerformTask(theme, country);
      }
    }
  }
  //execSync(`set mode=theme&& gulp build-script --production`, { stdio: [0, 1, 2] });
})();
