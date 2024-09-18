import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Clima {
    ciudad: string;
    latitud: string;
    longitud: string;
    continente: string;
}

interface RangoFecha {
    fechaInicial: string;
    fechaFinal: string;
}

@Injectable({
    providedIn: 'root',
})
export class ClimaService {

    private readonly storageKey = 'ciudadesClima';
    private ciudadesIniciales: Clima[] = [
        { ciudad: 'Managua', continente: 'América', latitud: "12.130543253324316", longitud: "-86.27322700163214" },
        { ciudad: 'San Jóse', continente: 'América', latitud: "9.931647619135939", longitud: "-84.08897512002422" },
        { ciudad: 'San Salvador', continente: 'América', latitud: "13.69966108365291", longitud: "-89.21836247177282" },
        { ciudad: 'Sevilla', continente: 'Europa', latitud: "37.387094387651146", longitud: "-5.985958008027635" }
    ];
    private ciudadesClimaSubject: BehaviorSubject<Clima[]> = new BehaviorSubject<Clima[]>(this.getInitialCiudades());
    private selecteCiudad: BehaviorSubject<Clima> = new BehaviorSubject<Clima>(this.ciudadesIniciales[0]);
    private rangoFecha: RangoFecha = {fechaInicial: '', fechaFinal:''};
    constructor(private http: HttpClient) { 
        this.saveCiudadesToLocalStorage();
    }
    
    getPronostico(numDays: number): Observable<any> {
        this.setDates(numDays);
        debugger
        const params = {
            latitude: Number(this.selecteCiudad.value.latitud),
            longitude: Number(this.selecteCiudad.value.longitud),
            start_date: this.rangoFecha.fechaInicial,
            end_date: this.rangoFecha.fechaFinal,
            hourly: ['temperature_2m', 'apparent_temperature', 'precipitation', 'pressure_msl']
        };
        return this.http.get<any>('https://api.open-meteo.com/v1/forecast', { params });
    }

    getCiudadesClima(): Observable<Clima[]> {
        return this.ciudadesClimaSubject.asObservable();
    }

    getSelectedCiudad(): Observable<Clima> {
        return this.selecteCiudad.asObservable();
    }

    agregarCiudad(nuevaCiudad: Clima) {
        const ciudadesActuales = this.ciudadesClimaSubject.value;
        this.ciudadesClimaSubject.next([...ciudadesActuales, nuevaCiudad]);
        this.saveCiudadesToLocalStorage();
    }

    cambiarSelectedCiudad(ciudad: Clima) {
        this.selecteCiudad.next(ciudad);
    }

    eliminarCiudadesExtra() {
        const ciudadesActuales = this.ciudadesClimaSubject.value;
        const primerasCuatro = ciudadesActuales.slice(0, 4);
        this.ciudadesClimaSubject.next(primerasCuatro);
        this.saveCiudadesToLocalStorage();
    }

    private getInitialCiudades(): Clima[] {
        const storedCiudades = localStorage.getItem(this.storageKey);
        if (storedCiudades) {
            return JSON.parse(storedCiudades);
        }
        return this.ciudadesIniciales;
    }

    private saveCiudadesToLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.ciudadesClimaSubject.value));
    }

    private setDates(numDays: number): void {
        debugger
        const currentDate = new Date();
        const endDate = new Date();
        endDate.setDate(currentDate.getDate() + numDays);
        this.rangoFecha.fechaInicial = currentDate.toISOString().split('T')[0];
        this.rangoFecha.fechaFinal = endDate.toISOString().split('T')[0];
    }
}