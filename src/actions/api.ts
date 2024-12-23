const authAPI = {
  base: "http://localhost:4001/auth",
  subRoutes: {
    register: "/register",
    login: "/login",
    logout: "/logout",
    validate: "/validate-token",
    refresh: "/refresh-token",
  },
};

const searchAPI = {
  base: "https://photon.komoot.io/api/",
  subRoutes: {
    search: "/search",
  },
};

export { authAPI, searchAPI };
