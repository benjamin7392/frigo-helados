// Test básico de ejemplo para ventas (Jest)
const request = require('supertest');
const app = require('../server');

describe('API de Ventas', () => {
  it('debería rechazar crear venta sin productos', async () => {
    const res = await request(app)
      .post('/api/ventas')
      .send({ productos: [], metodoPago: 'efectivo' });
    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toMatch(/al menos un producto/i);
  });
});
