# Covid Recovery

Covid19 is on almost everybody's mind right now and most of the data is pretty hard to analyze from an optimistic perspective
This is aimed to aggregate data from Johns Hopkins API or worldometer/covid and sort it by a 'percent recovered' metric. (one that is missing from worldometer)
Of course, the accuracy of the metric very much depends on how each country monitors and reports data, especially the 'Total Recovered' indicator

You can view a live demo of this app on [Netlify](https://covid-recovery.netlify.app)

This project fetches data from [Johns Hopkins](https://covid-api.com) API
Or it fetches and scrapes data from [Worldometer](https://www.worldometers.info/coronavirus/)
Was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Styled with [Tailwindcss](https://tailwindcss.com/).
In order to resolve CORS restrictions you need a CORS oroxy. Special thanks to [Rob--W's cors anywhere](https://github.com/Rob--W/cors-anywhere)

## Run locally

clone and `yarn install` / `npm install`

Set `REACT_APP_H_DATA_PATH` to Johns Hopkins API. It default to `https://covid-api.com` No need for a CORS proxy in this case.

Set `REACT_APP_CORS_PROXY` to a CORS proxy. It defaults to `https://cors-anywhere.herokuapp.com` which is heavily throttled for good reasons.
Set `REACT_APP_W_DATA_PATH` to a path inside your proxy. It default to full URL `https://www.worldometers.info/coronavirus` as this is how cors-anywhere works.

`yarn start` / `npm start`
