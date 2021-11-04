class Validator {
  validateEmail(email) {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
  }

  validateUrl(url) {
    const pattern = new RegExp(
      "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
    );
    return pattern.test(url);
  }
}

module.exports = new Validator();
