const server = new Server(require('../index'))

group('Sample Tests', async () => {
    it('Should pass', async () => {
        expect(1+1).toEqual(2)
    })
    it('Should fail', async () => {
        expect(1+1).toEqual(3)
    })
})

group('Server Tests', async () => {
    it('Should receive 200 OK HTTP status response for GET / ', async () => {
        let res = await server.get('/')

        expect(res.statusCode).toEqual(200)
    })
    it('Should receive 404 NOT FOUND HTTP status response for GET /abc123', async () => {
        let res = await server.get('/abc123')

        expect(res.statusCode).toEqual(404)
    })
})
