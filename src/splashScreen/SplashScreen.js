import React from 'react'
import { useQuery } from 'relay-hooks'
import graphql from 'babel-plugin-relay/macro';
import { useHistory } from "react-router-dom";
import { ROUTES_CONSTANTS } from '../navigation/AppRouter';

const SplashScreen = () => {
    let history = useHistory();

    const SplashScreenQuery = graphql`
    query SplashScreenQuery {
        viewer {
            id
            email
            firstName
            lastName
        }
    }`


    const { props, error, retry, cached } = useQuery({
        query: SplashScreenQuery,
        // cacheConfig: {
        //     force: true
        // }
    });

    if (props && props.viewer) {
        if (props.viewer.email) {
            history.push(ROUTES_CONSTANTS.TODOS)
        } else {
            history.push(ROUTES_CONSTANTS.SIGN_UP)
        }
    }


    return (
        <div>
            Loading...
        </div>
    )
}

export default SplashScreen
