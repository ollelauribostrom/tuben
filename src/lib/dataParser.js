export function getStation({ ResponseData: stations }) {
  const { Name: name, SiteId: id } = stations.shift();
  const similarStations = stations.map(station => station.Name);
  return { id, name, similarStations };
}

export function getLegType() {

}