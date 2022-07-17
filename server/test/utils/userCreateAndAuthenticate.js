module.exports = createAndAuthenticateUser = async function () {
  const data = {
    name: "Vitor Santos",
    email: "notvitor@mail.com",
    password: "abc12345",
  };
  const user = await usersService.createUser(data);
  response = await axios({
    url: `${process.env.API_BASE_URL}:${process.env.API_BASE_PORT}/login`,
    method: "post",
    data,
    validateStatus: false,
  });
  user.token = response.data.token;
  return user;
};
