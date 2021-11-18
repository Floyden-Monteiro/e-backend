const cookieToken = (user, res) => {
  const token = user.getJwtToken();

  const option = {
    expires: new Date(Date.now() + process.env.COOKIE_TIME * 24 * 60 * 100),
    httpOnly: true,
  };

  user.password = undefined;
  res.status(200).cookie("token", token, option).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
