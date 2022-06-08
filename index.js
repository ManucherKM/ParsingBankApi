const express = require("express")
const authRouter = require("./authRouter")
const PORT = 5000;

const app = express()

app.use(express.json())
app.use(authRouter)
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server start ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start()