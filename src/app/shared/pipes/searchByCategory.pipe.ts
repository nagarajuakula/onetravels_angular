import { PipeTransform, Pipe } from '@angular/core';

import { Trip } from '../models/trip';

@Pipe({
    name: 'searchByCategory'
})
export class SearchByCategoryPipe implements PipeTransform {
    transform(trips: Trip[], id: number): Trip[] {
        if (id !== 1) {
            return trips.filter(trip => {
                return trip.id === id;
            });
        }

        return trips;
    }
}