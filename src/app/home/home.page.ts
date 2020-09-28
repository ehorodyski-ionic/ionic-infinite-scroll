import { Component, OnInit, ViewChild } from "@angular/core";
import { IonContent, IonInfiniteScroll } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  messages = [
    { id: 1, content: "1 😀" },
    { id: 2, content: "2 😀😀" },
    { id: 3, content: "3 😀😀😀" },
    { id: 4, content: "4 😀😀😀😀😀" },
    { id: 5, content: "5 😀😀😀😀😀😀" },
    { id: 6, content: "6 😀😀😀😀😀😀😀" },
    { id: 7, content: "7 😀😀😀😀😀😀😀😀" },
    { id: 8, content: "8 😀😀😀😀😀😀😀😀😀" },
    { id: 9, content: "9 😀😀😀😀😀😀😀😀😀😀" },
    { id: 10, content: "10 😀😀😀😀😀😀😀😀😀😀" },
    { id: 11, content: "11 😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 12, content: "12 😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 13, content: "13 😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 14, content: "14 😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 15, content: "15 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 16, content: "16 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 17, content: "17 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 18, content: "18 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 19, content: "19 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 20, content: "20 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 21, content: "21 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 22, content: "22 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 23, content: "23 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    { id: 24, content: "24 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀" },
    {
      id: 25,
      content: "25 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀",
    },
    {
      id: 26,
      content: "26 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀",
    },
    {
      id: 27,
      content: "27 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀",
    },
    {
      id: 28,
      content: "28 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀",
    },
    {
      id: 29,
      content: "29 😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀",
    },
  ];
  displayedMessages$ = new BehaviorSubject([]);
  messageIndex = 0;
  firstLoad = true;

  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild("content", { static: false }) content: IonContent;

  constructor() {}

  identify(index, item) {
    return item.id;
  }

  ngOnInit() {}

  showContent(id: number) {
    console.log(id);
    //if (id > 10) return false;
    return id > this.messageIndex;
  }

  loadData(event) {
    setTimeout(() => {
      if (this.messageIndex >= this.messages.length) {
        event.target.disabled = true;
        return;
      }

      // This block prevents the ion-infinite-scroll animation from occuring.
      //event.target.disabled = true;
      this.loadMoreItems();

      //event.target.disabled = false;
      event.target.complete();

      setTimeout(() => (this.messageIndex += 10), 100);
    }, 900);
  }

  loadMoreItems() {
    // Just a more succint way to handle ordering the array
    let value = this.messages
      .slice(this.messageIndex, this.messageIndex + 10)
      .reverse()
      .concat(this.displayedMessages$.value);
    //value = value.sort((a: any, b: any) => (b.id > a.id ? 1 : -1));
    this.displayedMessages$.next(value);

    if (this.firstLoad) {
      this.scrollToBottom();
      this.firstLoad = false;
    }
  }

  scrollToBottom(ms?: number) {
    setTimeout(
      () => {
        // This commented out portion is what I got to work consistently
        // const lastMessage = this.displayedMessages[
        //   this.displayedMessages.length - 1
        // ];
        // if (lastMessage) {
        //   const lastEl = document.getElementById("1");
        //   this.content.scrollToPoint(0, lastEl.offsetTop, 100);
        // }

        // This works inconsistently. I'm not even sure it's doing anything, cause if you comment it out
        // and have no action for scrolling to bottom, the screen still scrolls to bottom upon load sometimes
        this.content.scrollToBottom();
      },
      ms ? ms : 0
    );
  }
}
