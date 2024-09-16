// import { defineBackend } from '@aws-amplify/backend';
// import { auth } from './auth/resource';
// import { data } from './data/resource';

// /**
//  * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
//  */
// defineBackend({
//   auth,
//   data,
// });

import { defineBackend } from "@aws-amplify/backend";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";
import { data, generateHaikuFunction, MODEL_ID } from "./data/resource";

export const backend = defineBackend({
  auth,
  data,
  generateHaikuFunction,
});

backend.generateHaikuFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:InvokeModel"],
    resources: [`arn:aws:bedrock:*::foundation-model/${MODEL_ID}`],
  })
);
