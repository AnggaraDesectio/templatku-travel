<?php

namespace App\Support\Demo;

/**
 * Data demo Travel & Agen Tiket (JALANKU): paket wisata, keberangkatan,
 * booking, manifest penumpang, agen.
 * Kontrak status: ['label' => .., 'tone' => ..] tanpa HTML,
 * tone ∈ success | warning | destructive | info.
 * Booking merujuk keberangkatan + agen; manifest merujuk booking.
 */
class TravelData
{
    private static function rp(int $value): string
    {
        return 'Rp'.number_format($value, 0, ',', '.');
    }

    private static function jt(int $value): int
    {
        return (int) round($value / 1000000);
    }

    /** Baris mentah paket wisata (tanpa agregat), dipakai internal agar tidak rekursi. */
    private static function paketRows(): array
    {
        return [
            ['id' => 1, 'nama' => 'Bali 3D2N',        'durasi' => '3 Hari 2 Malam', 'harga' => 2450000, 'destinasi' => 'Bali',       'gambar' => '/images/travel/paket-1.jpg'],
            ['id' => 2, 'nama' => 'Bromo Open Trip',  'durasi' => '2 Hari 1 Malam', 'harga' => 750000,  'destinasi' => 'Bromo',      'gambar' => '/images/travel/paket-2.jpg'],
            ['id' => 3, 'nama' => 'Yogyakarta 2D1N', 'durasi' => '2 Hari 1 Malam', 'harga' => 950000,  'destinasi' => 'Yogyakarta', 'gambar' => '/images/travel/paket-3.jpg'],
            ['id' => 4, 'nama' => 'Lombok 4D3N',      'durasi' => '4 Hari 3 Malam', 'harga' => 3200000, 'destinasi' => 'Lombok',     'gambar' => '/images/travel/paket-4.jpg'],
            ['id' => 5, 'nama' => 'Bandung 2D1N',     'durasi' => '2 Hari 1 Malam', 'harga' => 850000,  'destinasi' => 'Bandung',    'gambar' => '/images/travel/paket-5.jpg'],
            ['id' => 6, 'nama' => 'Dieng Open Trip',  'durasi' => '2 Hari 1 Malam', 'harga' => 650000,  'destinasi' => 'Dieng',      'gambar' => '/images/travel/paket-6.jpg'],
            ['id' => 7, 'nama' => 'Jakarta City Tour','durasi' => '1 Hari',         'harga' => 350000,  'destinasi' => 'Jakarta',    'gambar' => '/images/travel/paket-7.jpg'],
            ['id' => 8, 'nama' => 'Raja Ampat 5D4N',  'durasi' => '5 Hari 4 Malam', 'harga' => 8500000, 'destinasi' => 'Raja Ampat', 'gambar' => '/images/travel/paket-8.jpg'],
        ];
    }

    /** Baris mentah jadwal keberangkatan: merujuk paket_id. */
    private static function keberangkatanRows(): array
    {
        return [
            ['id' => 1, 'paket_id' => 1, 'tgl' => '11 Okt 2026', 'kuota' => 40, 'terisi' => 32],
            ['id' => 2, 'paket_id' => 2, 'tgl' => '17 Okt 2026', 'kuota' => 30, 'terisi' => 27],
            ['id' => 3, 'paket_id' => 3, 'tgl' => '18 Okt 2026', 'kuota' => 35, 'terisi' => 20],
            ['id' => 4, 'paket_id' => 4, 'tgl' => '24 Okt 2026', 'kuota' => 25, 'terisi' => 18],
            ['id' => 5, 'paket_id' => 5, 'tgl' => '25 Okt 2026', 'kuota' => 30, 'terisi' => 12],
            ['id' => 6, 'paket_id' => 6, 'tgl' => '31 Okt 2026', 'kuota' => 30, 'terisi' => 9],
            ['id' => 7, 'paket_id' => 1, 'tgl' => '08 Nov 2026', 'kuota' => 40, 'terisi' => 15],
            ['id' => 8, 'paket_id' => 3, 'tgl' => '15 Nov 2026', 'kuota' => 35, 'terisi' => 6],
        ];
    }

    /** Baris mentah agen penjual. */
    private static function agenRows(): array
    {
        return [
            ['id' => 1, 'nama' => 'Budi Santoso',  'kota' => 'Jakarta',   'telepon' => '0812-3456-7890'],
            ['id' => 2, 'nama' => 'Agus Wijaya',   'kota' => 'Surabaya',  'telepon' => '0813-2345-6789'],
            ['id' => 3, 'nama' => 'Dewi Anggraini','kota' => 'Bandung',   'telepon' => '0815-6789-0123'],
            ['id' => 4, 'nama' => 'Rina Wulandari','kota' => 'Semarang',  'telepon' => '0816-5432-1098'],
            ['id' => 5, 'nama' => 'Hendra Gunawan','kota' => 'Yogyakarta','telepon' => '0817-1234-5678'],
            ['id' => 6, 'nama' => 'Maya Kusuma',   'kota' => 'Denpasar',  'telepon' => '0821-2345-6789'],
        ];
    }

    private static function statusBayar(string $key): array
    {
        return match ($key) {
            'lunas' => ['label' => 'Lunas',       'tone' => 'success'],
            'dp'    => ['label' => 'DP 50%',      'tone' => 'warning'],
            'belum' => ['label' => 'Belum Bayar', 'tone' => 'destructive'],
            default => ['label' => $key,           'tone' => 'info'],
        };
    }

    /** Baris mentah booking: merujuk keberangkatan_id + agen_id. */
    private static function bookingRows(): array
    {
        return [
            ['id' => 1,  'kode' => 'TRV-2026-001', 'pelanggan' => 'Andi Wijaya',    'telepon' => '0812-1111-2222', 'keberangkatan_id' => 1, 'seat' => 2, 'status_bayar' => 'lunas', 'agen_id' => 1],
            ['id' => 2,  'kode' => 'TRV-2026-002', 'pelanggan' => 'Sinta Maharani', 'telepon' => '0813-3333-4444', 'keberangkatan_id' => 1, 'seat' => 4, 'status_bayar' => 'lunas', 'agen_id' => 1],
            ['id' => 3,  'kode' => 'TRV-2026-003', 'pelanggan' => 'Rudi Hartono',   'telepon' => '0815-5555-6666', 'keberangkatan_id' => 2, 'seat' => 3, 'status_bayar' => 'dp',    'agen_id' => 2],
            ['id' => 4,  'kode' => 'TRV-2026-004', 'pelanggan' => 'Dewi Lestari',   'telepon' => '0816-7777-8888', 'keberangkatan_id' => 2, 'seat' => 2, 'status_bayar' => 'lunas', 'agen_id' => 2],
            ['id' => 5,  'kode' => 'TRV-2026-005', 'pelanggan' => 'Bambang Sutrisno','telepon' => '0817-9999-0000', 'keberangkatan_id' => 3, 'seat' => 5, 'status_bayar' => 'dp',    'agen_id' => 3],
            ['id' => 6,  'kode' => 'TRV-2026-006', 'pelanggan' => 'Maya Putri',     'telepon' => '0821-1234-5678', 'keberangkatan_id' => 4, 'seat' => 2, 'status_bayar' => 'lunas', 'agen_id' => 3],
            ['id' => 7,  'kode' => 'TRV-2026-007', 'pelanggan' => 'Joko Prasetyo',   'telepon' => '0823-3456-7890', 'keberangkatan_id' => 5, 'seat' => 3, 'status_bayar' => 'belum', 'agen_id' => 4],
            ['id' => 8,  'kode' => 'TRV-2026-008', 'pelanggan' => 'Fitri Handayani','telepon' => '0821-4567-8901', 'keberangkatan_id' => 1, 'seat' => 1, 'status_bayar' => 'lunas', 'agen_id' => 1],
            ['id' => 9,  'kode' => 'TRV-2026-009', 'pelanggan' => 'Hendra Gunawan', 'telepon' => '0822-5678-9012', 'keberangkatan_id' => 6, 'seat' => 2, 'status_bayar' => 'dp',    'agen_id' => 5],
            ['id' => 10, 'kode' => 'TRV-2026-010', 'pelanggan' => 'Ratna Sari',     'telepon' => '0822-3456-7890', 'keberangkatan_id' => 7, 'seat' => 4, 'status_bayar' => 'lunas', 'agen_id' => 5],
            ['id' => 11, 'kode' => 'TRV-2026-011', 'pelanggan' => 'Dedi Kurniawan', 'telepon' => '0821-9087-6543', 'keberangkatan_id' => 3, 'seat' => 2, 'status_bayar' => 'belum', 'agen_id' => 6],
            ['id' => 12, 'kode' => 'TRV-2026-012', 'pelanggan' => 'Nina Marlina',   'telepon' => '0821-3456-1234', 'keberangkatan_id' => 8, 'seat' => 1, 'status_bayar' => 'dp',    'agen_id' => 6],
        ];
    }

    /** Daftar paket + agregat seat terisi dari jadwal keberangkatan. */
    public static function pakets(): array
    {
        $terisi = [];
        $jadwal = [];
        foreach (self::keberangkatanRows() as $k) {
            $terisi[$k['paket_id']] = ($terisi[$k['paket_id']] ?? 0) + $k['terisi'];
            $jadwal[$k['paket_id']] = ($jadwal[$k['paket_id']] ?? 0) + 1;
        }

        return array_map(fn ($p) => [
            'id'                 => $p['id'],
            'nama'               => $p['nama'],
            'durasi'             => $p['durasi'],
            'destinasi'          => $p['destinasi'],
            'harga'              => $p['harga'],
            'harga_rp'           => self::rp($p['harga']),
            'jadwal_keberangkatan' => $jadwal[$p['id']] ?? 0,
            'seat_terisi'        => $terisi[$p['id']] ?? 0,
            'gambar'             => $p['gambar'] ?? null,
        ], self::paketRows());
    }

    /** Jadwal keberangkatan diperkaya info paket + sisa kuota. */
    public static function keberangkatans(): array
    {
        $pakets = [];
        foreach (self::paketRows() as $p) {
            $pakets[$p['id']] = $p;
        }

        return array_map(function ($k) use ($pakets) {
            $p = $pakets[$k['paket_id']];
            $sisa = $k['kuota'] - $k['terisi'];
            $rasio = $k['kuota'] > 0 ? $k['terisi'] / $k['kuota'] : 0;
            return [
                'id'          => $k['id'],
                'paket'       => $p['nama'],
                'destinasi'   => $p['destinasi'],
                'tgl'         => $k['tgl'],
                'kuota'       => $k['kuota'],
                'terisi'      => $k['terisi'],
                'sisa'        => $sisa,
                'kuota_teks'  => $k['terisi'].'/'.$k['kuota'].' seat',
                'status'      => $sisa <= 0
                    ? ['label' => 'Penuh', 'tone' => 'destructive']
                    : ($rasio >= 0.8
                        ? ['label' => 'Hampir Penuh', 'tone' => 'warning']
                        : ['label' => 'Tersedia', 'tone' => 'success']),
            ];
        }, self::keberangkatanRows());
    }

    /** Booking diperkaya paket, tanggal berangkat, agen, dan total harga. */
    public static function bookings(): array
    {
        $keberangkatan = [];
        foreach (self::keberangkatanRows() as $k) {
            $keberangkatan[$k['id']] = $k;
        }
        $pakets = [];
        foreach (self::paketRows() as $p) {
            $pakets[$p['id']] = $p;
        }
        $agens = [];
        foreach (self::agenRows() as $a) {
            $agens[$a['id']] = $a;
        }

        return array_map(function ($b) use ($keberangkatan, $pakets, $agens) {
            $k = $keberangkatan[$b['keberangkatan_id']];
            $p = $pakets[$k['paket_id']];
            $total = $b['seat'] * $p['harga'];
            return [
                'id'            => $b['id'],
                'kode'          => $b['kode'],
                'pelanggan'     => $b['pelanggan'],
                'telepon'       => $b['telepon'],
                'paket'         => $p['nama'],
                'tgl_berangkat' => $k['tgl'],
                'seat'          => $b['seat'],
                'agen'          => $agens[$b['agen_id']]['nama'],
                'total'         => $total,
                'total_rp'      => self::rp($total),
                'status_bayar'  => self::statusBayar($b['status_bayar']),
            ];
        }, self::bookingRows());
    }

    /** Agen + penjualan dan komisi 5% dari booking yang dibayar (lunas/dp). */
    public static function agens(): array
    {
        $keberangkatan = [];
        foreach (self::keberangkatanRows() as $k) {
            $keberangkatan[$k['id']] = $k;
        }
        $harga = [];
        foreach (self::paketRows() as $p) {
            $harga[$p['id']] = $p['harga'];
        }

        $agg = [];
        foreach (self::agenRows() as $a) {
            $agg[$a['id']] = [
                'id' => $a['id'], 'nama' => $a['nama'], 'kota' => $a['kota'], 'telepon' => $a['telepon'],
                'penjualan' => 0, 'seat' => 0, 'komisi' => 0,
            ];
        }
        foreach (self::bookingRows() as $b) {
            $k = $keberangkatan[$b['keberangkatan_id']];
            $nilai = $b['seat'] * $harga[$k['paket_id']];
            $agg[$b['agen_id']]['penjualan']++;
            $agg[$b['agen_id']]['seat'] += $b['seat'];
            if (in_array($b['status_bayar'], ['lunas', 'dp'], true)) {
                $agg[$b['agen_id']]['komisi'] += (int) round($nilai * 0.05);
            }
        }
        usort($agg, fn ($a, $b) => $b['komisi'] <=> $a['komisi']);

        return array_map(fn ($r) => [
            'id'        => $r['id'],
            'nama'      => $r['nama'],
            'kota'      => $r['kota'],
            'telepon'   => $r['telepon'],
            'penjualan' => $r['penjualan'],
            'seat'      => $r['seat'],
            'komisi_rp' => self::rp($r['komisi']),
        ], array_values($agg));
    }

    /** Manifest per keberangkatan: daftar penumpang dari booking. */
    public static function manifest(): array
    {
        $penumpang = [];
        foreach (self::bookings() as $b) {
            $penumpang[$b['tgl_berangkat']][] = $b;
        }

        return array_map(function ($k) use ($penumpang) {
            $k['penumpang'] = $penumpang[$k['tgl']] ?? [];
            $k['jumlah_penumpang'] = count($k['penumpang']);
            return $k;
        }, self::keberangkatans());
    }

    /** Ringkasan angka dashboard (dihitung dari data). */
    public static function ringkasan(): array
    {
        $bookings = self::bookings();
        $mingguIni = ['11 Okt 2026', '17 Okt 2026'];
        $keberangkatanMingguIni = count(array_filter(
            self::keberangkatanRows(),
            fn ($k) => in_array($k['tgl'], $mingguIni, true)
        ));
        $seatTerisi = array_sum(array_column(self::keberangkatanRows(), 'terisi'));
        $omzet = 0;
        foreach (self::bookingRows() as $b) {
            if ($b['status_bayar'] !== 'lunas') {
                continue;
            }
            foreach (self::keberangkatanRows() as $k) {
                if ($k['id'] === $b['keberangkatan_id']) {
                    foreach (self::paketRows() as $p) {
                        if ($p['id'] === $k['paket_id']) {
                            $omzet += $b['seat'] * $p['harga'];
                        }
                    }
                }
            }
        }

        return [
            'booking_aktif'            => count($bookings),
            'keberangkatan_minggu_ini' => $keberangkatanMingguIni,
            'seat_terisi'              => $seatTerisi,
            'omzet'                    => $omzet,
            'omzet_rp'                 => self::rp($omzet),
        ];
    }

    /** Jumlah booking per paket untuk bar chart. */
    public static function bookingPerPaket(): array
    {
        $keberangkatan = [];
        foreach (self::keberangkatanRows() as $k) {
            $keberangkatan[$k['id']] = $k['paket_id'];
        }
        $labels = [];
        $data   = [];
        foreach (self::paketRows() as $p) {
            $labels[] = $p['nama'];
            $data[]   = count(array_filter(
                self::bookingRows(),
                fn ($b) => $keberangkatan[$b['keberangkatan_id']] === $p['id']
            ));
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Booking', 'data' => $data]],
        ];
    }

    /** Distribusi status pembayaran untuk donut chart. */
    public static function distribusiBayar(): array
    {
        $keys = ['lunas' => 'Lunas', 'dp' => 'DP 50%', 'belum' => 'Belum Bayar'];
        $labels = [];
        $data   = [];
        foreach ($keys as $key => $label) {
            $labels[] = $label;
            $data[]   = count(array_filter(self::bookingRows(), fn ($b) => $b['status_bayar'] === $key));
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Booking', 'data' => $data]],
        ];
    }

    /** Omzet (juta Rp) dari booking lunas per paket untuk bar chart. */
    public static function omzetPerPaket(): array
    {
        $keberangkatan = [];
        foreach (self::keberangkatanRows() as $k) {
            $keberangkatan[$k['id']] = $k['paket_id'];
        }
        $labels = [];
        $data   = [];
        foreach (self::paketRows() as $p) {
            $total = 0;
            foreach (self::bookingRows() as $b) {
                if ($keberangkatan[$b['keberangkatan_id']] === $p['id'] && $b['status_bayar'] === 'lunas') {
                    $total += $b['seat'] * $p['harga'];
                }
            }
            $labels[] = $p['nama'];
            $data[]   = self::jt($total);
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Omzet (juta Rp)', 'data' => $data]],
        ];
    }

    /** Booking per bulan untuk area chart. */
    public static function bookingPerBulan(): array
    {
        return [
            'labels'   => ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [['label' => 'Booking', 'data' => [18, 24, 31, 27, 35, 29]]],
        ];
    }
}
