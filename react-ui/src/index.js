import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TasksPannel from './tasksPannel/TasksPannel';
import Login from './login/Login';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

const Root = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={TasksPannel} />
				<Route path='/login' component={Login} />
			</Switch>
		</BrowserRouter>
	)
}


ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
