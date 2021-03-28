import { Component, OnInit  } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
      private modal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  public message(all) {
        return this.modal.open(all);
    };

}


