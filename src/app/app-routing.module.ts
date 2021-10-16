import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chatbox',
    loadChildren: () => import('@app/features/chatbox').then(module => module.ChatboxModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chatbox',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
