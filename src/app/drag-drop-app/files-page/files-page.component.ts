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
      let token = '';
      reader.onload = async (event)=>{
        if (reader.readyState == FileReader.DONE){
          const resultArray = event.target?.result;
          const hash = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(<string>resultArray));
          const SHA = hash.toString(CryptoJS.enc.Hex);
          this.blockchain.loginBlockchainNetwork().subscribe(response =>{
            console.log(response);
            token = response.data;
            this.messageService.add({severity: 'success', summary: 'Logged', detail: 'You are logged now.'});
            this.sendToBlockchain(file.name, SHA, token);
          }, error =>{
            console.log(error)
          });

          }else{

          }

        }
        reader.readAsBinaryString(file);
      }

    }

    sendToBlockchain(file: any, SHA:string, token: string){
      this.blockchain.sendDataToBlockchain(file, SHA, token).subscribe(response =>{
        this.messageService.add({severity: 'success', summary: 'File Uploaded', detail: 'Hash file request sent to blockchain network.'});
      }, error =>{
        this.messageService.add({severity: 'error', summary: 'Exception', detail: 'Exception ocurred while sending file request to blockchain.'});
      });
    }
  }
