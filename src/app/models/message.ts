export class Message {
    text: string;
    imageUrl: string;
    createdOn: Date;
    from: string;
    to: string;


    constructor () {
        this.createdOn = new Date(); // set current date/time
        this.to = 'Everyone';
    }


}

    