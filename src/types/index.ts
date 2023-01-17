export interface IPodcast {
  image: string,
  title: string,
  author: string
}

export type ApiPodcast = {
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
