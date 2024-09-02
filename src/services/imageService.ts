import fs from 'fs'


export class ImageService {
    public static downloadImage(urls: string[]){
        console.log(`descargando ${urls.length} imagenes`)
    }

    public static uploadImage(){
        console.log('subiendo imagenes')
    }
}