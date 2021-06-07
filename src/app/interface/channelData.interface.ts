export interface ICurrentData {
    channel?:unknown;
    name?: string;
    introduce?: string;
    picture?: {
      hcsSlaveAddrs: [string];
      extensionFields: [string];
      backgrounds: [string];
      channelPics: [string];
      channelBlackWhites: [string];
      others: [string];
    },
    genres?: [
      {
        genreID: string;
        genreType: string;
        genreName: string;
      },
      {
        genreID: string;
        genreType: string;
        genreName: string;
      }
    ]

}
