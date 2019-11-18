# ESModules Dev Server

Use this package to create a simple Express server for local development testing when using TypeScript modules. ES Modules are imported without paths, like this:

`import { something } from './some-module';`

When your browser executes the module it will make a request to '/some-module' without the .js extension, which the web-server will not be able to serve, resulting in a 404 error.

This web server will intercept requests to the folder containing your modules, and redirect the rquest to the same module but with a .js extension added.

## Usage

Do not try to import this module into another module using `import` or `require` it will not work.

This package is designed to be used as an NPM script only. Add a reference to the package in the `scripts` section of your package.json file:

    "scripts": {
      "serve": "node node_modules/esmodules-dev-server"
    }

Now you can launch the server with the default settings using `npm run serve`.

## Options

| Option | Default | Usage |
| ------ | ------- | ------|
| `--port` | 3000 | Set the port the web server will listen on |
| `--dir` | '/dist' | Set the directory modules are served from |
