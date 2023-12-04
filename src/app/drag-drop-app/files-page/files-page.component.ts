import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataBlockchainService } from 'src/app/core/services/blockchain/data-blockchain.service';
import { lastValueFrom } from "rxjs";
import * as CryptoJS from "crypto-js";

@Component({
  selector: 'app-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit {

  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService, private blockchain: DataBlockchainService) { }

  ngOnInit(): void {

  }

  onUpload(event: any){
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

    for(let file of this.uploadedFiles){
      const reader = new FileReader();
      reader.onloadend = async (event)=>{
        if (reader.readyState == FileReader.DONE){
          const resultArray = event.target?.result;
          const hash = CryptoJS.SHA256(this.arrayBufferToWordArray(resultArray));
          const final = await lastValueFrom (this.blockchain.sendDataToBlockchain(hash));
          if(final){
            this.messageService.add({severity: 'success', summary: 'File Uploaded', detail: 'Hash file request sent to blockchain network.'});
          }else{
            this.messageService.add({severity: 'error', summary: 'Exception', detail: 'Exception ocurred while sending file request to blockchain.'});
          }
        }
      }

      reader.readAsBinaryString(file);
    }
  }

  arrayBufferToWordArray(fileResult: any) {
    var i8a = new Uint8Array(fileResult);
    var a = [];
    for (var i = 0; i < i8a.length; i += 4) {
      a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
  }

}
