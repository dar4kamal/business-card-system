export const emailRegex = new RegExp(
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
);

export const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){8,}$/,
);
