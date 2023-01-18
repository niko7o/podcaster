export interface IPodcastDetailEpisode {
  title: string,
  date: string,
  duration: string
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
  trackTimeMillis: number,
  trackName: string,
  releaseDate: Date
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
