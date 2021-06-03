import { OpenAPIObject } from 'openapi3-ts';
import { SchemaWrapperInfo } from './models/schema-info';
import { OpenApiDocConverter } from './openapidoc-converter';

describe('OpenApiDocConverter Tests', () => {
  it('should handle blank parseRef()', () => {
    const converter = new OpenApiDocConverter({ outputPath: '' }, {} as OpenAPIObject);
    const result = converter.parseRef({ propertyReferenceObject: {} } as SchemaWrapperInfo);
    expect(result).toBe('unknown');
  });

  it('should handle invalid getPropertyTypeScriptType()', (done) => {
    const converter = new OpenApiDocConverter({ outputPath: '' }, {} as OpenAPIObject);
    try {
      converter.getPropertyType({ propertySchemaObject: {} } as SchemaWrapperInfo);
      done.fail('This test should throw an exception');
    } catch (err) {
      expect(err).toMatchSnapshot();
      done();
    }
  });
});
