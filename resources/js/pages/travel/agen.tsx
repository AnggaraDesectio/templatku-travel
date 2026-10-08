import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Agen {
    id: number;
    nama: string;
    kota: string;
    telepon: string;
    penjualan: number;
    seat: number;
    komisi_rp: string;
}

export default function TravelAgen({ agens }: { agens: Record<string, any>[] }) {
    const rows: Agen[] = agens.map((a) => ({
        id: Number(a.id),
        nama: String(a.nama),
        kota: String(a.kota),
        telepon: String(a.telepon),
        penjualan: Number(a.penjualan),
        seat: Number(a.seat),
        komisi_rp: String(a.komisi_rp),
    }));

    const columns: Column<Agen>[] = [
        {
            key: 'nama',
            header: 'Agen',
            render: (r) => (
                <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {r.nama.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{r.nama}</span>
                </div>
            ),
            sortValue: (r) => r.nama,
        },
        { key: 'kota', header: 'Kota', sortValue: (r) => r.kota },
        { key: 'telepon', header: 'Telepon', mobileHidden: true },
        {
            key: 'penjualan',
            header: 'Penjualan',
            render: (r) => <span className="tnum font-medium">{r.penjualan} booking</span>,
            sortValue: (r) => r.penjualan,
        },
        {
            key: 'seat',
            header: 'Seat Terjual',
            render: (r) => <span className="tnum font-medium">{r.seat}</span>,
            sortValue: (r) => r.seat,
        },
        {
            key: 'komisi_rp',
            header: 'Komisi (5%)',
            render: (r) => <span className="tnum font-medium">{r.komisi_rp}</span>,
            sortValue: (r) => r.komisi_rp,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Agen"
                description="Mitra agen penjual beserta penjualan dan komisi 5% yang diperoleh."
                breadcrumbs={[{ label: 'Travel', href: '/travel' }, { label: 'Agen' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Agen</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'kota']}
                        pageSize={10}
                        emptyTitle="Belum ada agen"
                        emptyDescription="Agen tercatat otomatis dari booking yang mereka bawa."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
