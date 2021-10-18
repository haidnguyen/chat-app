import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MessageEffect } from './message.effect';
import { FEATURE_KEY, reducer } from './message.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_KEY, reducer),
    EffectsModule.forFeature([MessageEffect]),
  ],
})
export class MessageModule {}
