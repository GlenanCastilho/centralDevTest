import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['Atividade', 'Contrato', 'Descricao', 'Descricao', 'Portfolio', 'Responsavel', 'Servico', 'Usuario', 'analise', 'gruponivel1'];


  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    const apiUrl = 'https://gsm-hmg.centralitcloud.com.br/citsmart/services';
    const loginUrl = `${apiUrl}/login`;
    const dataQueryUrl = `${apiUrl}/data/query`;

    const credentials = {
      clientId: 'API_PBI',
      language: 'pt_BR',
      userName: 'citsmart.local\\desafiodev',
      password: 'desafioDev1@'
    };

    this.http.post(loginUrl, credentials).subscribe((response: any) => {
      const token = response.sessionID;

      const query = {
        sessionID: token,
        queryName: 'DESAFIODEV'
      };

      this.http.post(dataQueryUrl, query).subscribe((data: any) => {
        this.dataSource.data = data.result;
        console.log(data.result);

        if (this.paginator) {
          this.paginator.pageSize = 20;
          this.dataSource.paginator = this.paginator;
        }
      }, (error) => {
        console.error('Erro ao buscar dados:', error);
      });
    }, (error) => {
      console.error('Erro ao fazer login:', error);
    });
  }
}
