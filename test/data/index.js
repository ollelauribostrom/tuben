export const journeyArray = [
  {
    from: 'Slussen',
    to: 'T-Centralen',
    departureTime: '12:01:00',
    arrivalTime: '12:05:00',
    departureDate: '2017-11-23',
    arrivalDate: '2017-11-23',
    legs: [
      {
        from: 'Slussen',
        to: 'T-Centralen',
        departureTime: '12:01:00',
        arrivalTime: '12:05:00',
        departureDate: '2017-11-23',
        arrivalDate: '2017-11-23',
        line: '13',
        direction: 'Ropsten',
        type: { name: 'METRO', symbol: '🚇', char: 'T', svName: 'Tunnelbana' },
      },
    ],
  },
  {
    from: 'Slussen',
    to: 'T-Centralen',
    departureTime: '12:02:00',
    arrivalTime: '12:06:00',
    departureDate: '2017-11-23',
    arrivalDate: '2017-11-23',
    legs: [
      {
        from: 'Slussen',
        to: 'T-Centralen',
        departureTime: '12:02:00',
        arrivalTime: '12:06:00',
        departureDate: '2017-11-23',
        arrivalDate: '2017-11-23',
        line: '19',
        direction: 'Hässelby strand',
        type: { name: 'METRO', symbol: '🚇', char: 'T' },
      },
    ],
  },
  {
    from: 'Slussen',
    to: 'T-Centralen',
    departureTime: '12:04:00',
    arrivalTime: '12:09:00',
    departureDate: '2017-11-23',
    arrivalDate: '2017-11-23',
    legs: [
      {
        from: 'Slussen',
        to: 'T-Centralen',
        departureTime: '12:04:00',
        arrivalTime: '12:09:00',
        departureDate: '2017-11-23',
        arrivalDate: '2017-11-23',
        line: '14',
        direction: 'Mörby centrum',
        type: { name: 'METRO', symbol: '🚇', char: 'T' },
      },
    ],
  },
];

export const stationObject = {
  id: '9430',
  name: 'Nacka station (Nacka)',
  similarStations: ['Järla station (Nacka)', 'Sickla station (Nacka)'],
};

export const mockStationData = {
  "StatusCode": 0,
  "Message": null,
  "ExecutionTime": 0,
  "ResponseData": [
    {
      "Name": "Nacka station (Nacka)",
      "SiteId": "9430",
      "Type": "Station",
      "X": "18130442",
      "Y": "59306809"
    },
    {
      "Name": "Järla station (Nacka)",
      "SiteId": "9429",
      "Type": "Station",
      "X": "18152232",
      "Y": "59307510"
    },
    {
      "Name": "Sickla station (Nacka)",
      "SiteId": "9431",
      "Type": "Station",
      "X": "18119889",
      "Y": "59306602"
    }
  ]
};

export const mockJourneyData = {
  "Trip": [
    {
      "ServiceDays": [
        {
          "planningPeriodBegin": "2017-11-21",
          "planningPeriodEnd": "2018-01-05",
          "sDaysR": "nicht täglich",
          "sDaysI": "22. Nov bis 8. Dez 2017 Mo - Fr",
          "sDaysB": "F3E7C0000000"
        }
      ],
      "LegList": {
        "Leg": [
          {
            "Origin": {
              "name": "Slussen",
              "type": "ST",
              "id": "A=1@O=Slussen@X=18071491@Y=59319511@U=74@L=400102011@",
              "extId": "400102011",
              "lon": 18.071491,
              "lat": 59.319511,
              "prognosisType": "PROGNOSED",
              "time": "12:01:00",
              "date": "2017-11-23",
              "track": "2",
              "hasMainMast": true,
              "mainMastId": "A=1@O=Slussen (Stockholm)@X=18071860@Y=59320284@U=74@L=300109192@",
              "mainMastExtId": "300109192"
            },
            "Destination": {
              "name": "T-Centralen",
              "type": "ST",
              "id": "A=1@O=T-Centralen@X=18061477@Y=59331358@U=74@L=400101051@",
              "extId": "400101051",
              "lon": 18.061477,
              "lat": 59.331358,
              "prognosisType": "PROGNOSED",
              "time": "12:05:00",
              "date": "2017-11-23",
              "track": "3",
              "hasMainMast": true,
              "mainMastId": "A=1@O=Sergels torg (Stockholm)@X=18064327@Y=59332563@U=74@L=300101000@",
              "mainMastExtId": "300101000"
            },
            "JourneyDetailRef": {
              "ref": "1|6632|0|74|23112017"
            },
            "JourneyStatus": "P",
            "Product": {
              "name": "TUNNELBANA 13",
              "num": "20703",
              "line": "13",
              "catOut": "METRO ",
              "catIn": "MET",
              "catCode": "1",
              "catOutS": "MET",
              "catOutL": "TUNNELBANA ",
              "operatorCode": "SL",
              "operator": "Storstockholms Lokaltrafik",
              "admin": "101013"
            },
            "idx": "0",
            "name": "TUNNELBANA 13",
            "number": "20703",
            "category": "MET",
            "type": "JNY",
            "reachable": true,
            "direction": "Ropsten"
          }
        ]
      },
      "TariffResult": {
        "fareSetItem": [
          {
            "fareItem": [
              {
                "name": "Reskassa",
                "desc": "Helt pris",
                "price": 3000,
                "cur": "SEK"
              },
              {
                "name": "Övriga försäljningsställen",
                "desc": "Helt pris",
                "price": 4300,
                "cur": "SEK"
              },
              {
                "name": "Konduktör på Djurgårds- och Roslagsbanan",
                "desc": "Helt pris",
                "price": 6000,
                "cur": "SEK"
              },
              {
                "name": "Reskassa",
                "desc": "Reducerat pris",
                "price": 2000,
                "cur": "SEK"
              },
              {
                "name": "Övriga försäljningsställen",
                "desc": "Reducerat pris",
                "price": 2900,
                "cur": "SEK"
              },
              {
                "name": "Konduktör på Djurgårds- och Roslagsbanan",
                "desc": "Reducerat pris",
                "price": 4000,
                "cur": "SEK"
              }
            ],
            "name": "ONEWAY",
            "desc": "SL"
          }
        ]
      },
      "idx": 0,
      "tripId": "C-0",
      "ctxRecon": "T$A=1@O=Slussen@L=400102011@a=128@$A=1@O=T-Centralen@L=400101051@a=128@$201711231201$201711231205$ $",
      "duration": "PT4M",
      "checksum": "70DB665F_4"
    },
    {
      "ServiceDays": [
        {
          "planningPeriodBegin": "2017-11-21",
          "planningPeriodEnd": "2018-01-05",
          "sDaysR": "täglich",
          "sDaysI": "nicht 5. Jan",
          "sDaysB": "FFFFFFFFFFF8"
        }
      ],
      "LegList": {
        "Leg": [
          {
            "Origin": {
              "name": "Slussen",
              "type": "ST",
              "id": "A=1@O=Slussen@X=18071743@Y=59319591@U=74@L=400101011@",
              "extId": "400101011",
              "lon": 18.071743,
              "lat": 59.319591,
              "prognosisType": "PROGNOSED",
              "time": "12:02:00",
              "date": "2017-11-23",
              "track": "1",
              "hasMainMast": true,
              "mainMastId": "A=1@O=Slussen (Stockholm)@X=18071860@Y=59320284@U=74@L=300109192@",
              "mainMastExtId": "300109192"
            },
            "Destination": {
              "name": "T-Centralen",
              "type": "ST",
              "id": "A=1@O=T-Centralen@X=18061639@Y=59331295@U=74@L=400102051@",
              "extId": "400102051",
              "lon": 18.061639,
              "lat": 59.331295,
              "prognosisType": "PROGNOSED",
              "time": "12:06:00",
              "date": "2017-11-23",
              "track": "1",
              "hasMainMast": true,
              "mainMastId": "A=1@O=Sergels torg (Stockholm)@X=18064327@Y=59332563@U=74@L=300101000@",
              "mainMastExtId": "300101000"
            },
            "JourneyDetailRef": {
              "ref": "1|10910|6|74|23112017"
            },
            "JourneyStatus": "P",
            "Product": {
              "name": "TUNNELBANA 19",
              "num": "10530",
              "line": "19",
              "catOut": "METRO ",
              "catIn": "MET",
              "catCode": "1",
              "catOutS": "MET",
              "catOutL": "TUNNELBANA ",
              "operatorCode": "SL",
              "operator": "Storstockholms Lokaltrafik",
              "admin": "101019"
            },
            "idx": "0",
            "name": "TUNNELBANA 19",
            "number": "10530",
            "category": "MET",
            "type": "JNY",
            "reachable": true,
            "direction": "Hässelby strand"
          }
        ]
      },
      "TariffResult": {
        "fareSetItem": [
          {
            "fareItem": [
              {
                "name": "Reskassa",
                "desc": "Helt pris",
                "price": 3000,
                "cur": "SEK"
              },
              {
                "name": "Övriga försäljningsställen",
                "desc": "Helt pris",
                "price": 4300,
                "cur": "SEK"
              },
              {
                "name": "Konduktör på Djurgårds- och Roslagsbanan",
                "desc": "Helt pris",
                "price": 6000,
                "cur": "SEK"
              },
              {
                "name": "Reskassa",
                "desc": "Reducerat pris",
                "price": 2000,
                "cur": "SEK"
              },
              {
                "name": "Övriga försäljningsställen",
                "desc": "Reducerat pris",
                "price": 2900,
                "cur": "SEK"
              },
              {
                "name": "Konduktör på Djurgårds- och Roslagsbanan",
                "desc": "Reducerat pris",
                "price": 4000,
                "cur": "SEK"
              }
            ],
            "name": "ONEWAY",
            "desc": "SL"
          }
        ]
      },
      "idx": 1,
      "tripId": "C-1",
      "ctxRecon": "T$A=1@O=Slussen@L=400101011@a=128@$A=1@O=T-Centralen@L=400102051@a=128@$201711231202$201711231206$ $",
      "duration": "PT4M",
      "checksum": "71DB675F_4"
    },
    {
      "ServiceDays": [
        {
          "planningPeriodBegin": "2017-11-21",
          "planningPeriodEnd": "2018-01-05",
          "sDaysR": "nicht täglich",
          "sDaysI": "22. Nov bis 22. Dez 2017 Mo - Fr",
          "sDaysB": "F3E7CF9F0000"
        }
      ],
      "LegList": {
        "Leg": [
          {
            "Origin": {
              "name": "Slussen",
              "type": "ST",
              "id": "A=1@O=Slussen@X=18071491@Y=59319511@U=74@L=400102011@",
              "extId": "400102011",
              "lon": 18.071491,
              "lat": 59.319511,
              "prognosisType": "PROGNOSED",
              "time": "12:04:00",
              "date": "2017-11-23",
              "track": "2",
              "hasMainMast": true,
              "mainMastId": "A=1@O=Slussen (Stockholm)@X=18071860@Y=59320284@U=74@L=300109192@",
              "mainMastExtId": "300109192"
            },
            "Destination": {
              "name": "T-Centralen",
              "type": "ST",
              "id": "A=1@O=T-Centralen@X=18061477@Y=59331358@U=74@L=400101051@",
              "extId": "400101051",
              "lon": 18.061477,
              "lat": 59.331358,
              "prognosisType": "PROGNOSED",
              "time": "12:09:00",
              "date": "2017-11-23",
              "track": "3",
              "hasMainMast": true,
              "mainMastId": "A=1@O=Sergels torg (Stockholm)@X=18064327@Y=59332563@U=74@L=300101000@",
              "mainMastExtId": "300101000"
            },
            "JourneyDetailRef": {
              "ref": "1|7910|0|74|23112017"
            },
            "JourneyStatus": "P",
            "Product": {
              "name": "TUNNELBANA 14",
              "num": "20131",
              "line": "14",
              "catOut": "METRO ",
              "catIn": "MET",
              "catCode": "1",
              "catOutS": "MET",
              "catOutL": "TUNNELBANA ",
              "operatorCode": "SL",
              "operator": "Storstockholms Lokaltrafik",
              "admin": "102014"
            },
            "idx": "0",
            "name": "TUNNELBANA 14",
            "number": "20131",
            "category": "MET",
            "type": "JNY",
            "reachable": true,
            "direction": "Mörby centrum"
          }
        ]
      },
      "TariffResult": {
        "fareSetItem": [
          {
            "fareItem": [
              {
                "name": "Reskassa",
                "desc": "Helt pris",
                "price": 3000,
                "cur": "SEK"
              },
              {
                "name": "Övriga försäljningsställen",
                "desc": "Helt pris",
                "price": 4300,
                "cur": "SEK"
              },
              {
                "name": "Konduktör på Djurgårds- och Roslagsbanan",
                "desc": "Helt pris",
                "price": 6000,
                "cur": "SEK"
              },
              {
                "name": "Reskassa",
                "desc": "Reducerat pris",
                "price": 2000,
                "cur": "SEK"
              },
              {
                "name": "Övriga försäljningsställen",
                "desc": "Reducerat pris",
                "price": 2900,
                "cur": "SEK"
              },
              {
                "name": "Konduktör på Djurgårds- och Roslagsbanan",
                "desc": "Reducerat pris",
                "price": 4000,
                "cur": "SEK"
              }
            ],
            "name": "ONEWAY",
            "desc": "SL"
          }
        ]
      },
      "idx": 2,
      "tripId": "C-2",
      "ctxRecon": "T$A=1@O=Slussen@L=400102011@a=128@$A=1@O=T-Centralen@L=400101051@a=128@$201711231204$201711231209$ $",
      "duration": "PT5M",
      "checksum": "73DB6A5F_4"
    }
  ],
  "serverVersion": "1.2",
  "dialectVersion": "1.23",
  "requestId": "1511366146736",
  "scrB": "1|OB|MTµ11µ6481µ6481µ6485µ6485µ0µ0µ5µ6480µ1µ-2147483646µ0µ1µ2|PDHµa558b7b6f62b89f707b822d023bec3a7",
  "scrF": "1|OF|MTµ11µ6489µ6489µ6493µ6493µ0µ0µ5µ6487µ5µ-2147483646µ0µ1µ2|PDHµa558b7b6f62b89f707b822d023bec3a7"
};
