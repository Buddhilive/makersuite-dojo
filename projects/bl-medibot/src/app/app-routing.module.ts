import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { CopilotComponent } from './components/copilot/copilot.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent
  },
  {
    path: 'copilot',
    component: CopilotComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
