import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileValidators } from 'ngx-file-drag-drop';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-petition',
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.scss']
})
export class PetitionComponent implements OnInit {

    
  value1: any;

  value2: any;

  value3: any;

  value4: any;

  value5: any;

  value6: any;

  value7: any;

  value8: any;
  
  value9: any;

  value10: any;

  value11: any;

  valueIconLeft: any;

  valueIconRight: any;

  uploadedFiles: any[] = [];

  fileControl = new FormControl(
    [],
    [FileValidators.maxFileCount(2)]
  )

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {

  
  // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }


  onUploadFile(file: any) {
    console.log(this.fileControl.value);
    
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }



}
