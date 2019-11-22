import { ConnectionHandler } from 'relay-runtime'
import { requestSubscription } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

const subscription = graphql`
subscription CompletedTodosDeletedSubscription($viewerId:String) {
    completedTodosDeleted(viewerId:$viewerId) {
        message
        deletedIds
    }
}`




const subscribe = (environment, viewerId) => {
    requestSubscription(
        environment,
        {
            subscription,
            variables: { viewerId }
        })
}

export default { subscribe }
