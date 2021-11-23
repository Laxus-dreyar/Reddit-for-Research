import { Component, OnInit } from '@angular/core';
import { FileUploadService } from "../shared/file-upload.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})


export class DocumentsListComponent implements OnInit {

  documents: any = [];
  flags: boolean[] = [];
  retrievedFlag = false;

  constructor(public fileUploadService: FileUploadService, private domSanitizer: DomSanitizer) {
    this.getDocuments();
  }

  ngOnInit() { }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async getDocuments() {
    this.documents = (await this.fileUploadService.getDocuments().toPromise())['documents'];
    for (var i = 0; i < this.documents.length; i++)
      this.flags[i] = false;

    this.retrievedFlag = true;
  }

  changeFlag(id: number) {
    for (var i = 0; i < this.flags.length; i++)
      if (this.flags[i] == true)
        this.flags[i] = false;

    this.flags[id] = true;
  }

  goToUrl(url: string) {
    window.open(url, "_blank");
  }
}