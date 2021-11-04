class UserDtos {
  name;
  email;
  _id;
  role;
  phone;
  city;
  country;
  verified;
  urlTwitter;
  urlGitHub;

  constructor(user) {
    this.name = user?.name;
    this.email = user?.email;
    this._id = user?._id;
    this.role = user?.role;
    this.phone = user?.phone;
    this.city = user?.city;
    this.country = user?.country;
    this.verified = user?.verified;
    this.urlTwitter = user?.urlTwitter;
    this.urlGitHub = user?.urlGitHub;
  }
}

module.exports = UserDtos;
