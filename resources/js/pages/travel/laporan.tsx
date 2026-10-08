import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Armchair, Plane, Ticket, Wallet } from 'lucide-react';

interface Agen {
    id: number;
    nama: string;
    kota: string;
    penjualan: number;
    komisi_rp: string;
}

interface Ringkasan {
    booking_aktif: number;
    keberangkatan_minggu_ini: number;
    seat_terisi: number;
    omzet_rp: string;
}

export default function TravelLaporan({
    ringkasan,
    perPaket,
    distribusi,
    omzet,
    perBulan,
    agens,
}: {
    ringkasan: Ringkasan;
    perPaket: ChartData;
    distribusi: ChartData;
    omzet: ChartData;
    perBulan: ChartData;
    agens: Record<string, any>[];
}) {
    const rows: Agen[] = agens.map((a) => ({
        id: Number(a.id),
        nama: String(a.nama),
        kota: String(a.kota),
        penjualan: Number(a.penjualan),
        komisi_rp: String(a.komisi_rp),
    }));

    const columns: Column<Agen>[] = [
        { key: 'nama', header: 'Agen', sortValue: (r) => r.nama },
        { key: 'kota', header: 'Kota', mobileHidden: true, sortValue: (r) => r.kota },
        {
            key: 'penjualan',
            header: 'Penjualan',
            render: (r) => <span className="tnum font-medium">{r.penjualan} booking</span>,
            sortValue: (r) => r.penjualan,
        },
        {
            key: 'komisi_rp',
            header: 'Komisi',
            render: (r) => <span className="tnum font-medium">{r.komisi_rp}</span>,
            sortValue: (r) => r.komisi_rp,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description="Analisis booking, omzet, dan performa agen travel."
                breadcrumbs={[{ label: 'Travel', href: '/travel' }, { label: 'Laporan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Booking Aktif" value={String(ringkasan.booking_aktif)} delta="semua status bayar" trend="up" icon={Ticket} hint="Booking yang belum berangkat." />
                <StatCard label="Berangkat Minggu Ini" value={String(ringkasan.keberangkatan_minggu_ini)} delta="jadwal 7 hari ke depan" trend="flat" icon={Plane} hint="Jadwal yang perlu disiapkan minggu ini." />
                <StatCard label="Seat Terisi" value={String(ringkasan.seat_terisi)} delta="dari semua jadwal" trend="up" icon={Armchair} hint="Kursi terisi di semua jadwal aktif." />
                <StatCard label="Omzet" value={ringkasan.omzet_rp} delta="dari booking lunas" trend="up" icon={Wallet} hint="Pendapatan dari booking lunas." />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Booking per Bulan</CardTitle>
                        <p className="text-muted-foreground text-sm">Tren booking enam bulan terakhir.</p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={perBulan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Booking per Paket</CardTitle>
                        <p className="text-muted-foreground text-sm">Paket yang paling banyak dipesan.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={perPaket} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Status Pembayaran</CardTitle>
                        <p className="text-muted-foreground text-sm">Proporsi status bayar booking.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={distribusi} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Omzet per Paket</CardTitle>
                        <p className="text-muted-foreground text-sm">Omzet booking lunas dalam juta rupiah.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={omzet} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['nama', 'kota']}
                    emptyTitle="Belum ada data agen"
                    emptyDescription="Data performa agen akan tampil di sini."
                />
            </div>
        </AuthenticatedLayout>
    );
}
