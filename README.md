# openapi-mermaid
Generates Mermaid diagrams from OpenApi Docs


[![Build Status](https://ikemtz.visualstudio.com/CI%20CD/_apis/build/status/openapi-mermaid?branchName=master)](https://ikemtz.visualstudio.com/CI%20CD/_build/latest?definitionId=20&branchName=master) [![npm version](https://badge.fury.io/js/openapi-mermaid.svg)](https://www.npmjs.com/package/openapi-mermaid) [![npm downloads](https://img.shields.io/npm/dt/openapi-mermaid)](https://www.npmjs.com/package/openapi-mermaid) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=openapi-mermaid&metric=alert_status)](https://sonarcloud.io/dashboard?id=openapi-mermaid) [![Issues](https://img.shields.io/github/issues-raw/ikemtz/OpenApi-mermaid)](https://github.com/ikemtz/openapi-mermaid/issues) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=openapi-mermaid&metric=coverage)](https://sonarcloud.io/dashboard?id=openapi-mermaid) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=openapi-mermaid&metric=ncloc)](https://sonarcloud.io/dashboard?id=openapi-mermaid) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=openapi-mermaid&metric=security_rating)](https://sonarcloud.io/dashboard?id=openapi-mermaid)

# OpenApi-mermaid

NPM package use to generate mermaid diagram documentation for endpoints documented by swagger using the [OpenAPI spec](https://swagger.io/docs/specification/about/).

## TypeScript usage with a hosted OpenApi Spec document.

```javascript
import { generateDiagrams } from 'openapi-mermaid';

generateDiagrams({
  openApiJsonUrl: '{Your Swagger Enpoint URL here}',
  outputPath: './{outputFolder}/',
  outputFileName: 'class-diagram', /* This is an optional parameter */
});
```

## TypeScript usage with an OpenApi Spec document stored on your local computer.

```javascript
import { generateDiagrams } from 'openapi-mermaid';

generateDiagrams({
  openApiJsonFileName: '{location and file name of your OpenApi document}',
  outputPath: './{outputFolder}/',
  outputFileName: 'class-diagram', /* This is an optional parameter */
});
```

## Javascript usage with a hosted OpenApi Spec document.

```javascript
const generator = require('openapi-mermaid');

generator.generateDiagrams({
  openApiJsonUrl: '{Your Swagger Enpoint URL here}',
  outputPath: './{outputFolder}/',
});
```

## Javascript usage with an OpenApi Spec document stored on your local computer.

```javascript
const generator = require('openapi-mermaid');

generator.generateDiagrams({
  openApiJsonFileName: '{location and file name of your OpenApi document}',
  outputPath: './{outputFolder}/',
});
```

## Working example with NRSRx based service

```javascript
import { generateDiagrams } from 'openapi-mermaid';

generateDiagrams({
  openApiJsonUrl: 'https://im-wa-cmpo-nrsr.azurewebsites.net/swagger/v1/swagger.json',
  outputPath: './models/',
  typeFilterCallBack: (val, i, arr) => !val.name.endsWith('ODataEnvelope'),
  valuePropertyTypeFilterCallBack: (val, i, arr) => !val.name.startsWith('created') && !val.name.startsWith('updated'),
});
```
