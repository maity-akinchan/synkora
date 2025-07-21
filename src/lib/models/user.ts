interface User {
  uid?: string;
  name: string;
  username: string;
  email: string;
  registerDate: Date;
  authInfo: {
    authType: 'local' | 'oauth';
    pwdHash?: string;
    oauthData?: string[];
  }
}

function createUser(body: User) {

}

function getUserByEmail(email : String) {

}

function getUserById(uid : String) {

}

function getUserByUname(uname : String) {

}

function unameExists(uname : String) : Boolean{
  // Function to check if username exists in database.
  return true;
}


export default User;
export {createUser, getUserByEmail, getUserById, getUserByUname, unameExists}