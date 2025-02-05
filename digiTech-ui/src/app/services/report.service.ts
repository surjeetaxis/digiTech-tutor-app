import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private SAVE_REPORT_URL = 'http://localhost:8080/api/report/save/{studentId}';
  private GET_ALL_REPORTS_BY_STUDENT_URL =
    'http://localhost:8080/api/report/all';
  private GET_REPORT_URL =
    'http://localhost:8080/api/report/details/{reportId}';
  private DELETE_REPORT_URL =
    'http://localhost:8080/api/report/delete/{reportId}';
  private GET_ALL_REPORTS_BY_TUTOR_URL =
    'http://localhost:8080/api/report/allByTutor';
  private GET_REPORT_COUNT_BY_TUTOR_URL =
    'http://localhost:8080/api/report/countByTutor';

  constructor(private httpClient: HttpClient) {}

  saveReport(
    studentId: string,
    report: Blob,
    studentIdentifier: string
  ): Promise<any> {
    const url = this.SAVE_REPORT_URL.replace('{studentId}', studentId);
    const formData = new FormData();
    formData.set('report', report);
    formData.set('studentIdentifier', studentIdentifier);
    return firstValueFrom(
      this.httpClient.post(url, formData, { responseType: 'json' })
    );
  }

  getAllReports(studentId: string): Promise<any> {
    const params = new HttpParams().set('studentId', studentId);
    return firstValueFrom(
      this.httpClient.get(this.GET_ALL_REPORTS_BY_STUDENT_URL, {
        params,
        responseType: 'json',
      })
    );
  }

  // getReport(reportId: string): Promise<any> {
  //   const url = this.GET_REPORT_URL.replace("{reportId}", reportId);
  //   return firstValueFrom(this.httpClient.get(url, { responseType: 'json' }));
  // }

  getReport(reportId: string): Promise<Blob> {
    const url = this.GET_REPORT_URL.replace('{reportId}', reportId);
    return firstValueFrom(this.httpClient.get(url, { responseType: 'blob' }));
  }

  deleteReport(reportId: string): Promise<any> {
    const url = this.DELETE_REPORT_URL.replace('{reportId}', reportId);
    return firstValueFrom(
      this.httpClient.delete(url, { responseType: 'json' })
    );
  }

  getAllReportsByTutor(tutorId: number): Promise<any> {
    const params = new HttpParams().set('tutorId', tutorId);
    return firstValueFrom(
      this.httpClient.get(this.GET_ALL_REPORTS_BY_TUTOR_URL, {
        params,
        responseType: 'json',
      })
    );
  }

  getReportCountByTutor(tutorId: number): Promise<any> {
    const params = new HttpParams().set('tutorId', tutorId);
    return firstValueFrom(
      this.httpClient.get(this.GET_REPORT_COUNT_BY_TUTOR_URL, {
        params,
        responseType: 'json',
      })
    );
  }
}
