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





  public getTotal(): string{
    const total: string = this.serverData.channelTotal

    return total
  }


  public getBgImage(channel: any): string {
    const bgImage = channel.picture.backgrounds[0]
    return bgImage
  }



  public getMore(): void{
    this.serverData.endPage += 12;
    this.serverData.summApi()
    this.serverData.fetchData(this.serverData.apiVar)

  }



  ngOnInit(): void {
    this.serverData.fetchTotal();
    this.serverData.fetchData(this.serverData.apiFragment + this.serverData.endPage)
  }



  ngOnDestroy():void {
    console.log(this.serverData.channelData)
  }

}
