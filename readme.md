## Building the App (automated)

This project contains an Amplify project (`/amplify`) already configured & ready to be deployed. Deploying this project will create the following resources in your account: an authentication configuration using Amazon Cognito, an AWS AppSync GraphQL API, & a DynamoDB table.

![Landing](./screenshots/SharePlz-proto-landing.png?raw=true "Landing")

1. Make sure you are on the newest version of the AWS Amplify CLI

```sh
npm install -g @aws-amplify/cli
```

> You must also have the CLI configured with a user from your AWS account (`amplify configure`). For a walkthrough of how to do this, check out [this](https://www.youtube.com/watch?v=fWbM5DLh25U) video.

2. Clone Chatt

```sh
git clone https://github.com/aws-samples/aws-appsync-chat.git
```

3. Install dependencies

```sh
npm install
```

4. Initialize the amplify project

```sh
amplify init
```
- Enter a name for the environment __master__

5. Push the new resources to the cloud

```sh
amplify push
```

6. Run the project

```sh
npm start
```

7. Deleting the project resources

If you'd like to tear down the project & delete all of the resources created by this project, run the `delete` command.

```sh
amplify delete
```


## Building the App (manually)

You can also manually set up your resources if you would like. If you would like to manually create & configure the resources for this project, follow these steps:

1. Install & configure the Amplify CLI

```sh
npm install -g @aws-amplify

amplify configure
```

2. Clone Chatt

```sh
git clone https://github.com/aws-samples/aws-appsync-chat.git
```

3. Install dependencies

```sh
npm install
```

4. Delete the amplify folder

5. Initialize a new Amplify project

```sh
amplify init
```

6. Add authentication

```sh
amplify add auth
```

> Here, either choose the default security choice or configure your own.

7. Add the api

```sh
amplify add api
```

> Choose Cognito User Pools as the authentication type.
> When prompted for the GraphQL schema, use the following schema:

```graphql
type Todo @model {
	id: ID!
	name: String!
  zip: String
  phoneNumber: String
	description: String
}
```

8. Run the `push` command to create the resources in your account:

```sh
amplify push
```

9. Run the project

```sh
npm start
```

10. Deleting the project resources

If you'd like to tear down the project & delete all of the resources created by this project, run the `delete` command.

```sh
amplify delete
```

## Hosting with the AWS Amplify Console

The [AWS Amplify Console](https://console.amplify.aws) provides continuous deployment and hosting for modern web apps (single page apps and static site generators) with serverless backends. Continuous deployment allows developers to deploy updates to either the frontend or backend (Lambda functions, GraphQL resolvers) on every code commit to the Git repository.

1. Push your code to a Git repository of your choice.
1. Login to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home) and choose **Connect app**
1. Connect your repository and branch.
1. Accept the default build settings.
1. Give the Amplify Console permission to deploy backend resources with your frontend. This will allow the Console to detect changes to your backend on every code commit. If you do not have a service role, follow the prompts to create one.
1. Review your changes and then choose **Save and deploy**. You app will now be available at `https://master.unique-id.amplifyapp.com`.

## About

### Schema

This application utilizes 1 database table:

- Todo (Which stores the items, ZIP, Phone Number and Items)

## License

This library is licensed under the Apache 2.0 License. 
For full documentation on AWS Amplify, see here: https://github.com/aws-amplify/amplify-js/blob/master/README.md



