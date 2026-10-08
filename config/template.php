<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "travel".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'travel'),

    'flavors' => array (
  'travel' => 
  array (
    'label' => 'Travel & Agen Tiket',
    'brand_name' => 'JALANKU',
    'brand_tagline' => 'Paket wisata & tiket',
    'brand_initials' => 'JA',
    'accent' => '#0284c7',
    'category' => 'jasa',
    'home' => 'travel.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Travel',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/travel',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Paket Wisata',
              'to' => '/travel/paket',
              'icon' => 'Map',
            ),
            2 => 
            array (
              'label' => 'Booking',
              'to' => '/travel/booking',
              'icon' => 'Ticket',
            ),
            3 => 
            array (
              'label' => 'Manifest',
              'to' => '/travel/manifest',
              'icon' => 'ClipboardList',
            ),
            4 => 
            array (
              'label' => 'Agen',
              'to' => '/travel/agen',
              'icon' => 'Users',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/travel/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
