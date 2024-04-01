<h1>Cube Interview Assignment</h1>

Cube Interview Assignment

- is built in ReactJS with [@carbon/react](https://carbondesignsystem.com/developing/frameworks/react/) UI toolkit. Refer [@carbon/react component storybook](https://react.carbondesignsystem.com/?path=/story/components-tile--default) for more details.
- use Express framework as web server and also for APIs development.

## Requirement

Please make sure your development env has met the following requirements before you start:

| Dependency |   Version   |
| ---------- | :---------: |
| Node       | >= v12.13.0 |
| YARN       | >= v1.22.19 |

## Quick Start

```bash
git clone
yarn
```

### Running app

For **development**:

```bash
yarn dev
```

![image](docs/screenshot.png)

Change environment variables in `.env.development` to change the development port.

For **linting**:

```bash
yarn lint
```

## Environment Variables\*\*

`env` and `dotenv-expand` packages are used in conjunction with `webpack.DefinePlugin` plugin for managing environment variables. The entire logic can be found in `./env.config.js` file. The .env file is named and loaded based on the defined `process.env.NODE_ENV` value:

| File name          | NODE_ENV    | In Source Control |
| ------------------ | ----------- | :---------------: |
| `.env.development` | development |        Yes        |
| `.env`             | production  |        Yes        |

## License

MIT
