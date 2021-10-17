import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@app/shared/button';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ChannelSwitcherComponent } from './channel-switcher/channel-switcher.component';
import { ChatBoxRoutingModule } from './chatbox-routing.module';
import { ChatboxComponent } from './chatbox.component';
import { UserSwitcherComponent } from './user-switcher/user-switcher.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { MessageFormComponent } from './message-form/message-form.component';

@NgModule({
  declarations: [
    ChatboxComponent,
    UserSwitcherComponent,
    ChannelSwitcherComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageFormComponent,
  ],
  imports: [
    CommonModule,
    ChatBoxRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    AngularSvgIconModule,
  ],
})
export class ChatboxModule {}
