import React from 'react'
import { useQuery } from 'relay-hooks'
import graphql from 'babel-plugin-relay/macro';

const AppContainer = () => {
    const AppContainerQuery = graphql`
    query AppContainerQuery {
        viewer {
            id
            email
            firstName
            lastName
        }
    }`


    const { props, error, retry, cached } = useQuery({
        query: AppContainerQuery,
        // cacheConfig: {
        //     force: true
        // }
    });

    console.log({ props })
    if (props && props.viewer) {
        if (props.viewer.email) {
            // screenProps.navigation.navigate(ROUTES_CONSTANTS.TODOS)
        } else {
            // screenProps.navigation.navigate(ROUTES_CONSTANTS.SIGN_UP)
        }
    }


    return (
        <div>
            Loading...
        </div>
    )
}

export default AppContainer
