import userDataService from './data/userDataService';

class AuthService {

  static isAuthenticated() {
    const token = this.getToken();
    return userDataService.checkAuth(token);
  }

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static logOut() {
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }

}

export default AuthService;