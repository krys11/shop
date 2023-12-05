const { expressjwt } = require("express-jwt");

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  } else {
    done(true, true);
  }

  done();
}

function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
    // isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      {
        url: /\/api\/v1\/products(.*)/,
        methods: ["GET", "OPTIONS", "POST", "PUT"],
      },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/orders(.*)/, methods: ["GET", "OPTIONS", "POST"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

module.exports = authJwt;
