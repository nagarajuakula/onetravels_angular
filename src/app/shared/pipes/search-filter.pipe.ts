import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
    name: 'search'
})
export class SearchFilter implements PipeTransform {
    transform(trips: Trip[], searchTerm: any): Trip[] {
        // if(!searchTerm) {
        //     return trips;
        // }

        // searchTerm = searchTerm.toLocaleLowerCase();
        // return trips.filter(trip => {
        //     return trip.from_location.toLocaleLowerCase().includes(searchTerm) || 
        //     trip.description.toLocaleLowerCase().includes(searchTerm);
        // });

        return null;
    }
    
}