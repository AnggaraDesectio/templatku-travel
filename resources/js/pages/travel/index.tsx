import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Armchair, Plane, Ticket, Wallet, TicketPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Keberangkatan {
    id: number;
    paket: string;
    tgl: string;
    kuota_teks: string;
    status: ToneLabel;
}

interface Ringkasan {
    booking_aktif: number;
    keberangkatan_minggu_ini: number;
    seat_terisi: number;
    omzet_rp: string;
}

export default function TravelIndex({
    ringkasan,
    chart,
    keberangkatans,
}: {
    ringkasan: Ringkasan;
    chart: ChartData;
    keberangkatans: Record<string, any>[];
}) {
    const rows: Keberangkatan[] = keberangkatans.map((k) => ({
        id: Number(k.id),
        paket: String(k.paket),
        tgl: String(k.tgl),
        kuota_teks: String(k.kuota_teks),
        status: k.status as ToneLabel,
    }));

    const columns: Column<Keberangkatan>[] = [
        { key: 'paket', header: 'Paket', sortValue: (r) => r.paket },
        { key: 'tgl', header: 'Berangkat', sortValue: (r) => r.tgl },
        { key: 'kuota_teks', header: 'Seat', sortValue: (r) => r.kuota_teks },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Dashboard"
                description="Ringkasan bisnis travel JALANKU: booking, keberangkatan, dan seat."
                breadcrumbs={[{ label: 'Travel' }]}
                actions={
                    <Button size="sm" asChild>
                        <Link href="/travel/booking">
                            <TicketPlus className="mr-2 h-4 w-4" /> Booking Baru
                        </Link>
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Booking Aktif"
                    value={String(ringkasan.booking_aktif)}
                    delta="semua status bayar"
                    trend="up"
                    icon={Ticket}
                    hint="Booking yang belum berangkat, apa pun status bayarnya."
                />
                <StatCard
                    label="Berangkat Minggu Ini"
                    value={String(ringkasan.keberangkatan_minggu_ini)}
                    delta="jadwal 7 hari ke depan"
                    trend="flat"
                    icon={Plane}
                    hint="Keberangkatan yang perlu disiapkan minggu ini."
                />
                <StatCard
                    label="Seat Terisi"
                    value={String(ringkasan.seat_terisi)}
                    delta="dari semua jadwal"
                    trend="up"
                    icon={Armchair}
                    hint="Kursi terisi vs total kursi di semua jadwal aktif."
                />
                <StatCard
                    label="Omzet"
                    value={ringkasan.omzet_rp}
                    delta="dari booking lunas"
                    trend="up"
                    icon={Wallet}
                    hint="Pendapatan dari booking yang sudah lunas."
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Booking per Paket</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Paket wisata yang paling banyak dipesan.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={chart} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Segera Berangkat</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Jadwal keberangkatan terdekat.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {rows.slice(0, 5).map((k) => (
                            <div key={k.id} className="flex items-center gap-3">
                                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                                    <Plane className="h-5 w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">{k.paket}</p>
                                    <p className="text-muted-foreground truncate text-xs">
                                        {k.tgl} · {k.kuota_teks}
                                    </p>
                                </div>
                                <ToneBadge label={k.status.label} tone={k.status.tone} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['paket', 'tgl']}
                    emptyTitle="Belum ada keberangkatan"
                    emptyDescription="Jadwal keberangkatan akan tampil di sini."
                />
            </div>
        </AuthenticatedLayout>
    );
}
