import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Store } from '@ngrx/store';
import { State } from './app/state/state.interface';
import { ServerTransferStateModule } from '@angular/platform-server';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import {selectAllLoading, selectAllTodos} from "./app/store/todo.selectors";

@NgModule({
  imports: [
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor(private store: Store<State>) {
    this.serializeInitialState();
  }

  private serializeInitialState(): void {
    this.store.select(selectAllTodos).subscribe(customers => {
      const serializedCustomers = JSON.stringify(customers);
      this.transferState.set('CUSTOMERS', serializedCustomers);
    });
  }
}

const bootstrap = () => bootstrapApplication(AppServerModule);

export default bootstrap;
