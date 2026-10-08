import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
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
import { toast } from 'sonner';

interface Paket {
    id: number;
    nama: string;
    durasi: string;
    destinasi: string;
    harga_rp: string;
    jadwal_keberangkatan: number;
    seat_terisi: number;
    gambar?: string;
}

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function TravelPaket({ pakets }: { pakets: Record<string, any>[] }) {
    const [rows, setRows] = useState<Paket[]>(
        pakets.map((p) => ({
            id: Number(p.id),
            nama: String(p.nama),
            durasi: String(p.durasi),
            destinasi: String(p.destinasi),
            harga_rp: String(p.harga_rp),
            jadwal_keberangkatan: Number(p.jadwal_keberangkatan),
            seat_terisi: Number(p.seat_terisi),
            gambar: p.gambar ? String(p.gambar) : undefined,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Paket | null>(null);
    const [nama, setNama] = useState('');
    const [durasi, setDurasi] = useState('');
    const [destinasi, setDestinasi] = useState('');
    const [harga, setHarga] = useState('');

    const openAdd = () => {
        setEditing(null);
        setNama('');
        setDurasi('');
        setDestinasi('');
        setHarga('');
        setOpen(true);
    };

    const openEdit = (row: Paket) => {
        setEditing(row);
        setNama(row.nama);
        setDurasi(row.durasi);
        setDestinasi(row.destinasi);
        setHarga(row.harga_rp.replace(/[^0-9]/g, ''));
        setOpen(true);
    };

    const simpan = () => {
        const hargaNum = Number(harga.replace(/[^0-9]/g, ''));
        if (!nama.trim() || !hargaNum) {
            toast.error('Lengkapi nama paket dan harga.');
            return;
        }
        const payload = {
            nama: nama.trim(),
            durasi: durasi.trim() || '-',
            destinasi: destinasi.trim() || '-',
            harga_rp: rupiah(hargaNum),
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success(`Paket "${nama.trim()}" diperbarui.`);
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            setRows((rs) => [{ id, jadwal_keberangkatan: 0, seat_terisi: 0, ...payload }, ...rs]);
            toast.success(`Paket "${nama.trim()}" siap dijual.`);
        }
        setOpen(false);
    };

    const columns: Column<Paket>[] = [
        {
            key: 'gambar',
            header: '',
            render: (r) =>
                r.gambar ? (
                    <img
                        src={r.gambar}
                        alt={r.nama}
                        className="h-10 w-14 rounded-md object-cover"
                        loading="lazy"
                    />
                ) : (
                    <span className="text-muted-foreground text-xs">-</span>
                ),
        },
        { key: 'nama', header: 'Paket Wisata', sortValue: (r) => r.nama },
        { key: 'durasi', header: 'Durasi', mobileHidden: true, sortValue: (r) => r.durasi },
        { key: 'destinasi', header: 'Destinasi', sortValue: (r) => r.destinasi },
        {
            key: 'harga_rp',
            header: 'Harga',
            render: (r) => <span className="tnum font-medium">{r.harga_rp}</span>,
            sortValue: (r) => r.harga_rp,
        },
        {
            key: 'jadwal_keberangkatan',
            header: 'Jadwal',
            render: (r) => <span className="tnum font-medium">{r.jadwal_keberangkatan}x</span>,
            sortValue: (r) => r.jadwal_keberangkatan,
        },
        {
            key: 'seat_terisi',
            header: 'Seat Terisi',
            render: (r) => <span className="tnum font-medium">{r.seat_terisi}</span>,
            sortValue: (r) => r.seat_terisi,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Paket Wisata"
                description="Katalog paket wisata: Bali 3D2N, Bromo open trip, hingga Raja Ampat."
                breadcrumbs={[{ label: 'Travel', href: '/travel' }, { label: 'Paket Wisata' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Paket
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Paket</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'destinasi']}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada paket"
                        emptyDescription="Paket wisata akan tampil di sini setelah ditambahkan."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Paket' : 'Tambah Paket Wisata'}</DialogTitle>
                        <DialogDescription>
                            Tentukan nama paket, durasi, destinasi, dan harga jualnya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="tp-nama">Nama paket</Label>
                            <Input
                                id="tp-nama"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="cth. Bali 3D2N"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tp-durasi">Durasi</Label>
                                <Input
                                    id="tp-durasi"
                                    value={durasi}
                                    onChange={(e) => setDurasi(e.target.value)}
                                    placeholder="cth. 3 hari 2 malam"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tp-harga">Harga (Rp)</Label>
                                <Input
                                    id="tp-harga"
                                    inputMode="numeric"
                                    value={harga}
                                    onChange={(e) => setHarga(e.target.value)}
                                    placeholder="3500000"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tp-dest">Destinasi</Label>
                            <Input
                                id="tp-dest"
                                value={destinasi}
                                onChange={(e) => setDestinasi(e.target.value)}
                                placeholder="cth. Bali, Kuta, Ubud, Nusa Penida"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Tambah Paket'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
