/**
 * @flow
 * @relayHash 724f37d7e38ec298d1ccb9ddeeeaede1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppContainerQueryVariables = {||};
export type AppContainerQueryResponse = {|
  +viewer: ?{|
    +id: ?string,
    +email: ?string,
    +firstName: ?string,
    +lastName: ?string,
  |}
|};
export type AppContainerQuery = {|
  variables: AppContainerQueryVariables,
  response: AppContainerQueryResponse,
|};
*/


/*
query AppContainerQuery {
  viewer {
    id
    email
    firstName
    lastName
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "viewer",
    "storageKey": null,
    "args": null,
    "concreteType": "User",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "email",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "firstName",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "lastName",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppContainerQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AppContainerQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AppContainerQuery",
    "id": null,
    "text": "query AppContainerQuery {\n  viewer {\n    id\n    email\n    firstName\n    lastName\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '90726626a328f45dd763cea105472cfc';
module.exports = node;
