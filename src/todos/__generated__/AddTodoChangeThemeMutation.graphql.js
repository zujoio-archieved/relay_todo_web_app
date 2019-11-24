/**
 * @flow
 * @relayHash d88cb646d56873aa46fc3f7cb99a65bb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type changeThemeInput = {|
  index?: ?number,
  clientMutationId?: ?string,
|};
export type AddTodoChangeThemeMutationVariables = {|
  input: changeThemeInput
|};
export type AddTodoChangeThemeMutationResponse = {|
  +changeTheme: ?{|
    +theme: ?{|
      +index: ?number,
      +name: ?string,
      +primary: ?string,
      +dark: ?string,
      +light: ?string,
    |}
  |}
|};
export type AddTodoChangeThemeMutation = {|
  variables: AddTodoChangeThemeMutationVariables,
  response: AddTodoChangeThemeMutationResponse,
|};
*/


/*
mutation AddTodoChangeThemeMutation(
  $input: changeThemeInput!
) {
  changeTheme(input: $input) {
    theme {
      index
      name
      primary
      dark
      light
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "changeThemeInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "changeTheme",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "changeThemePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "theme",
        "storageKey": null,
        "args": null,
        "concreteType": "userTheme",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "index",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "primary",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "dark",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "light",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AddTodoChangeThemeMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AddTodoChangeThemeMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "AddTodoChangeThemeMutation",
    "id": null,
    "text": "mutation AddTodoChangeThemeMutation(\n  $input: changeThemeInput!\n) {\n  changeTheme(input: $input) {\n    theme {\n      index\n      name\n      primary\n      dark\n      light\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '81f216501881d05ee8c0eafa62ee6281';
module.exports = node;
