import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

export default new MockAdapter(axios, { delayResponse: 2000 });

export const regexPath = (path) => new RegExp(`${path}$`.replace(/\//g, '\\/').replace(/\?/g, '\\?'));
