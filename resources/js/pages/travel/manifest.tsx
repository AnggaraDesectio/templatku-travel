import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Users } from 'lucide-react';

interface Penumpang {
    id: number;
    kode: string;
    pelanggan: string;
    seat: number;
    agen: string;
    status_bayar: ToneLabel;
}

interface ManifestItem {
    id: number;
    paket: string;
    destinasi: string;
    tgl: string;
    kuota_teks: string;
    jumlah_penumpang: number;
    penumpang: Record<string, any>[];
}

export default function TravelManifest({ manifest }: { manifest: ManifestItem[] }) {
    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Manifest"
                description="Daftar penumpang per keberangkatan, merujuk booking yang tercatat."
                breadcrumbs={[{ label: 'Travel', href: '/travel' }, { label: 'Manifest' }]}
            />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {manifest.map((m) => {
                    const penumpang: Penumpang[] = m.penumpang.map((p) => ({
                        id: Number(p.id),
                        kode: String(p.kode),
                        pelanggan: String(p.pelanggan),
                        seat: Number(p.seat),
                        agen: String(p.agen),
                        status_bayar: p.status_bayar as ToneLabel,
                    }));
                    return (
                        <Card key={m.id} className="shadow-sm">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <CardTitle className="text-base">{m.paket}</CardTitle>
                                        <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                                            <CalendarDays className="h-3.5 w-3.5" />
                                            {m.tgl} · {m.destinasi} · {m.kuota_teks}
                                        </p>
                                    </div>
                                    <span className="bg-primary/10 text-primary flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold">
                                        <Users className="h-3.5 w-3.5" />
                                        {m.jumlah_penumpang} penumpang
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {penumpang.length === 0 ? (
                                    <p className="text-muted-foreground py-4 text-center text-sm">
                                        Belum ada penumpang tercatat untuk keberangkatan ini.
                                    </p>
                                ) : (
                                    <ul className="divide-border divide-y rounded-lg border">
                                        {penumpang.map((p) => (
                                            <li key={p.id} className="flex items-center gap-3 px-3 py-2.5">
                                                <span className="text-muted-foreground w-24 shrink-0 font-mono text-xs">
                                                    {p.kode}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium">{p.pelanggan}</p>
                                                    <p className="text-muted-foreground truncate text-xs">
                                                        {p.seat} seat · via {p.agen}
                                                    </p>
                                                </div>
                                                <ToneBadge label={p.status_bayar.label} tone={p.status_bayar.tone} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}
