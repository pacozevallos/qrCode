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

  caracteristicas = [
    {
      titulo: 'Catálogo digital de productos',
      descripcion: 'Muestra una galería de tus productos simple y sencilla. Incluye destacados, detalles del producto y comparte',
      image: 'https://firebasestorage.googleapis.com/v0/b/qrcode-3b121.appspot.com/o/home%2FcelularStoreBolsa.png?alt=media&token=d4905c77-a394-4d73-b08b-39b48260bc8f'
    },
    {
      titulo: 'Cambios en tiempo real',
      descripcion: 'Cambia o edita cualquier dato de tus productos y el usuario verá el cambio al instante sin realizar ningúna acción',
      image: 'https://firebasestorage.googleapis.com/v0/b/qrcode-3b121.appspot.com/o/home%2FdetalleProducto.png?alt=media&token=65d64ef4-df85-4328-946e-495fb4b32125'
    },
    {
      titulo: 'Comparte con código QR',
      descripcion: 'Comparte tu catálogo mediante un código QR. ¿Tienes un restaurante? haz que tus comensales vean tus productos',
      image: 'https://firebasestorage.googleapis.com/v0/b/qrcode-3b121.appspot.com/o/home%2FcodigoQr.png?alt=media&token=27eec019-3153-419a-8b78-5a3afb40a8b1'
    },
    {
      titulo: 'Diseño centrado en el usuario',
      descripcion: 'Interfaz amigable orientado y optimizado tanto para dipositivos móviles, como para PC’s de escritorio',
      image: 'https://firebasestorage.googleapis.com/v0/b/qrcode-3b121.appspot.com/o/home%2FmanoCorazones.png?alt=media&token=93608712-0c5c-4ad8-bd1c-6d3755ac6019'
    },
    {
      titulo: 'Administrador de productos',
      descripcion: 'Administra tus productos de manera sencilla, edita precios, nombres, agrega, elimina o desactiva productos, etc.',
      image: 'https://firebasestorage.googleapis.com/v0/b/qrcode-3b121.appspot.com/o/home%2Fadmin.png?alt=media&token=af84339e-9ade-4d9f-8adc-de41cb7eef46'
    },
    {
      titulo: 'Personaliza tu negocio',
      descripcion: 'Incluye el color de tu marca en tu catálogo y muéstrales a tus clientes la identidad de tu marca',
      image: 'https://firebasestorage.googleapis.com/v0/b/qrcode-3b121.appspot.com/o/home%2FmanoStore.png?alt=media&token=59d93a56-c9a8-44a0-bf93-11daaa721c36'
    },
  ];

  planes = [
    {
      nombre: 'Power',
      precio: '1 mes gratis, luego pagas S/. 9.90 al mes',
      descuento: '-90%',
      caracteristicas : [
        'Productos ilimitados',
        'Vende por WhatsApp',
        'Personaliza tu negocio',
        'Cambios en tiempo real',
        'Comparte con código QR',
        'Asistencia técnica para crear tu catálogo'
      ],
      nameButton: 'Empezar prueba gratuita',
      urlButton: 'https://www.mercadopago.com.pe/subscriptions/checkout?preapproval_plan_id=2c93808481e5f3990181e9845f3b00fb'
    },
    {
      nombre: 'Free',
      precio: 'Gratis siempre',
      descuento: '',
      caracteristicas : [
        'Hasta 20 productos',
        'Vende por WhatsApp',
        'Personaliza tu negocio',
        'Cambios en tiempo real',
        'Comparte con código QR',
      ],
      nameButton: 'Lo quiero',
      urlButton: '/admin'
    },
  ]

}
