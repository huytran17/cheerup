## Credits

In this code base, the genuis of the application has been contributed by the following engineers:

- huytran17
- tungnt1405

> Real Artist sign their work

## Website

https://localhost:8082/

## Technology stack

Database => mongoose

File storage => AWS S3

Cache management => Redis

JWT issuer => jsonwebtoken npm

Authentication => passport.js

API validator => validatorjs

Backend server = nodejs, expressjs

Backend logs = winston

Dashboard => Nuxtjs

UX/UI => Vuetify

---

## Clean Architecture

![Clean Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
Read more at [Clean Coder Blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.htmllink)

#### Benefits of Clean Architecture:

- Independent of Frameworks
- Testability
- Independent of UI
- Independent of Database
- Independent of External

#### Dependencies Rules:

- Dependencies can only point inwards. That means inner layer should not know/calls outer layer

#### Layer description:

- Entities: Contain enterprise business model/object
- Use Cases: Contain application business rules/ logic
- Interface Adapter: Contains a set of adapters that convert data from entities/use-case layer to external dependencies such as DB or Web/HTTP
- Frameworks/ Driver: Compose of frameworks and tools (DB, Web Frameworks)

#### Cross boundaries between layers:

- Communication between layers should be resolve via [Dependency Inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principlelink)

---

## Yarn dependency upgrade

---

## Style guide

### Dependency injection

1. Create interface/type for an injectable class/function

```javascript
// <folder>/injectable.ts
export type IInjectable = (params: any) => Promise<string>;
```

2. Create a factory function and export it

```javascript
export default function makeInjectable({
  //Factory function
  dependencies1,
  dependencies2,
}: {
  dependencies1: IDependencies1, // Inject dependencies
  dependencies2: IDependencies2,
}): IInjectable {
  // injectable must implement IInjectable
  return function injectable({
    params1,
  }: {
    params1: Params1Type, // Pass in parameters
  }): string {};
}
```

3. Initialize the function by calling the factory in index.ts file

```javascript
// <folder>/index.ts
import makeInjectable, { IInjectable } from "./injectable.ts"; // Import type and factory

const injectable = makeInjectable({ dependencies1 }); // Pass in instances of dependencies

export default Object.freeze({
  injectable,
});

export { injectable };
```

### How to make a controller:

#### Must follow the rules of Clean Architecture and Dependencies Injection

#### Controller sit in Controllers layer of Clean

#### Reference other controllers if possible, then rename the make<name>Controller and <name>Controller

**Bad:**

```javascript
export default function makeSomeController() {
  return async function getSomeController() {};
}
```

**Good**

```javascript
// Controller
export default function makeGetSomeController() {
  return async function getSomeController() {
    // make function and internal function must be the same name
  };
}
```

#### Dependencies must be injected in via dependency injections

**Bad:**

```javascript
import getExample from "../../../use-cases/get-example";

export default function makeGetExampleController() {
  return async function getExampleController() {
    await getExample(); // Directly call use-case
  };
}
```

**Good**

```javascript
// Controller
import { IGetExample } from "../../../use-cases/get-example"; // Import interface

export default function makeGetBlogController({
  getExample,
}: {
  getExample: IGetExample, // Inject dependencies
}) {
  return async function getBlogController() {
    await getExample(); // Directly call use-case
  };
}
```

#### Controller functions should take only httpRequest parameter

**\*Bad**

```javascript
export default function makeGetExampleController() {
  return async function getExampleController(
    httpRequest: {
      context: {
        validated: null,
      },
    },
    someDeps: any
  ) {
    someDeps();
  };
}
```

**\*Good**

```javascript
export default function makeGetExampleController({
  someDep,
}: {
  someDep: ISomeDep, // Pass in dependency
}) {
  return async function getExampleController(httpRequest: {
    context: {
      validated: null,
    },
  }) {};
}
```

#### All controllers should have try-catch-finally block

**Bad:**

```javascript
function controllerFunction(httpRequest) {
  const param = httpRequest.context.validated.param;
  return {
    statusCode: 200,
  };
}
```

**Good:**

```javascript
function controllerFunction(httpRequest) {
  try {
    const param = httpRequest.context.validated.param;
    return {
      statusCode: 200,
    };
  } catch (err) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: err.status.code,
      body: {
        error: err.message,
      },
    };
  }
}
```

#### For request validations, create a file in validations folder. Reference `src/controllers/user/blog/validators/get-blog.ts`

- `controller/<module>/get-example.ts`
- `controller/<module>/get-example-rules.ts` => validation file

## How to make use-case

### Use-cases sit in "Use Cases" layer of Clean Architecture. So use-cases should only know about entity layer.

### Following the rules of dependencies injection

## How to make an entity

### These are steps to create a new entity

Entity should not know about / call outer layer function / class

- Create an interface for the entity. Ex: `src/database/entities/interfaces/user.ts`
- Create the class that implement this interface, this is the data object class. Ex: `src/database/entities/user.ts`
- Create mongoose schema model for the entity. Ex: `src/data-access/schemas/user.ts`
- Register the mongoose schema model in `src/data-access/models/index.ts`. Should follow registered models
- Create data-access interface. Ex: `src/data-access/interfaces/user-db.ts`
- Create data-access function & factory `src/data-access/make-user-db.ts`
- Instantiate data-acess function in `index.ts` file and inject dependencies (if-have). Ex: `src/data-access/index.ts`

## Naming convention

### Variables shall all be kebab_case

**Bad:**

```javascript
const hashedPassword = await hashPassword("plain_password_string");
```

**Good:**

```javascript
const hashed_password = await hashPassword("plain_password_string");
```

### Functions shall be camelCased

**Bad:**

```javascript
const hashed_password = await hash_password("plain_password_string");
```

**Good:**

```javascript
const hashed_password = await hashPassword("plain_password_string");
```

### All variables should be in kebab casing

**Bad**

```javascript
const hasPendingRecommendation = recommendation_exists && is_pending;
```

**Good**

```javascript
const has_pending_recommendation = recommendation_exists && is_pending;
```

### All functions should be in camel casing and start with small letter

**Bad**

```javascript
await Apply_referralCode_in_background({ referral_code });
```

**Good**

```javascript
await applyReferralCodeInBackground({ referral_code });
```

---

## How to run server

Refer to /server folder > README.md for more instructions

1. cd server folder
2. Get the `.env` file and `database.env` file
3. type `yarn install` on server home directory if you have not done it before.
4. type `yarn dev`
5. Server will run on `http://localhost:3000`
6. If you wish to stop the docker containers, `docker-compose down`

## How to run user-dashboard

1. cd user-dashboard folder
2. type `yarn install` if you have not done it before.
3. type `yarn dev`
4. access it at `http://localhost:8082`

## How to run admin-dashboard

1. cd admin-dashboard folder
2. type `yarn install` if you have not done it before.
3. type `yarn dev`
4. access it at `http://localhost:8080`

## Getting the server pod id

k -n staging get pod -o jsonpath='{.items[0].metadata.name}' | pbcopy

## How to cap a mongodb collection

1. access the DB via shell
2. check db.<collection.name>.isCapped();
3. db.runCommand({"convertToCapped": "logs", size: 80000000})
4. run db.<collection.name>.isCapped();

Reference: https://www.geeksforgeeks.org/capped-collections-in-mongodb/

## Clean architecture

### References

- https://www.freecodecamp.org/news/video-clean-architecture-in-node-js/
- [Rules for clean code](https://blog.logrocket.com/the-perfect-architecture-flow-for-your-next-node-js-project/)
- [Node clean code architecture](https://roystack.home.blog/2019/10/22/node-clean-architecture-deep-dive/)
- [Application layer - use-cases](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/)
- [Domain-driven Design articles](https://khalilstemmler.com/articles/categories/domain-driven-design/)
- [Screaming architecture](http://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
- [What is screaming architecture](https://levelup.gitconnected.com/what-is-screaming-architecture-f7c327af9bb2)
- [Clean architecture use-case structure](https://proandroiddev.com/why-you-need-use-cases-interactors-142e8a6fe576)
- [Denormalize data](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3)

## Payment references

- [Best practices to integrate stripe](https://medium.com/swlh/best-practices-for-integrating-stripe-billing-with-your-saas-559747ae7062)
- [Stripe payment workflow](https://codenebula.io/node.js/stripe/sca/2020/03/03/how-to-use-stripes-new-payment-intents-api-with-node-js-to-create-subscriptions-with-built-in-sca/)
- [How to integrate with stripe](https://codenebula.io/stripe/node.js/2019/04/11/creating-monthly-recurring-subscriptions-in-stripe-using-node-js-part-2/)

## Customer engagement read

- [7 Signs of customers about to cancel subscription](https://www.gravysolutions.io/post/7-not-so-obvious-signs-your-customer-is-about-to-cancel-their-subscription-and-how-to-prevent-it)

## Database transaction references

- [\*transaction in clean architecture](https://stackoverflow.com/questions/50871171/how-do-you-use-transactions-in-the-clean-architecture)
- [Transaction in mongoose](https://mongoosejs.com/docs/transactions.html)
- [Concept of unit-of-work](https://dejanvasic.wordpress.com/2020/01/03/unit-of-work-with-node-mssql-and-typescript/)
- [bob's reply to unit-of-work](https://github.com/dev-mastery/comments-api/issues/38)
- [Transaction with mongoose](https://stackoverflow.com/questions/51228059/mongo-db-4-0-transactions-with-mongoose-nodejs-express)

## Database queries

- [How to query in mongoose with Or operator](https://docs.mongodb.com/manual/tutorial/query-arrays/)
- [stackover flow on querying string array](https://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value)
- [Example on how to use $or operator](https://kb.objectrocket.com/mongo-db/or-in-mongoose-1018)

## Date queries

- [date-fns](https://date-fns.org/)
- [date-fns vs moment](https://medium.com/@k2u4yt/momentjs-vs-date-fns-6bddc7bfa21e#:~:text=One%20of%20the%20biggest%20difference,momentjs%20change%20its%20own%20state.)
- [Stackover on how to query mongoose at a specific date](https://stackoverflow.com/questions/11973304/mongodb-mongoose-querying-at-a-specific-date)

## Mongoose on docker compose

- [start_period only works from 3.4 onwards](https://github.com/docker/compose/issues/5177)
- [docker compose setup for mongoose](https://gist.github.com/asoorm/7822cc742831639c93affd734e97ce4f)
- [Automate enabling replica set for mongodb](https://zgadzaj.com/development/docker/docker-compose/turning-standalone-mongodb-server-into-a-replica-set-with-docker-compose)

## Mongoose on pagination

- [Pagination stackOverflow](https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js)

### Github repo references

- https://github.com/dev-mastery/comments-api
- https://github.com/jbuget/nodejs-clean-architecture-app

### Typescript readings

- [Classes](https://www.typescriptlang.org/docs/handbook/classes.html)
- [Readonly property type](https://basarat.gitbook.io/typescript/type-system/readonly)
- [Enum type](https://www.typescriptlang.org/docs/handbook/enums.html)
- [Interface that uses Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)

### Email templates

- [Email templates](https://github.com/wildbit/postmark-templates)
- [Same email templates](https://postmarkapp.com/transactional-email-templates)

### Authentication readings

- [Password hashing with nodejs](https://www.loginradius.com/engineering/blog/password-hashing-with-nodejs/)
- [Using of bcrypt stackoverflow](https://stackoverflow.com/questions/48799894/trying-to-hash-a-password-using-bcrypt-inside-an-async-function)
- [Question about auth workflow in clean architecture](https://groups.google.com/forum/#!topic/clean-code-discussion/wHzmboOEHzo)
- [Passport multiple JWT Strategies](https://stackoverflow.com/questions/39795898/multiple-passport-jwt-strategy-in-the-same-app)
- [Passport quicktips](https://www.raymondcamden.com/2016/06/23/some-quick-tips-for-passport)
- [Passport how to set params into req](https://stackoverflow.com/questions/55163015/how-to-bind-or-pass-req-parameter-to-passport-js-jwt-strategy)
- [Passport authentication article](https://dev.to/_arpy/learn-using-jwt-with-passport-authentication-22n8)
- [Passport authentication articles](https://dev.to/nileshsanyal/a-complete-guide-to-passport-js-part-1-443#:~:text=This%20is%20possible%20with%20the,the%20callback%20url%20as%20%22req)

### Security readings

- [nodejs-security](https://medium.com/@rsachenko/nodejs-security-development-3d78f7e3a72b)
- [Passport library](http://www.passportjs.org/packages/)
- [JSON Web Token library](https://www.npmjs.com/package/jsonwebtoken)
- [Passport-jwt library](http://www.passportjs.org/packages/passport-jwt/)
- [token-based authentication](https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/)
- [refresh and access token](https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/)
- [enable CORS for express](https://expressjs.com/en/resources/middleware/cors.html)

#### Process to issue refresh and access token

1. login with username and password
2. Find db for this user, and hash the password to check if the password matches.
3. If match, sign the user object with accessTokenSecret, with expiry of 20m for example, and refreshToken
4. Return this accessToken and refreshToken back to user

#### Notes about session and JWT

Session will then store all the sessionId in memory or database. But if you are using JWT, all your information of the user is all contained in the JWT.

You want to validate your JWT so you know the data passed in that JWT is valid for consumption.

### Database readings

- [Mongoose Database](https://mongoosejs.com/docs/guide.html)
- [Mongoose database plugin](https://www.freecodecamp.org/news/how-to-log-a-node-js-api-in-an-express-js-app-with-mongoose-plugins-efe32717b59/)
- [Mongoose to check for connected status](https://github.com/Automattic/mongoose/issues/2280)
- [How to run mongodb on docker-compose](https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3)

### Express documentation

- [Expression documentation on API](https://expressjs.com/en/api.html)
- [Bodyparser](https://github.com/expressjs/body-parser)

### Phone number regex

- [Phone number regex](https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript)

### References for mobile UI/UX

- [masterclass](https://www.masterclass.com/)
- [kalpha](https://www.kalpha.io/winners/)
- [tigerhall](https://tigerhall.com/) => consider this UI/UX
- [unibly](https://demo.unibly.com/)
- [ceresa](https://www.ceresa.com/)

### Lint

- [blog](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)

### CICD

- [Youtube tutorial](https://www.youtube.com/watch?v=Jav4vbUrqII)

### Logging

- [Winston-express for HTTP logging](https://github.com/bithavoc/express-winston)
- [Winston for error logging](https://www.npmjs.com/package/winston#combining-formats)

### Express related

- [Regex route express](https://www.kevinleary.net/regex-route-express/)

---

## Requisite for node version

- min v14.16
