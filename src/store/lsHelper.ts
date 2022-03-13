type LsHelperT = {
  get: (key: string) => any;
  save: (key: string, value: any) => void;
  remove: (key: string) => void;
}

const keyFormatter = (key: string): string => `@dglnd:${key}`

const lsHelper: LsHelperT = {
  get: (key) => {
    const result = localStorage.getItem(keyFormatter(key))
    if(!result) return undefined
    return JSON.parse(result)
  },
  save: (key, value) => {
    localStorage.setItem(keyFormatter(key), JSON.stringify(value))
  },
  remove: (key) => {
    localStorage.removeItem(keyFormatter(key))
  }
}

export default lsHelper