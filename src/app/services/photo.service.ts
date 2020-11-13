import { HttpClient } from '@angular/common/http';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource, Camera, Filesystem,Storage} from '@capacitor/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";
  serverFotos: string = "http://marcoduarte.cf/api/uploads/";
  serverAPI: string = "http://marcoduarte.cf/api/apiFotos.php";
  // other code
  constructor(private http: HttpClient,private toastController:ToastController,private file: File,private loadingController: LoadingController,private router: Router) { }



  public async addNewToGallery() {


     // Take a photo
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri, // file-based data; provides best performance
        source: CameraSource.Camera, // automatically take a new photo with the camera
        quality: 100 // highest quality (0 to 100)
      });

      // Save the picture and add it to photo collection
      const savedImageFile = await this.savePicture(capturedPhoto);
      this.photos.unshift(savedImageFile);

      Storage.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos)
      });
      console.log(this.photos);

  }

  public async loadSaved() {
      // Retrieve cached photo array data
      const photoList = await Storage.get({ key:

      this.PHOTO_STORAGE });
      this.photos = JSON.parse

     (photoList.value) || [];

      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile

        = await Filesystem.readFile({
            path: photo.filepath,
            directory: FilesystemDirectory.Data
        });
        
    // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }


  public async deleteSaved( index) {
    this.photos.splice(index, 1);
    Storage.clear();
   Storage.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos)
      });
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    const base64Data = await this.readAsBase64(cameraPhoto);

      // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
      
    const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: FilesystemDirectory.Data
      });

      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
    return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
   }

   private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
   

    // tslint:disable-next-line: no-non-null-assertion

    const response = await fetch(cameraPhoto.webPath);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    // tslint:disable-next-line: new-parens
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public startUpload(strPath) {

    

    this.file.resolveLocalFilesystemUrl(strPath)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file))
        })
        .catch(async err => {
          const toast = await this.toastController.create({
            message: 'Erro ao salvar foto!!',
            duration: 1000
          });
          toast.present();
        });
  }
 
   readFile(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        formData.append('file', imgBlob, file.name);
        this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  public async subirFotos(foto: Photo) {
    const formData = new FormData();
    let blob = await fetch(foto.webviewPath).then(r => r.blob());

        formData.append('file', blob, foto.filepath);
        this.uploadImageData(formData);
    
  }
 
  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
        message: 'Salvando...',
    });
    await loading.present();
 
    this.http.post(this.serverAPI, formData)
        .pipe(
            finalize(() => {
                loading.dismiss();

                this.router.navigate(['/produtos']);
            })
         
        )
        .subscribe(async res => {
            console.log(res);
            if (res['success']) {
              const toast = await this.toastController.create({
                message: 'Foto Salva com Sucesso!!',
                duration: 1000
              });
              toast.present();
            } else {
              const toast = await this.toastController.create({
                message: 'Erro ao salvar!!',
                duration: 1000
              });
              toast.present();
            }
        });
    }

    public obterUriFotos(nome_foto){
      return this.serverFotos + nome_foto ;
     }

    public servidorFotos(){

      return this.serverFotos;
    }


}

export interface Photo {
  filepath: string;
  webviewPath: string;
}

