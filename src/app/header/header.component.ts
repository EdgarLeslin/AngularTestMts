import { Component, OnInit } from '@angular/core';
import { SERVER_DATA } from '@views/service/channels.cervice';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public serverData: SERVER_DATA) { }



  public sortButton(){
    this.serverData.apiSort = this.serverData.getApiSort()
    this.serverData.summApi()
    this.serverData.fetchData(this.serverData.apiVar)
  }




  ngOnInit(): void {
    // this.serverData.fetchAllGenres()
  }

}
