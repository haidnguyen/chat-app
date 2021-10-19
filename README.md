# How to run

## System requirement
- Node.js (v16)

## Install rependencies
In the project directory, run the following command
```bash
npm install
```

## Start the application in development mode
In the project directory, run the following command
```bash
npm run start
```

# About the project
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10 with some customization.

- Jest + @testing-library/angular for unit test
- Tailwindcss for styling
- Lint with ESLint + Prettier

```
.
├── app
│   ├── app-routing.module.ts
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── core
│   │   ├── app-token.ts
│   │   ├── core.module.ts
│   │   └── index.ts
│   ├── features
│   │   └── chatbox
│   │       ├── channel-switcher
│   │       │   ├── channel-switcher.component.spec.ts
│   │       │   └── channel-switcher.component.ts
│   │       ├── chatbox-routing.module.ts
│   │       ├── chatbox.component.ts
│   │       ├── chatbox.module.ts
│   │       ├── chatbox.store.ts
│   │       ├── index.ts
│   │       ├── message-form
│   │       │   ├── message-form.component.spec.ts
│   │       │   └── message-form.component.ts
│   │       ├── message-item
│   │       │   ├── message-item.component.scss
│   │       │   ├── message-item.component.spec.ts
│   │       │   └── message-item.component.ts
│   │       ├── messages
│   │       │   ├── messages.component.spec.ts
│   │       │   └── messages.component.ts
│   │       └── user-switcher
│   │           ├── user-switcher.component.spec.ts
│   │           └── user-switcher.component.ts
│   ├── layouts
│   │   └── main-layout
│   │       ├── index.ts
│   │       ├── main-layout.component.spec.ts
│   │       ├── main-layout.component.ts
│   │       └── main-layout.module.ts
│   ├── models
│   │   ├── channel.ts
│   │   ├── graph-response.ts
│   │   └── message.ts
│   ├── services
│   │   ├── message.service.spec.ts
│   │   └── message.service.ts
│   ├── shared
│   │   └── button
│   │       ├── button.component.ts
│   │       ├── button.module.ts
│   │       └── index.ts
│   ├── store
│   │   ├── index.ts
│   │   ├── message
│   │   │   ├── index.ts
│   │   │   ├── message.action.ts
│   │   │   ├── message.effect.spec.ts
│   │   │   ├── message.effect.ts
│   │   │   ├── message.module.ts
│   │   │   ├── message.reducer.ts
│   │   │   ├── message.selector.ts
│   │   │   └── message.store.spec.ts
│   │   ├── reducer.ts
│   │   └── store.module.ts
│   └── utils
│       ├── array.spec.ts
│       ├── array.ts
│       ├── gql.spec.ts
│       └── gql.ts
├── assets
│   └── icons
│       ├── arrow-down.svg
│       ├── arrow-up.svg
│       ├── check-circle.svg
│       ├── paper-airplane.svg
│       ├── refresh.svg
│       └── x-circle.svg
├── environments
│   ├── environment.prod.ts
│   └── environment.ts
├── favicon.ico
├── index.html
├── main.ts
├── polyfills.ts
├── setup-jest.ts
└── styles.scss
```

## Application structure

### Core
An Angular module for setting common behavivor and setting. In this code base it use to provide some constant like API url, title, ...

### Features
This application follow feature base structure which mean, the code base will be organized into feature, each feature will be an Angular module and will be lazy loaded by the `app-routing.module.ts`. For now, there only one feature which is `chatbox`.

### Shared
`Component`, `Directive`, `Pipe` that can be reused by multiple features will stay here, each one will be a module (SCAM), `Feature Module` will import modules in this folder. Since Angular 11, Ivy Compiler have improve tree shaking and bring a lot of benefit when using single component per angular module. If component that have some business logic, or not general enough to share across application it should be placed in a feature module.

### Store
This application use Ngrx for state management, everything relating to global state will stay here, about local state `@ngrx/component-store` is applied.

## Notes:

### About GraphQL:
This app don't use any GraphQL client but create a simple function to parse query and send with Angular HttpClient.
However it name `gql` so if using Visual studio code, install graphql plugin will give code highlight as normal.
