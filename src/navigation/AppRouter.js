import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import TodoViewer from '../todos/TodoViewer'
// import SignUp from '../auth/SignUp'
// import SignIn from '../auth/SignIn'
import SplashScreen from '../splashScreen/SplashScreen'
import SignUp from '../auth/SignUp'
import SignIn from '../auth/SignIn'
import TodoViewer from '../todos/TodoViewer'

export const ROUTES_CONSTANTS = {
    "splash": "/",
    "SIGN_UP": "/signUp",
    "SIGN_IN": "/signIn",
    "TODOS": "/todos"
}

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path={ROUTES_CONSTANTS.SIGN_UP}><SignUp /></Route>
                <Route path={ROUTES_CONSTANTS.SIGN_IN}><SignIn /></Route>
                <Route path={ROUTES_CONSTANTS.TODOS}><TodoViewer /></Route>
                <Route path={ROUTES_CONSTANTS.splash}><SplashScreen /></Route>
            </Switch>
        </Router>
    )
}

export default AppRouter
