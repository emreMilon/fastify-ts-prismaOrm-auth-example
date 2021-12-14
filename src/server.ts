import fastify from "fastify";
const Port  = process.env.PORT || 8000;
import dotenv from "dotenv";
import cookie, {FastifyCookieOptions} from "fastify-cookie"

dotenv.config()

let server = fastify()

const Server = () => {
   return process.env.NODE_ENV === "development" ?  server = fastify({
       logger: true,
   }) : server = fastify()
}

Server()

const start = async () => {
    try {
        await server.listen(Port);
        console.log(`Server started successfully on port ${process.env.PORT}`)
    } catch (error) {
        server.log.error(error)
        process.exit(1)
    }
}

start()
