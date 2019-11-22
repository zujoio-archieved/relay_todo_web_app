import { requestSubscription } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

const subscription = graphql`
subscription TodoEditedSubscription($viewerId:String) {
    todoEdited(viewerId:$viewerId) {
        todoEdge {
            cursor
            node {
                id
                title
                completed
            }
        }
    }
}`


const subscribe = (environment, viewerId) => {
    requestSubscription(
        environment,
        {
            subscription,
            variables:
            {
                viewerId
            },
            updater: store => {
                const rootField = store.getRootField("todoEdited")
                const todoEdge = rootField.getLinkedRecord("todoEdge")
                const node = todoEdge.getLinkedRecord("node")
                const id = node.getValue("id")

                const nodeToEdit = store.get(id)

                nodeToEdit.setLinkedRecord(node)
            }
        })
}

export default { subscribe }
