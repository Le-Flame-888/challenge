import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './dist'
});

// Enable CORS
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3002'];
server.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse request body
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Authentication middleware
const EXPECTED_TOKEN = 'test-token-123';

server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, { query: req.query });
  
  // Skip auth for OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    return next();
  }
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader !== `Bearer ${EXPECTED_TOKEN}`) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Include Authorization: Bearer test-token-123 in headers'
    });
  }
  
  next();
});

// Custom route for users with search
server.get('/api/users', (req, res) => {
  const { q: search, _page = 1, _limit = 10, role, isActive } = req.query;
  console.log('Search params:', { search, _page, _limit, role, isActive });
  
  const db = router.db.getState();
  let users = [...db.users];
  
  // Apply search filter (email only)
  if (search) {
    console.log('Applying search filter for:', search);
    const searchLower = search.toLowerCase();
    users = users.filter(user => {
      const matches = user.email.toLowerCase().includes(searchLower);
      console.log(`User ${user.email} matches search:`, matches);
      return matches;
    });
  }
  
  // Apply role filter
  if (role) {
    console.log('Filtering by role:', role);
    users = users.filter(user => user.role === role);
  }
  
  // Apply status filter
  if (isActive !== undefined) {
    const active = isActive === 'true';
    console.log('Filtering by active status:', active);
    users = users.filter(user => user.isActive === active);
  }
  
  // Handle pagination
  const page = parseInt(_page, 10);
  const limit = parseInt(_limit, 10);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  // Set headers for total count
  res.setHeader('x-total-count', users.length);
  
  console.log(`Returning ${paginatedUsers.length} of ${users.length} users`);
  res.json(paginatedUsers);
});

// API routes
server.use('/api', router);

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`Available routes:`);
  console.log(`- GET    /api/users`);
  console.log(`- POST   /api/users`);
  console.log(`- GET    /api/users/:id`);
  console.log(`- PUT    /api/users/:id`);
  console.log(`- DELETE /api/users/:id`);
});