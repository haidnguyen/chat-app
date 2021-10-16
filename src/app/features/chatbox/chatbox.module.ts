import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChatBoxRoutingModule } from './chatbox-routing.module';
import { ChatboxComponent } from './chatbox.component';

@NgModule({
  declarations: [ChatboxComponent],
  imports: [CommonModule, ChatBoxRoutingModule],
})
export class ChatboxModule {}
