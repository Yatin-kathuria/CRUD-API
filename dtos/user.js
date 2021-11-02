class UserDtos {
  name;
  email;
  _id;
  role;
  constructor({ name, email, _id, role }) {
    this.name = name;
    this.email = email;
    this._id = _id;
    this.role = role;
  }
}

module.exports = UserDtos;
