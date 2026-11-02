import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { MCApiRestHttpService } from './api-rest-http.service';
import { MCApiRestParentHttpService } from './api-rest-parent-http.service';
import { MCApiRestDtoHttpService } from './api-rest-dto-http.service';
import { MCApiRestDtoParentHttpService } from './api-rest-dto-parent-http.service';
import { MCUploadFileService } from './mc-upload-file.service';
import { MCFile, MCFileType, MCFileVisibility } from '../entities/mc-file';

interface TestItem {
  id?: number;
  name: string;
}

interface TestDto {
  id?: number;
  full_name: string;
}

@Injectable()
class TestApiRestService extends MCApiRestHttpService<TestItem> {
  pathModel = 'items';
  baseUrl = 'https://api.example.com/';
}

@Injectable()
class TestApiRestParentService extends MCApiRestParentHttpService<TestItem> {
  parentModel = 'projects';
  pathModel = 'items';
  baseUrl = 'https://api.example.com/';
}

@Injectable()
class TestApiRestDtoService extends MCApiRestDtoHttpService<TestDto, TestItem> {
  pathModel = 'items';
  baseUrl = 'https://api.example.com/';

  mapDtoToEntity(dto: TestDto): TestItem {
    return { id: dto.id, name: dto.full_name };
  }

  mapEntityToDto(entity: TestItem): TestDto {
    return { id: entity.id, full_name: entity.name };
  }
}

@Injectable()
class TestApiRestDtoParentService extends MCApiRestDtoParentHttpService<TestDto, TestItem> {
  parentModel = 'orgs';
  pathModel = 'items';
  baseUrl = 'https://api.example.com/';

  mapDtoToEntity(dto: TestDto): TestItem {
    return { id: dto.id, name: dto.full_name };
  }

  mapEntityToDto(entity: TestItem): TestDto {
    return { id: entity.id, full_name: entity.name };
  }
}

class TestUploadFileService extends MCUploadFileService {
  upload(file: File): Observable<MCFile> {
    return of({ id: 1, name: this.filename(file), type: MCFileType.File, visibility: MCFileVisibility.Public });
  }
}

describe('Core HTTP Services', () => {
  let httpMock: HttpTestingController;
  let apiService: TestApiRestService;
  let parentService: TestApiRestParentService;
  let dtoService: TestApiRestDtoService;
  let dtoParentService: TestApiRestDtoParentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TestApiRestService,
        TestApiRestParentService,
        TestApiRestDtoService,
        TestApiRestDtoParentService,
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(TestApiRestService);
    parentService = TestBed.inject(TestApiRestParentService);
    dtoService = TestBed.inject(TestApiRestDtoService);
    dtoParentService = TestBed.inject(TestApiRestDtoParentService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('MCApiRestHttpService', () => {
    it('should perform CRUD and list operations', () => {
      expect(apiService.endpoint).toBe('https://api.example.com/items');

      apiService.create({ name: 'New' }).subscribe(res => expect(res).toEqual({ id: 1, name: 'New' }));
      const postReq = httpMock.expectOne('https://api.example.com/items');
      expect(postReq.request.method).toBe('POST');
      postReq.flush({ id: 1, name: 'New' });

      apiService.update({ id: 1, name: 'Updated' }).subscribe(res => expect(res.name).toBe('Updated'));
      const putReq = httpMock.expectOne('https://api.example.com/items/1');
      expect(putReq.request.method).toBe('PUT');
      putReq.flush({ id: 1, name: 'Updated' });

      apiService.get(1).subscribe(res => expect(res.id).toBe(1));
      const getReq = httpMock.expectOne('https://api.example.com/items/1');
      expect(getReq.request.method).toBe('GET');
      getReq.flush({ id: 1, name: 'Updated' });

      apiService.list('page=2').subscribe(res => expect(res.data.length).toBe(1));
      const listReq = httpMock.expectOne('https://api.example.com/items?page=2');
      expect(listReq.request.method).toBe('GET');
      listReq.flush({ data: [{ id: 1, name: 'Updated' }], total: 1 });

      apiService.list().subscribe(res => expect(res.data.length).toBe(0));
      const listNoParamsReq = httpMock.expectOne('https://api.example.com/items');
      listNoParamsReq.flush({ data: [] });

      apiService.delete(1).subscribe();
      const delReq = httpMock.expectOne('https://api.example.com/items/1');
      expect(delReq.request.method).toBe('DELETE');
      delReq.flush(null);
    });

    it('should create items in bulk', () => {
      const results: TestItem[] = [];
      apiService.createInBulk([{ name: 'A' }, { name: 'B' }]).subscribe(res => results.push(res));

      const reqs = httpMock.match('https://api.example.com/items');
      expect(reqs.length).toBe(2);
      reqs[0].flush({ id: 1, name: 'A' });
      reqs[1].flush({ id: 2, name: 'B' });
      expect(results.length).toBe(2);
    });
  });

  describe('MCApiRestParentHttpService', () => {
    it('should build nested endpoint using parentId', () => {
      parentService.setParentId('42');
      expect(parentService.endpoint).toBe('https://api.example.com/projects/42/items');
    });
  });

  describe('MCApiRestDtoHttpService & MCApiRestDtoParentHttpService', () => {
    it('should map between DTO and Entity across CRUD operations', () => {
      dtoService.create({ name: 'Alice' }).subscribe(res => expect(res).toEqual({ id: 10, name: 'Alice' }));
      const postReq = httpMock.expectOne('https://api.example.com/items');
      expect(postReq.request.body).toEqual({ id: undefined, full_name: 'Alice' });
      postReq.flush({ id: 10, full_name: 'Alice' });

      dtoService.update({ id: 10, name: 'Alice B' }).subscribe(res => expect(res).toEqual({ id: 10, name: 'Alice B' }));
      const putReq = httpMock.expectOne('https://api.example.com/items/10');
      putReq.flush({ id: 10, full_name: 'Alice B' });

      dtoService.get(10).subscribe(res => expect(res.name).toBe('Alice B'));
      httpMock.expectOne('https://api.example.com/items/10').flush({ id: 10, full_name: 'Alice B' });

      dtoService.list('limit=5').subscribe(res => expect(res.data[0].name).toBe('Alice B'));
      httpMock.expectOne('https://api.example.com/items?limit=5').flush({ data: [{ id: 10, full_name: 'Alice B' }] });

      dtoService.delete(10).subscribe();
      httpMock.expectOne('https://api.example.com/items/10').flush(null);
    });

    it('should build nested endpoint in MCApiRestDtoParentHttpService', () => {
      dtoParentService.setParentId('99');
      expect(dtoParentService.endpoint).toBe('https://api.example.com/orgs/99/items');
    });
  });

  describe('MCUploadFileService', () => {
    it('should return file name and upload', () => {
      const uploadService = new TestUploadFileService();
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      expect(uploadService.filename(file)).toBe('document.pdf');
      uploadService.upload(file).subscribe(res => {
        expect(res.name).toBe('document.pdf');
      });
    });
  });
});
