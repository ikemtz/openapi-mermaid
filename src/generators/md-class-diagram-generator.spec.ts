import { MdClassDiagramGenerator } from './md-class-diagram-generator';

describe('MD Class Diagram Generator', () => {
  it('should handleTemplateError', () => {
    const gen = new MdClassDiagramGenerator({
      outputPath: './',
    });
    expect(() => gen.handleTemplateError({ unit: 'test' } as never, new Error('Unit Test'))).toThrowError();
  });

  it('should handleTemplateError with logger', () => {
    const logger = { error: jest.fn() };
    const gen = new MdClassDiagramGenerator({
      logger: logger as never,
      outputPath: './',
    });
    expect(() => gen.handleTemplateError({ unit: 'test' } as never, new Error('Unit Test'))).toThrowError();
    expect(logger.error).toBeCalledTimes(5);
  });
});
