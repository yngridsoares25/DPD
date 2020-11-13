

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { Post } from 'src/services/post';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
 
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { PhotoService } from './services/photo.service';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxMaskIonicModule.forRoot()
  ],
  providers: [
    StatusBar,    
    SplashScreen,
    Post,
    File,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
