import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, IonInfiniteScroll} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    messages = [];
    displayedMessages = [];
    messageIndex;
    firstLoad = true;

    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    @ViewChild('content', {static: false}) content: IonContent;

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                '😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀' +
                '😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀\'', 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        }, 800);
    }

    loadData(event) {
        setTimeout(() => {
            this.loadMoreItems();
            event.target.complete();

            if (
                this.messages.length &&
                this.displayedMessages.length === this.messages.length
            ) {
                event.target.disabled = true;
            }
        }, 900);
    }

    loadMoreItems() {
        if (!this.messages.length) {
            return;
        }
        if (this.messageIndex === undefined) {
            this.messageIndex = this.messages.length - 1;
        }

        for (let i = 0; i < 10; i++) {
            if (this.displayedMessages.length === this.messages.length) {
                break;
            }
            this.displayedMessages.unshift(this.messages[this.messageIndex]);
            this.messageIndex--;
        }

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
                // this.displayedMessages.length - 1
                //     ];
                // if (lastMessage) {
                //     const lastEl = document.getElementById(lastMessage.messageId);
                //     this.content.scrollToPoint(0, lastEl.offsetTop, 100);
                // }

                // This works inconsistently. I'm not even sure it's doing anything, cause if you comment it out
                // and have no action for scrolling to bottom, the screen still scrolls to bottom upon load sometimes
                this.content.scrollToBottom();
            },
            ms ? ms : 0
        );
    }

}
