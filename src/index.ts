import * as fs from 'fs';
import axios from 'axios';
import { OpenAPIObject } from 'openapi3-ts';
import { HtmlClassDiagramGenerator, MdClassDiagramGenerator } from './generators';
import { IGeneratorOptions, setGeneratorOptionDefaults } from './models/generator-options';
import { ITemplateData } from './models/template-data';
import { OpenApiDocConverter } from './openapidoc-converter';

export { nrsrxTypeFilterCallBack, nrsrxValuePropertyTypeFilterCallBack } from './models/nrsrx-filters';

export async function generateDiagrams(options: IGeneratorOptions): Promise<void> {
  options = setGeneratorOptionDefaults(options);
  const apiDocument: OpenAPIObject = await getOpenApiDocumentAsync(options);
  const converter = new OpenApiDocConverter(options, apiDocument);
  const templateData: ITemplateData = converter.convertDocument();
  generateOutput(options, templateData);
}

async function getOpenApiDocumentAsync(options: IGeneratorOptions): Promise<OpenAPIObject> {
  let apiDoc: OpenAPIObject;
  if (options.openApiJsonUrl) {
    const response = await axios.get(options.openApiJsonUrl);
    apiDoc = response.data as OpenAPIObject;
  } else if (options.openApiJsonFileName) {
    const response = fs.readFileSync(options.openApiJsonFileName);
    apiDoc = JSON.parse(response.toString()) as OpenAPIObject;
  } else {
    throw new Error(
      'You must specify either an OpenApi Json Url or FileName.  Please review the readme.md @ https://github.com/ikemtz/openapi-mermaid.',
    );
  }
  return apiDoc;
}

function generateOutput(options: IGeneratorOptions, templateData: ITemplateData) {
  if (fs.existsSync(options.outputPath)) {
    fs.readdirSync(options.outputPath).forEach((file) => fs.unlinkSync(`${options.outputPath}/${file}`));
    fs.rmdirSync(options.outputPath);
  }
  fs.mkdirSync(options.outputPath, { recursive: true });
  const htmlClassDiagramGenerator = new HtmlClassDiagramGenerator(options);
  htmlClassDiagramGenerator.generate(templateData);
  const mdlassDiagramGenerator = new MdClassDiagramGenerator(options);
  mdlassDiagramGenerator.generate(templateData);
}
