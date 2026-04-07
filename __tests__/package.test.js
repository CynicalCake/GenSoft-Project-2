const packageJson = require('../package.json');

describe('project metadata', () => {
    test('has the expected package name', () => {
        expect(packageJson.name).toBe('gensoft-project-2');
    });
});
