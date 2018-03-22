import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalStorage } from './local-storage.service';

@NgModule({
  providers: [LocalStorage]
})
export class LocalStorageModule {}
