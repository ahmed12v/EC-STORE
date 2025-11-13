export interface Result {
  results: number
  metadata: Metadata
  data: ctegories[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface ctegories {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
