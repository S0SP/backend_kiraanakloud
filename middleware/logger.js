// Simple request logger middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log when request is received
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  
  // Once response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  
  next();
};

module.exports = requestLogger; 