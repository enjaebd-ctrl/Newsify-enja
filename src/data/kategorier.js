// Listen over kategorier i appen
// navn = det brugeren ser, sektion = det NYT's API kalder sektionen
// Det er lavet som en liste ét sted, så Home og Settings bruger den samme
// NYT har ikke Europe, så jeg bruger World i stedet
export const kategorier = [
  { navn: 'World', sektion: 'world' },
  { navn: 'Health', sektion: 'health' },
  { navn: 'Sport', sektion: 'sports' },
  { navn: 'Business', sektion: 'business' },
  { navn: 'Travel', sektion: 'travel' },
]