import { Component } from '@angular/core';
import { Message } from '../models/message';
import { SharedService } from '../services/shared.service';
import { DataService } from '../services/data.service';
import { Friend } from '../models/friend';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  model: Message = new Message();
  myFriends: Friend[] = [];

  constructor(private shared: SharedService, private data: DataService) {
    this.data.getAllFriends().subscribe(list => {
      //filter to get only my friends
      this.myFriends = list.filter(friend => friend.friendOf == this.shared.userName);
       
    });
      //Array filter
      // Homework this .friendsToDisplay =  lisfilter(......);
      // compare if the friend.friendOf is equal to my user name
      // if so, push it to the friendsToDisplayArray
  
  }


  post() {
    this.model.from = this.shared.userName;
    // save fn on dataService
    this.data.saveMessage(this.model);

    console.log("Saved", this.model);

    //clear form
    this.model = new Message();
  }
}
