import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidCoreService {
  dataSource: any;
  recordsData: any = [];

  constructor(
    private http: HttpClient
  ) { }

  getCountrsList(){
    return this.http.get(`https://corona.lmao.ninja/v2/countries?yesterday&sort`);
  }

  overallList(){
    return this.http.get(`https://corona.lmao.ninja/v2/all?yesterday`);
  }
}
