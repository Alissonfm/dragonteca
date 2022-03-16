import { DragonT } from 'models'

import API from './api'

const DragonService = {
  getAll: () => API.get({ path: 'dragon' }),
  getById: (id: string) => API.get({ path: `dragon/${id}` }),
  create: (data: DragonT) => API.post({ path: 'dragon', data }),
  update: (data: DragonT) => API.put({ path: `dragon/${data.id}`, data }),
  delete: (id: string) => API.delete({ path: `dragon/${id}` }),
}

export default DragonService