import {  Component, OnDestroy, OnInit } from '@angular/core';
import { SERVER_DATA } from '@views/service/channels.cervice';
import { Subscription, of } from 'rxjs';
import { ICurrentData } from '@views/interface/channelData.interface'


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  constructor(public serverData: SERVER_DATA) {}

  private endPage: number = 24;
  private apiFragment:string = '?_start=0&_end='


  public getTotal(): string{
    const total: string = this.serverData.channelTotal

    return total
  }


  public getBgImage(channel: any): string {
    const bgImage = channel.picture.backgrounds[0]
    return bgImage
  }



  public getMore(){
    this.endPage += 12;
    this.serverData.fetchData(this.apiFragment + this.endPage)
  }



  ngOnInit(): void {
    this.serverData.fetchTotal();
    this.serverData.fetchData(this.apiFragment + this.endPage)
  }



  ngOnDestroy():void {
    console.log(this.serverData.channelData)
  }

}
