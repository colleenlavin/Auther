import axios from 'axios';

const LOGIN = 'LOGIN_USER';

const login = currentUser  => ({ type: LOGIN, currentUser });


export default function reducer (currentUser = {}, action) {
  switch (action.type) {

    case LOGIN:
      return action.currentUser;

    default:
      return currentUser;
  }
}


export const loginUser = user => dispatch => {
console.log(user); 
  axios.post('/login', user)
       .then(res => dispatch(login(res.data)))
       .catch(err => console.error(`Creating user: ${user} unsuccesful`, err));
};