import { Application } from "express";
import swaggerUi from 'swagger-ui-express'
import yaml from "yamljs";

const swaggerDocument = yaml.load('./src/config/swagger.yaml')

export const swaggerInit = (app: Application) => {
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}