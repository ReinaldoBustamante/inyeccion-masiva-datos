import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data'

export class ImageService {

    private static async downloadImage(url: string, outputPath: string) {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(outputPath, response.data);
    }

    public static async downloadImages(urls: string[]): Promise<string[]> {
        const downloadedImages = [];
        const dirPath = path.join(__dirname, '..', '..', 'assets', 'img');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        for (const url of urls) {
            const fileName = path.basename(url);
            const outputPath = path.join(dirPath, fileName);
            await this.downloadImage(url, outputPath)
            downloadedImages.push(outputPath)
        }


        return downloadedImages
    }


    public static async uploadImages(images: string[], outAPIUrl: string, outAPIToken: string): Promise<number[]> {
        const form = new FormData();
        images.forEach(image => {
            form.append('files', fs.createReadStream(image))
        })

        const response = await axios.post(`${outAPIUrl}/api/upload`, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${outAPIToken}` // Incluye esto si es necesario
            }
        })

        const ids = response.data.map((img:any) => img.id)
        await this.deleteImages()

        return ids
    }


    private static async deleteImages(): Promise<void> {
        const dirPath = path.join(__dirname, '..', '..', 'assets', 'img');
        if (fs.existsSync(dirPath)) {
            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    console.error(`Error al leer la carpeta: ${err}`);
                    return;
                }

                files.forEach(file => {
                    const filePath = path.join(dirPath, file);
                    fs.unlink(filePath, err => {
                        if (err) {
                            console.error(`Error al eliminar el archivo ${filePath}: ${err}`);
                        }
                    });
                });
            });
        } else {
            console.log('La carpeta no existe');
        }
    }
}