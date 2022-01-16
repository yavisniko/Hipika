export type CatalogType = 
| 'user'
|'privacy'

export interface UserProps {
  name: string,
  surname: string
  password: string, 
  email: string,
  path: string
}

export const defaultState: UserProps = {
  name: '',
  surname: '',
  password: '',
  email: '',
  path: ''
}