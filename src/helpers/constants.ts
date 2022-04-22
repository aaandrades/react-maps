const OptionsTypes: Options = {
  1: "draw",
  2: "location",
  3: "directions",
  4: "creation",
};

interface Options {
  [key: number]: string;
}

export { OptionsTypes };
