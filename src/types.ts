export interface IAccount {
  id: number,
  email: string,
  pass: string,
  role: string,
  name: string
}

export interface ICourse {
  id: number,
  name: string,
  description: string,
  active: boolean,
  fk_suggestedBy: number
}
