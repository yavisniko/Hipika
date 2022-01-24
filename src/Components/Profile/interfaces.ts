export interface ProfileProps {
  name: string
  surname: string
  image: string
  email: string
  followers: string[]
  following: string[]
  verified: boolean
  early_access: boolean,
  tester: boolean,
  developer: boolean
}

export const defaultState: ProfileProps = {
  name: "",
  surname: "",
  image: "",
  email: "",
  followers: [],
  following: [],
  verified: false,
  early_access: false,
  tester: false,
  developer: false
}

export interface containerProps {
  from: string
  whatIs: "followers" | "followings"
  whatToShow: string[]
  close?: () => void
}

export const defaultTemplate: containerProps = {
  from: "",
  whatIs: "followers",
  whatToShow: [],
}

export const boolDefault = {
  load: false,
  followLoad: false,
  iFollow: false,
  showContainer: false,
}
