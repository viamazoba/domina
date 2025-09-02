import server from './service'
import colors from 'colors'

const port = process.env.PORT || 4001

server.listen(port, () => {
    console.log(colors.bgYellow.bold(`Rest API funcionando en el puerto ${port}`.black))
})