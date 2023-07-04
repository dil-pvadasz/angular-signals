import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FakeService } from '../fake.service';
import { Message } from '../message';

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RxComponent implements OnInit {
  public messages = this.messageService.messages;

  constructor(private messageService: FakeService) {}

  ngOnInit() {}

  public markSeen(message: Message) {
    this.messageService.markSeen(message);
  }
}
