import axios from 'axios';

const LOGIN = 'LOGIN_USER';
const LOGOUT = 'LOGOUT_USER';

//ACTIONS

//Login action: sets the current user to the user that's logged in. 
const login = currentUser  => ({ type: LOGIN, currentUser });

//Logout actions: sets the current user to an empty object. (There is not current user if no one is logged in.)
const logout = () => ({ type: LOGOUT, currentUser: {} });

//REDUCER: This is exported to combine reducers, which takes the state and reducers
//as defined on many reducers and combines them into the store. 

//This reducer takes the actions above to create the new current user state. 
//The actions are login/logout as defined above.  
//The default current user is an empty object because by default, no one is logged in. 
export default function reducer (currentUser = {}, action) {
  switch (action.type) {  
//If Login is dispatched to this reducer set the current user to the current user. 
    case LOGIN:
      return action.currentUser;

//If logout is dispatched, set current user to an empty object. 
//There's no current user if the person is logged out. 
    case LOGOUT: 
      return action.currentUser;

    default:
      return currentUser;
  }
}

//The reducer above is activated by the views (our components/containers). 
//Of course, these functions are importanted into these components. 

//For example, in the Navbar component, when we click logout, it calls a function 
//(in mapDispatch) that dispatches logoutUser below. logoutUser makes a request
//to the route defined in our app.js, which destroys the user session. 
//then it dispatches to logout above, which changes the state. 

//Login user is activated by the login component. When you click the submit
//button, it calls a functions that again dispatches to the function below. 
//Which makes a request to the /login route, which authenticates the user
//and logs them in. Then it dispatches to the reducer above which changes
//the state to have a logged in user. 

export const loginUser = user => dispatch => {
console.log(user); 
  axios.post('/login', user)
       .then(res => dispatch(login(res.data)))
       .catch(err => console.error(`Creating user: ${user} unsuccesful`, err));
};

export const logoutUser = () => dispatch => {
  axios.get('/logout')
       .then(res => dispatch(logout()))
       .catch(err => console.error(`Logging out unsuccesful`, err));
};