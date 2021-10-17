import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@app/shared/button';

import { ChannelSwitcherComponent } from './channel-switcher/channel-switcher.component';
import { ChatBoxRoutingModule } from './chatbox-routing.module';
import { ChatboxComponent } from './chatbox.component';
import { UserSwitcherComponent } from './user-switcher/user-switcher.component';

@NgModule({
  declarations: [
    ChatboxComponent,
    UserSwitcherComponent,
    ChannelSwitcherComponent,
  ],
  imports: [
    CommonModule,
    ChatBoxRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
})
export class ChatboxModule {}
