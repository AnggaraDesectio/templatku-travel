<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\TravelData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman Travel & Agen Tiket (Inertia). */
class TravelController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('travel/index', [
            'ringkasan'      => TravelData::ringkasan(),
            'chart'          => TravelData::bookingPerPaket(),
            'keberangkatans' => array_slice(TravelData::keberangkatans(), 0, 6),
        ]);
    }

    public function paket(): Response
    {
        return Inertia::render('travel/paket', [
            'pakets' => TravelData::pakets(),
        ]);
    }

    public function booking(): Response
    {
        return Inertia::render('travel/booking', [
            'bookings' => TravelData::bookings(),
        ]);
    }

    public function manifest(): Response
    {
        return Inertia::render('travel/manifest', [
            'manifest' => TravelData::manifest(),
        ]);
    }

    public function agen(): Response
    {
        return Inertia::render('travel/agen', [
            'agens' => TravelData::agens(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('travel/laporan', [
            'ringkasan'  => TravelData::ringkasan(),
            'perPaket'   => TravelData::bookingPerPaket(),
            'distribusi' => TravelData::distribusiBayar(),
            'omzet'      => TravelData::omzetPerPaket(),
            'perBulan'   => TravelData::bookingPerBulan(),
            'agens'      => array_slice(TravelData::agens(), 0, 5),
        ]);
    }
}
