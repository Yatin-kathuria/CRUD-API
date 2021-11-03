class UserDtos {
  name;
  email;
  _id;
  role;
  phone;
  city;
  country;
  verified;

  constructor({ name, email, _id, role, phone, city, country, verified }) {
    this.name = name;
    this.email = email;
    this._id = _id;
    this.role = role;
    this.phone = phone;
    this.city = city;
    this.country = country;
    this.verified = verified;
  }
}

module.exports = UserDtos;
