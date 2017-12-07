# tuben <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Storstockholms_Lokaltrafik_logo.svg/737px-Storstockholms_Lokaltrafik_logo.svg.png" width="36,85" height="30"> 
[![Coverage Status](https://coveralls.io/repos/github/ollelauribostrom/tuben/badge.svg?branch=master)](https://coveralls.io/github/ollelauribostrom/tuben?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/ollelauribostrom/tuben/badge.svg)](https://snyk.io/test/github/ollelauribostrom/tuben) [![npm version](https://badge.fury.io/js/tuben.svg)](https://badge.fury.io/js/tuben)

A CLI travel planner for SL (Storstockholms Lokaltrafik)

> Under construction

Installation
------------
`npm install tuben -g`   
`yarn global add tuben`

```
# Currently you must supply your own API-keys to be able to perform searches. 
STATION_API_KEY=<Trafiklab_Platsuppslag_key>
JOURNEY_API_KEY=<Trafiklab_Reseplanerare3_key>
```

Example Usage
-------------
`tuben -f Slussen -t Odenplan`   
`tuben --from "Nacka Station" --to "Uppsala"`

#### Available commands
    -V, --version      output the version number
    -f, --from [from]  from destination
    -t, --to [to]      to destination
    -h, --help         output usage information

Contribute
----------
Cool that you want to contribute. Follow theese guidelines when submitting bugfixes and additions:

1. Fork the repo on Github
2. Clone your fork locally
3. Make your changes & write tests for them
4. Make sure nothing is broken by running `npm test`
5. Make sure coverage is still good by running `npm run coverage`
6. Make sure you follow the code style by running `npm run lint`
7. Commit & push to your fork
8. Submit a Pull request

#### Todo-list
- [ ] Create proxy server that acts as a middle man for all requests and just adds API-keys
- [ ] Use different colors for different subway lines (i.e. green for the green line)
- [ ] Use different colors for the different kindes of buses (blue buses/red buses)
- [ ] Make the cli-table more responsive by using cli-width & do some calculations before printing
- [ ] If departure time spans over multiple dates, divide search result into groups like (Today, Tomorrow)
- [ ] Take time and date as arguments when searching (i.e. make it possible to search for journeys at a specific time/date)
- [ ] Make it pretty!

#### Available commands
- `npm run dev`: Start babel file watch
- `npm run build`: Build to /dist folder
- `npm test`: Run tests
- `npm run coverage`: Run test coverage using nyc, outputs report to /test/coverage
- `npm run lint`: Run eslint

Issues
------
Feel free to open an issue @ Github if you are experiencing any problems / want to suggest a new feature.

License
-------
MIT
