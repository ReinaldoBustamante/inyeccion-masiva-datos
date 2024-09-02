
import { ReportEntity } from "../domain";
import { DataService } from "../services/dataService";
import { ImageService } from "../services/imageService";

interface AppProps {
    rootAPIUrl: string
    rootAPIToken: string
    outAPIUrl: string
    outAPIToken: string
}

export class App {

    private readonly rootAPIUrl: string
    private readonly rootAPIToken: string
    private readonly outAPIUrl: string
    private readonly outAPIToken: string

    constructor(props: AppProps) {
        const { rootAPIUrl, rootAPIToken, outAPIUrl, outAPIToken } = props
        this.rootAPIUrl = rootAPIUrl
        this.rootAPIToken = rootAPIToken
        this.outAPIUrl = outAPIUrl
        this.outAPIToken = outAPIToken
    }

    public async start() {

        const reports = await DataService.extractData({
            rootAPIUrl: this.rootAPIUrl,
            rootAPIToken: this.rootAPIToken,
            pageSize: 500
        })
        
        console.log(`
        ================================
               Extraccion de datos
        ================================
        `)
        console.log(`${reports.length} datos extraidos`)
            

        console.log(`
        ================================
                Limpieza de datos
        ================================
        `)
        const cleanReports = reports.map(report => {
            return new ReportEntity(report).toJSON()
        })

        console.log(`${cleanReports.length} datos limpiados`)



        console.log(`
        ================================
                Carga de datos
        ================================
        `)

        cleanReports.map(report => {
            // por cada reporte
            //descargar sus imagenes
            ImageService.downloadImage(report.images)
            //subirlas a strapi (devuelve un array con las ids agregadas)
            const imagesIds = ImageService.uploadImage()
            //actualizar reporte con las ids subidas
            const {images, ...rest} = report
            
            const uploadData = {
                ...rest,
                images: imagesIds
            }

            // subir uploadData a strapi

            DataService.uploadData()
        })

    }
}