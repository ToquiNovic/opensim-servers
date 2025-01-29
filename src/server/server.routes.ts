import { Router } from 'express';
import { validateResource } from '../middlewares/validateRequest';
import { CreateServerSchema } from './server.schema';
import Controller from './server.controller';

const ServerRouter = Router();

// Get 
ServerRouter.get('/', Controller.get) // Get all servers
ServerRouter.get('/file',Controller.getFiles) // Search file in server
ServerRouter.get('/:gridname', Controller.getByGridName) // Get server by gridName
ServerRouter.get('/files/:gridname', Controller.getFiles) // Get files by gridNames

// Post
ServerRouter.post('/',validateResource(CreateServerSchema), Controller.create) // create server
ServerRouter.post('/file', Controller.searchFile) // Search file in server

// Put
ServerRouter.put('/file',) // Update server file

// Delete
ServerRouter.delete('/:gridname', Controller.delete) // Delete server

export default ServerRouter;