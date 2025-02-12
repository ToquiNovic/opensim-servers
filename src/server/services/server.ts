import { CreateServerService, ConfigServerService, ConfigurePvto } from "./";
import { BadRequestError } from "../../middlewares/global-errors";
import { assembleSubmissionData } from "../utils";
import { CreateServerDto } from "../server.dto";
import { ApiCreateServer } from "../../utils";

export async  function authenticateAndCreateServer(createServerDto: CreateServerDto) {
    try{
        const data = await assembleSubmissionData(createServerDto);
        const apiResponse = await ApiCreateServer(data);
        data.id = apiResponse.id // set id from api response
        const server = await CreateServerService(data)
        ConfigServerService(data)

        // create pvto server
        ConfigurePvto(server.pvtoPath, data) // create .env file

        return server
    } catch (error) {  
       throw new BadRequestError(`${(error as Error).message}`);
    }
}
