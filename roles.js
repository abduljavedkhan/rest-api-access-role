const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("user")
    .createOwn("posts")
    .deleteOwn("posts")
    .readOwn("posts")
    .grant("admin")
    .extend("user")
    .createAny("posts")
    .readAny("posts")
    .updateAny("posts")
    .deleteAny("posts")    
    .grant("superadmin")
    .extend("admin")
    .createAny("posts")
    .readAny("posts")
    .updateAny("posts")
    .deleteAny("posts");
  return ac;
})();
