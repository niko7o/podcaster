export interface IPodcast {
  id: string,
  slug: string,
  image: string,
  title: string,
  author: string
}

export type ApiPodcast = {
  'id': {
    label: string
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
