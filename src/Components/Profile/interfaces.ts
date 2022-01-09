export interface ProfileProps {
  name: string;
  surname: string;
  image: string;
  email: string;
  followers: string[];
  following: string[];
}

export const defaultState: ProfileProps = {
  name: "",
  surname: "",
  image: "",
  email: "",
  followers: [],
  following: [],
};

export interface containerProps {
  from: string,
  whatIs: "followers" | "followings"
  whatToShow: string[]
  close?: () => void
}

export const defaultTemplate: containerProps = {
  from: "",
  whatIs: 'followers',
  whatToShow: [],
}

export const boolDefault = {
  load: false,
  followLoad: false,
  iFollow: false,
  showContainer: false
}