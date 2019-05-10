import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common'
import { HeaderContentComponent } from './header-content';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        IonicModule,
        FormsModule,
        CommonModule
    ],
    declarations: [
        HeaderContentComponent
    ],
    exports: [
        HeaderContentComponent
    ]
})
export class IonicIOSHeaderModule {

}
