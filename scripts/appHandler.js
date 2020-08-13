const c = require('chalk')

module.exports = class AppHandler {
    constructor (app) {
        this._app = app

        if (typeof this._app !== 'function') {
            console.error(`\t${c.bgRedBright(' ✕ (ERROR) ')} Can not create server! Application is an invalid type`)
            process.exit(1)
        }

        this._http = require('http')

        this._server = this._http.createServer(app)

        this._server.listen(0)

        process.on('SIGTERM', () => {
            this._server.close()
        })
        process.on('SIGINT', () => {
            this._server.close()
        })
    }

    async get(path='', options={}) {
        return new Promise((resolve, reject) => {
            options.agent           = options.agent         || undefined
            options.auth            = options.auth          || '' 
            options.host            = options.host          || this._server.address().address
            options.port            = options.port          || this._server.address().port
            options.headers         = options.headers       || {}
            options.localAddress    = options.localAddress  || ''
            
            options.path = path
            options.method = 'GET'

            this._http.request(options, (res) => {
                resolve(res)
            }).end()
        })
    }

    shutdown() {
        this._server.close()
    }
}