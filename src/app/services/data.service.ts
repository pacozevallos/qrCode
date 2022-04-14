import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  tiposNegocio: string[] = [
    'Restaurante',
    'Hotelería',
    'Restobar',
    'Cafetería',
    'Heladería',
    'Juguería',
    'Discoteca',
    'Pub',
    'Bar',
  ];

  redesSociales = [
    {
      nombre: 'Tripadvisor',
      icon: 'brand-tripadvisor'
    },
    {
      nombre: 'TikTok',
      icon: 'brand-tiktok'
    },
    {
      nombre: 'Instagram',
      icon: 'brand-instagram'
    },
    {
      nombre: 'Facebook',
      icon: 'brand-facebook'
    },
    {
      nombre: 'WhatsApp',
      icon: 'brand-whatsapp'
    },
    {
      nombre: 'Youtube',
      icon: 'brand-youtube'
    },
    {
      nombre: 'Linkedin',
      icon: 'brand-linkedin'
    },
    {
      nombre: 'Twitter',
      icon: 'brand-twitter'
    },
  ];

}
