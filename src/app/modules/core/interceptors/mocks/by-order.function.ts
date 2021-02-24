import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MockItemType} from './mock-request.model';

export function byOrder(): (source$: Observable<MockItemType>) => Observable<MockItemType> {
    let usage: number = 0;
    return source$ =>
        source$
            .pipe(
                map(([value, item]: MockItemType) => {
                    usage++;
                    const newValue = Array.isArray(value) ? value[usage % value.length] : value;
                    return [newValue, item];
                }),
            );
}
