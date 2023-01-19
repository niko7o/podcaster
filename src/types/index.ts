export interface IPodcastDetail {
  details: IPodcastDetailSidebar,
  episodes: IEpisodeDetail[]
}

export interface IEpisodeDetail {
  title: string,
  date: Date,
  duration: number,
  episodeId: number,
  episodeDescription: string,
  episodeAudio: string
}

export interface IPodcastDetailSidebar {
  image: string,
  title: string,
  author: string,
  description: string
}

export interface IPodcast {
  id: string,
  slug: string,
  image: string,
  title: string,
  author: string
}

export type ApiPodcastDetailResponse = {
  description: string
  releaseDate: Date
  episodeUrl: string,
  trackName: string,
  trackTimeMillis: number,
  trackId: number
}

export type ApiPodcastResponse = {
  'id': {
    'attributes': {
      'im:id': string
    }
  },
  'im:image': ApiPodcastImage[],
  'title': {
    label: string
  },
  'im:artist': {
    label: string
  }
}

type ApiPodcastImage = {
  label: string
}
