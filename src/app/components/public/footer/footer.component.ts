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
      title: 'Contacto',
      links: [
        {
          nombre: '999 905 016',
          href: 'tel:999905016'
        },
        {
          nombre: 'Wanchaq, Cusco - Perú',
          href: 'https://goo.gl/maps/TWqeKsaGkwewZJCw8'
        },
      ]
    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
