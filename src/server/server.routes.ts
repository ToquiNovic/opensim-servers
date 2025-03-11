import { Router } from 'express';
import { validateResource } from '../middlewares/validateRequest';
import { CreateServerSchema } from './server.schema';
import Controller from './server.controller';

const ServerRouter = Router();

// Get 
ServerRouter.get('/', Controller.get) // Get all servers
ServerRouter.get('/file',Controller.getFiles) // Search file in server
ServerRouter.get('/:gridName', Controller.getByGridName) // Get server by gridName
ServerRouter.get('/files/:gridName', Controller.getFiles) // Get files by gridNames

// Post
ServerRouter.post('/',validateResource(CreateServerSchema), Controller.create) // create server

// Put
ServerRouter.put('/file', Controller.updateFile) // Actualiza un archivo en el servidor


// Delete
ServerRouter.delete('/:gridName', Controller.delete) // Delete server

export default ServerRouter;