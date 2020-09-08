import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchByCategoryPipe } from './pipes/searchByCategory.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [ CommonModule, RouterModule ],
    declarations: [  
        SearchByCategoryPipe, 
        ],
    exports: [ 
        SearchByCategoryPipe, 
    ]
})
export class SharedModule {

}