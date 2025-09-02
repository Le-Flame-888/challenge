import { createRequire } from "module";

const require = createRequire(import.meta.url);
const jsonServer = require("json-server");
const cors = require('cors');

const server = jsonServer.create({})
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
  static: './dist'
})

server.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);
server.options('http://localhost:3000', cors());

server.use(middlewares);

const EXPECTED_TOKEN = 'test-token-123'

server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`) 
  
  const authHeader = req.headers.authorization
  
  if (!authHeader || authHeader !== `Bearer ${EXPECTED_TOKEN}`) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Include Authorization: Bearer test-token-123 in headers'
    })
  }
  
  next()
})

server.use('/api', router)

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`)
})