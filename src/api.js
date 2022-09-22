import { createApi } from 'unsplash-js';

const APP_ACCESS_KEY = process.env.REACT_APP_APP_ACCESS_KEY;

const unsplash = createApi({
    accessKey: APP_ACCESS_KEY
});

export default unsplash;