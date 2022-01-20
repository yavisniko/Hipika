const rand = () => {
  const string_length = 24
  return [...Array(string_length)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
};

export const token = (): string => {
  return rand();
};