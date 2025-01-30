import { stopOpensim } from "./services/opensim.service"

interface Directory {
    directory: string
}

export class CommandService {
    init(dir: Directory) {
        const { directory } = dir
        stopOpensim(directory)
        return {'initialized': true}
    }

    start() {
        return 'started'
    }

    createUser() {
        return 'created'
    }

    stop() {
        return 'stopped'
    }
}