export type UserT = {
  name: string;
  mail: string;
}

export type DragonT = {
  createdAt: string;
  name: string;
  type: string;
  id: string;
  histories?: Array<string>;
}

type StoreError = {
  type: string;
  title: string;
  description: string
}

export type UserStoreT = {
  authenticated: boolean;
  user: UserT;
  errors?: Array<StoreError>;
}

export type DragonStoreT = {
  list: Array<DragonT>;
  selected?: DragonT;
  errors?: Array<StoreError>;
  loading: boolean
}

export type NavStoreT = {
  to: string
}