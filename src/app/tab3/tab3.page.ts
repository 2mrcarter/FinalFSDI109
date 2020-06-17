import { Component } from '@angular/core';
import { Friend } from '../models/friend';
import { SharedService } from '../services/shared.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  model = new Friend();
  friendsToDisplay: Friend[] = [];

  constructor(private shared: SharedService, private data: DataService) {
    this.data.getAllFriends().subscribe(list => { // arrow fn short notation ( only instruction is the return statment)
      this.friendsToDisplay = list.filter(friend => friend.friendOf == this.shared.userName);
      


      //Array filter
      // Homework this .friendsToDisplay =  lisfilter(......);
      
      // fravel the list of friends
      // compare if the friend.friendOf is equal to my user name
      // if so, push it to the friendsToDisplayArray
  });
    
  }

  saveFriend(){
    this.model.friendOf = this.shared.userName
    console.log('saving friend', this.model);
  

    // save it
    this.data.saveFriend(this.model);

    // clear form
    this.model = new Friend();
  }

}
