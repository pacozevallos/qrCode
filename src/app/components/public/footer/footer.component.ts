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
  ];

  bloquesFooter: any = [
    {
      title: 'Qatu',
      links: [
        {
          nombre: 'Inicio',
          url: '/'
        },
        {
          nombre: 'Caracteristicas',
          url: '/caracteristicas'
        },
        {
          nombre: 'Precios',
          url: '/precios'
        },
        {
          nombre: 'Ingresar',
          url: '/login'
        },
        {
          nombre: 'Crear cuenta',
          url: '/registro'
        },
      ]
    },
    {
      title: 'Legales',
      links: [
        {
          nombre: 'Términos y condiciones',
          url: '/terminosCondiciones'
        },
        {
          nombre: 'Política de privacidad',
          url: '/politicaPrivacidad'
        },
      ]
    },
    {
      title: 'Soporte',
      links: [
        {
          nombre: 'owner@qatu.app',
          href: 'mailto:owner@qatu.app'
        },
      ]
    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
