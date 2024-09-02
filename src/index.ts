import { App } from "./presentation/app"
import { Envs } from "./config"
const app = () => {
    const envs = Envs.getEnvs()
    const application = new App(envs)
    application.start()
}

(() => {
    app()
})()