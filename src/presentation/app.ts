
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

        console.log(`
        ================================
               Extraccion de datos
        ================================
        `)
        const reports = await DataService.extractData({
            rootAPIUrl: this.rootAPIUrl,
            rootAPIToken: this.rootAPIToken,
            pageSize: 500
        })
        console.log('done!')

        console.log(`
        ================================
                Limpieza de datos
        ================================
        `)
        const cleanReports = reports.map(report => {
            return new ReportEntity(report).toJSON()
        }).filter(report => report.images.length !== 0)
        console.log('done!')

        console.log(`
        ================================
                Carga de datos
        ================================
        `)
        let reportUpload = 1
        for (const report of cleanReports) {
            // Descargar las imágenes
            const imagesPath = await ImageService.downloadImages(report.images);
            //Subir imagen a backend strapi
            const ids = await ImageService.uploadImages(imagesPath, this.outAPIUrl, this.outAPIToken)
            //Subir reporte a backend strapi + relacion con imagenes
            const {images, ...rest} = report
            const data = {
                ...rest,
                images: ids
            }
            //SUBIR MEDIANTE POST EL REPORTE
            DataService.uploadData(data, this.outAPIUrl, this.outAPIToken)
            process.stdout.write(`\rCargando datos: ${reportUpload}/${cleanReports.length}`);
            reportUpload++

        }
        console.log('\ndone!')


    }
}

