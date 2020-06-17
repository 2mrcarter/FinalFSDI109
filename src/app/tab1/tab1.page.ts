import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Message } from '../models/message';
import { SharedService } from '../services/shared.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  messageToDisplay: Message[];

  constructor(private data: DataService, private shared: SharedService) {
    this.data.getAllMessages().subscribe( list => {
      this.messageToDisplay = list.filter(m => 
        m.from == this.shared.userName || m.to == this.shared.userName || m.to == "Everyone");
     
        //sort the array
      this.messageToDisplay = this.messageToDisplay.sort(function(a,b){
        if(a.createdOn > b.createdOn){
          return -1; // put A,B
        }
          return 1;// put b, a
        
      });
    });
  }
}
