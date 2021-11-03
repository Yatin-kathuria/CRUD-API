class UserDtos {
  name;
  email;
  _id;
  role;
  phone;
  city;
  country;
  constructor({ name, email, _id, role, phone, city, country }) {
    this.name = name;
    this.email = email;
    this._id = _id;
    this.role = role;
    this.phone = phone;
    this.city = city;
    this.country = country;
  }
}

module.exports = UserDtos;
