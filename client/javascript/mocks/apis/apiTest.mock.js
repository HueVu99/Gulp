import mockAxios, { regexPath } from "../mock";

import { TEST } from "../../constants";
import testData from "../data/test.json";

mockAxios.onGet(regexPath(`${TEST}`), {}).reply(200, testData);
