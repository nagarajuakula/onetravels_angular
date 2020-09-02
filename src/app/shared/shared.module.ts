import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFilter } from './pipes/search-filter.pipe';
import { SearchByCategoryPipe } from './pipes/searchByCategory.pipe';
import { NoProductFoundComponent } from './components/no-product-found/no-product-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [ CommonModule, RouterModule ],
    declarations: [  
        SearchFilter, 
        SearchByCategoryPipe, 
        NoProductFoundComponent ],
    exports: [ 
        SearchFilter, 
        SearchByCategoryPipe, 
        NoProductFoundComponent]
})
export class SharedModule {

}