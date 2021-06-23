const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("user")
    .createOwn("posts")
    .deleteOwn("posts")
    .readOwn("posts")
    .grant("admin")
    .extend("user")
    .createAny("posts-a")
    .readAny("posts-a")
    .updateAny("posts-a")
    .deleteAny("posts-a")    
    .grant("superadmin")
    .extend("admin")
    .createAny("posts-sa")
    .readAny("posts-sa")
    .updateAny("posts-sa")
    .deleteAny("posts-sa");
  return ac;
})();
