import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Booking {
    id: number;
    kode: string;
    pelanggan: string;
    paket: string;
    tgl_berangkat: string;
    seat: number;
    agen: string;
    total_rp: string;
    status_bayar: ToneLabel;
}

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const bayarTone = (s: string): ToneLabel['tone'] =>
    s === 'Lunas' ? 'success' : s === 'Belum Bayar' ? 'destructive' : 'warning';

const BAYAR = ['Belum Bayar', 'DP 50%', 'Lunas'];

export default function TravelBooking({ bookings }: { bookings: Record<string, any>[] }) {
    const [rows, setRows] = useState<Booking[]>(
        bookings.map((b) => ({
            id: Number(b.id),
            kode: String(b.kode),
            pelanggan: String(b.pelanggan),
            paket: String(b.paket),
            tgl_berangkat: String(b.tgl_berangkat),
            seat: Number(b.seat),
            agen: String(b.agen),
            total_rp: String(b.total_rp),
            status_bayar: b.status_bayar as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Booking | null>(null);
    const [pelanggan, setPelanggan] = useState('');
    const [paket, setPaket] = useState('');
    const [tgl, setTgl] = useState('');
    const [seat, setSeat] = useState('1');
    const [agen, setAgen] = useState('');
    const [total, setTotal] = useState('');
    const [bayar, setBayar] = useState('Belum Bayar');

    const paketOpts = Array.from(new Set(rows.map((r) => r.paket)));

    const openAdd = () => {
        setEditing(null);
        setPelanggan('');
        setPaket(paketOpts[0] ?? '');
        setTgl('');
        setSeat('1');
        setAgen('');
        setTotal('');
        setBayar('Belum Bayar');
        setOpen(true);
    };

    const openEdit = (row: Booking) => {
        setEditing(row);
        setPelanggan(row.pelanggan);
        setPaket(row.paket);
        setTgl(row.tgl_berangkat);
        setSeat(String(row.seat));
        setAgen(row.agen);
        setTotal(row.total_rp.replace(/[^0-9]/g, ''));
        setBayar(row.status_bayar.label);
        setOpen(true);
    };

    const simpan = () => {
        const totalNum = Number(total.replace(/[^0-9]/g, ''));
        if (!pelanggan.trim() || !paket.trim() || !tgl.trim()) {
            toast.error('Lengkapi pelanggan, paket, dan tanggal berangkat.');
            return;
        }
        const payload = {
            pelanggan: pelanggan.trim(),
            paket: paket.trim(),
            tgl_berangkat: tgl.trim(),
            seat: Math.max(1, Number(seat) || 1),
            agen: agen.trim() || 'Langsung',
            total_rp: totalNum ? rupiah(totalNum) : 'Rp 0',
            status_bayar: { label: bayar, tone: bayarTone(bayar) } as ToneLabel,
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success(`Booking ${editing.kode} diperbarui.`);
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            const kode = `BKG-${String(id).padStart(4, '0')}`;
            setRows((rs) => [{ id, kode, ...payload }, ...rs]);
            toast.success(`${kode} dibuat, ${seat} seat untuk ${pelanggan.trim()}.`);
        }
        setOpen(false);
    };

    const columns: Column<Booking>[] = [
        { key: 'kode', header: 'Kode', sortValue: (r) => r.kode },
        { key: 'pelanggan', header: 'Pelanggan', sortValue: (r) => r.pelanggan },
        { key: 'paket', header: 'Paket', sortValue: (r) => r.paket },
        { key: 'tgl_berangkat', header: 'Berangkat', sortValue: (r) => r.tgl_berangkat },
        {
            key: 'seat',
            header: 'Seat',
            render: (r) => <span className="tnum font-medium">{r.seat}</span>,
            sortValue: (r) => r.seat,
        },
        { key: 'agen', header: 'Agen', mobileHidden: true, sortValue: (r) => r.agen },
        {
            key: 'total_rp',
            header: 'Total',
            render: (r) => <span className="tnum font-medium">{r.total_rp}</span>,
            sortValue: (r) => r.total_rp,
        },
        {
            key: 'status_bayar',
            header: 'Pembayaran',
            render: (r) => <ToneBadge label={r.status_bayar.label} tone={r.status_bayar.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status_bayar',
            label: 'Pembayaran',
            options: [
                { value: 'Lunas', label: 'Lunas' },
                { value: 'DP 50%', label: 'DP 50%' },
                { value: 'Belum Bayar', label: 'Belum Bayar' },
            ],
            match: (row: any, value: string) => row.status_bayar.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Booking"
                description="Siapa berangkat kapan, catat booking agar seat tidak overbook."
                breadcrumbs={[{ label: 'Travel', href: '/travel' }, { label: 'Booking' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Booking
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Booking</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['kode', 'pelanggan', 'paket', 'agen']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada booking"
                        emptyDescription="Catat booking pertama lewat tombol Tambah Booking, kode booking dibuat otomatis."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Booking' : 'Booking Baru'}</DialogTitle>
                        <DialogDescription>
                            Catat pemesanan seat beserta status pembayarannya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                            <Label htmlFor="trv-nama">Nama pelanggan</Label>
                            <Input
                                id="trv-nama"
                                value={pelanggan}
                                onChange={(e) => setPelanggan(e.target.value)}
                                placeholder="cth. Keluarga Santoso"
                            />
                        </div>
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                            <Label htmlFor="trv-paket">Paket</Label>
                            <Select value={paket} onValueChange={setPaket}>
                                <SelectTrigger id="trv-paket">
                                    <SelectValue placeholder="Pilih paket" />
                                </SelectTrigger>
                                <SelectContent>
                                    {paketOpts.map((pk) => (
                                        <SelectItem key={pk} value={pk}>
                                            {pk}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="trv-tgl">Tanggal berangkat</Label>
                            <Input
                                id="trv-tgl"
                                type="date"
                                value={tgl}
                                onChange={(e) => setTgl(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="trv-seat">Jumlah seat</Label>
                            <Input
                                id="trv-seat"
                                inputMode="numeric"
                                value={seat}
                                onChange={(e) => setSeat(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="trv-agen">Agen</Label>
                            <Input
                                id="trv-agen"
                                value={agen}
                                onChange={(e) => setAgen(e.target.value)}
                                placeholder="Kosongkan bila langsung"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="trv-total">Total (Rp)</Label>
                            <Input
                                id="trv-total"
                                inputMode="numeric"
                                value={total}
                                onChange={(e) => setTotal(e.target.value)}
                                placeholder="2500000"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="trv-bayar">Status pembayaran</Label>
                            <Select value={bayar} onValueChange={setBayar}>
                                <SelectTrigger id="trv-bayar">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {BAYAR.map((b) => (
                                        <SelectItem key={b} value={b}>
                                            {b}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Buat Booking'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
