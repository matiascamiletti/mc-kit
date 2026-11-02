import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MCFileType } from '@mckit/core';
import { MCGCloudStorageService } from './gcloud-storage.service';
import { provideGcloudStorage } from '../providers/gcloud-storage.provider';
import { GCLOUD_STORAGE_CONFIG } from '../entities/gcloud-storage-config.entity';

describe('MCGCloudStorageService', () => {
  let service: MCGCloudStorageService;
  let httpMock: HttpTestingController;

  describe('direct upload (is_need_signed_url = false)', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideGcloudStorage({
            bucket: 'my-test-bucket',
            is_need_signed_url: false,
          }),
          MCGCloudStorageService,
        ],
      });

      service = TestBed.inject(MCGCloudStorageService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should be created and provide GCLOUD_STORAGE_CONFIG', () => {
      expect(service).toBeTruthy();
      expect(TestBed.inject(GCLOUD_STORAGE_CONFIG).bucket).toBe('my-test-bucket');
    });

    it('should generate timestamped encoded filename', () => {
      const file = new File(['hello'], 'my report.v1.pdf', { type: 'application/pdf' });
      const generated = service.filename(file);
      expect(generated).toMatch(/^my%20report\.v1_\d+\.pdf$/);
    });

    it('should upload file directly to Google Cloud Storage when signed URL is not needed', () => {
      const file = new File(['content'], 'photo.png', { type: 'image/png' });
      let uploadedResult: any;

      service.upload(file).subscribe((res) => (uploadedResult = res));

      const req = httpMock.expectOne((r) =>
        r.url.startsWith('https://storage.googleapis.com/upload/storage/v1/b/my-test-bucket/o?uploadType=media&name=photo_')
      );
      expect(req.request.method).toBe('POST');
      req.flush({ size: 1234 });

      expect(uploadedResult).toBeDefined();
      expect(uploadedResult.name).toBe('photo.png');
      expect(uploadedResult.url).toContain('https://storage.googleapis.com/my-test-bucket/photo_');
      expect(uploadedResult.size).toBe(1234);
      expect(uploadedResult.type).toBe(MCFileType.File);
      expect(uploadedResult.mime_type).toBe('image/png');
    });
  });

  describe('signed URL upload (is_need_signed_url = true)', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideGcloudStorage({
            bucket: 'signed-bucket',
            baseUrl: 'https://api.example.com',
            is_need_signed_url: true,
          }),
          MCGCloudStorageService,
        ],
      });

      service = TestBed.inject(MCGCloudStorageService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should request a signed URL first and then PUT the file', () => {
      const file = new File(['data'], 'doc.txt', { type: 'text/plain' });
      let uploadedResult: any;

      service.upload(file).subscribe((res) => (uploadedResult = res));

      const signedReq = httpMock.expectOne('https://api.example.com/signed-urls');
      expect(signedReq.request.method).toBe('POST');
      expect(signedReq.request.body.mime_type).toBe('text/plain');
      signedReq.flush({ url: 'https://storage.googleapis.com/signed-put-url', filename: 'doc_123.txt' });

      const putReq = httpMock.expectOne('https://storage.googleapis.com/signed-put-url');
      expect(putReq.request.method).toBe('PUT');
      expect(putReq.request.headers.get('Content-Type')).toBe('text/plain');
      putReq.flush({ name: 'doc_123.txt', size: 4 });

      expect(uploadedResult).toEqual({
        name: 'doc.txt',
        url: 'https://storage.googleapis.com/signed-bucket/doc_123.txt',
        size: 4,
        type: MCFileType.File,
        mime_type: 'text/plain',
      });
    });
  });
});

