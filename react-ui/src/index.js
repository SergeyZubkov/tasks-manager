import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './extendValidationRules';
import TasksPanel from './tasksPanel/TasksPanel';
import Login from './login/Login';
import AdminPanel from './adminPanel/AdminPanel';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import AuthService from './AuthService';

import {
  createStore, 
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import clientsReducer from './data/clients/reducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  entities: clientsReducer,
  form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(
    thunk
  )
));

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoaded: false,
      isAuthenticated: false
    }
  }

  componentDidMount() {
    AuthService.isAuthenticated()
    .then(response => {
      // в ответе объект юзер
      this.setState({
        isLoaded: true,
        isAuthenticated: true
      });
    })
    .catch(err => {
      console.log(err);
      this.setState({
        isLoaded: true
      });
    });
  }

  render() {
    const {
      component,
      ...rest
    } = this.props;
    const Component = component;
    if (!this.state.isLoaded) {
      return (<div>loading </div>)
    } else {
      return (
        <Route {...rest} render={props => (
          this.state.isAuthenticated ? (
            <Component {...props}/>
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location}
            }}/>
          )
        )}/>
      )
    }  
  }
}



const Root = () => {
	return (
		<Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/' component={TasksPanel} />
          <Route path='/admin' component={AdminPanel} />
          <Route path='/login' component={Login} />
        </Switch>
      </BrowserRouter>  
    </Provider>
	)
}


ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
