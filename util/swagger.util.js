const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

// Swagger definition
// You can set every attribute except paths and swagger
//https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
// Options for the swagger docs
const options = {
    // Import swaggerDefinitions
    swaggerDefinition: {
        info: { // API informations (required)
            title: 'LG_work', // Title (required)
            version: 'v1.0.0', // Version (required)
            description: 'LG 산학과제 swagger', // Description (optional)
        },
        host: 'localhost:3000', // BaseUrl
        basePath: '/'
    },

    // Path to the API docs
    apis: [
        'controller/**/**/**/index.js'
    ]
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options)


// custom css
const customCss = {
    customCss: ".opblock-summary-description {text-align: right}"
}

app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, customCss))