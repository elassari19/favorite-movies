export const mockIsAuthenticated = jest.fn((req, res, next) => {
  req.user = { id: 'testUserId', role: 'admin' };
  next();
});
