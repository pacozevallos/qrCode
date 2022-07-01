import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  legales = [
    {
      nombre: 'Libro de reclamaciones',
      url: '/libroReclamaciones'
    },
    {
      nombre: 'Términos y condiciones',
      url: '/terminosCondiciones'
    },
    {
      nombre: 'Política de privacidad',
      url: '/politicaPrivacidad'
    },
    // {
    //   nombre: 'Derechos ARCO',
    //   url: '/derechosArco'
    // },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
