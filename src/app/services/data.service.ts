import { Injectable } from '@angular/core';
import { Message } from '../models/message';

import{AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { map }  from 'rxjs/operators';
import { Friend } from '../models/friend';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DataService { 

  private allMessages: Observable<Message[]>;
  private allFriends: Observable<Friend[]>;

  // collection of objects <---> database
  messageCollection: AngularFirestoreCollection<Message>;
  friendCollection: AngularFirestoreCollection<Friend>;


  constructor(private fb: AngularFirestore) {
    this.messageCollection = fb.collection<Message>('messages');
    this.friendCollection = fb.collection<Friend>('friends');

    this.retrieveMessages();
  }

  public saveMessage(message){
    // push to db
    var item = Object.assign({}, message);
    this.messageCollection.add(item); // v- SAVE to db
  }
  
  public saveFriend(friend){
    // push to db
    var item = Object.assign({}, friend);
    this.messageCollection.add(item); // v- SAVE to db
  }

  private retrieveMessages() { 
    this.allMessages = this.messageCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(m => {
          var data = m.payload.doc.data();
          var theirDate : any = data.createdOn; // custom date format used by firebase
          data.createdOn = new firestore.Timestamp(theirDate.seconds, theirDate.nanoseconds).toDate();
          return {...data}; //
        })
      })
      ); //
  }

  private retrieveFriends() {
    this.allFriends = this.friendCollection.valueChanges(); // subscribe to DB table changes
  }

  public getAllMessages(){
    //validations
    // decide if the change shold continue or not
    this.retrieveMessages();
    return this.allMessages;
  }

  public getAllFriends(){
    //validations
    // decide if the change shold continue or not
    this.retrieveFriends();
    return this.allFriends;
  }

}
