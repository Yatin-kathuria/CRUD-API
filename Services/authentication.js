class AuthenticationService {
  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}

module.exports = new AuthenticationService();
