module.exports = {
    transform: {
        "^.+\\.(t)sx?$": "ts-jest"
    },
    testMatch: ['**/tests/**/*.+(ts|js)?(x)', '**/+(*.)+(spec|test).+(ts|js)?(x)'],
    moduleFileExtensions: ['ts', 'js', 'html'],
    moduleNameMapper: {
        //For avoid long imports with ...
        "app\/(.*)": "<rootDir>/src/app/$1",
        "@common/(.*)": "<rootDir>/src/app/common/$1",
    },
    setupFiles: ['./test.config.js'],
    testEnvironment: 'node',
    collectCoverageFrom: [
        '{src|projects}/**/{src|lib}/**/*.{ts}',
        '!{src|projects}/*.{ts}',
        '!{src|projects}/**/*.{js}',
        '!{src|projects}/**/environments/*.{ts}',
        '!{src|projects}/**/model/*.{ts}',
        '!{src|projects}/**/*.module.{ts}',
        '!{src|projects}/**/*public_api.{ts}',
        '!{src|projects}/**/main.{ts}',
        '!{src|projects}/**/polyfills.{ts}',
        '!{src|projects}/**/*index.{ts}',
        '!{src|projects}/**/*test.{ts}',
        '!{src|projects}/**/*.enum.{ts}',
        '!{src|projects}/**/*.state.{ts}',
        '!{src|projects}/**/*.entity.{ts}',
        '!**/**e2e/**/*.{ts}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/env/**',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', 'src/*.{ts}', '/env/']
};
