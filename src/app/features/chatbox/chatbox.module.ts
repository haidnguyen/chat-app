import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatBoxRoutingModule } from './chatbox-routing.module';
import { ChatboxComponent } from './chatbox.component';
import { UserSwitcherComponent } from './user-switcher/user-switcher.component';
import { ChannelSwitcherComponent } from './channel-switcher/channel-switcher.component';

@NgModule({
  declarations: [
    ChatboxComponent,
    UserSwitcherComponent,
    ChannelSwitcherComponent,
  ],
  imports: [CommonModule, ChatBoxRoutingModule, ReactiveFormsModule],
})
export class ChatboxModule {}
