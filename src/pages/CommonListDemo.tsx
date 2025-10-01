import { useMemo, useState } from "react";
import CommonList, { ColumnDef, SortDirection } from "@/components/commonlist";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";

type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

const seed: Item[] = Array.from({ length: 57 }).map((_, i) => ({
  id: `item-${i + 1}`,
  name: `Sample Item ${i + 1}`,
  category: ["Water", "Equipment", "Subscription"][i % 3],
  price: Math.round(((i + 1) * 1.23) % 100 * 100) / 100,
  stock: (i * 7) % 25,
}));

export default function CommonListDemo() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selected, setSelected] = useState<string[]>([]);

  const columns: ColumnDef<Item>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "category", header: "Category", sortable: true },
    { key: "price", header: "Price", sortable: true, render: (r) => `$${r.price.toFixed(2)}` },
    { key: "stock", header: "Stock", sortable: true },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let next = seed.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        String(r.price).includes(q) ||
        String(r.stock).includes(q),
    );
    next.sort((a, b) => {
      const va = (a as any)[sortKey];
      const vb = (b as any)[sortKey];
      if (va === vb) return 0;
      if (sortDir === "asc") return va > vb ? 1 : -1;
      return va < vb ? 1 : -1;
    });
    return next;
  }, [query, sortKey, sortDir]);

  const total = filtered.length;
  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <AdminLayout>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Common List Demo</CardTitle>
          <CardDescription>A reusable list scaffold with search, sorting, selection, and pagination.</CardDescription>
        </CardHeader>
        <CardContent>
          <CommonList
            title="Inventory"
            description="Demo dataset"
            rows={pageRows}
            columns={columns}
            getRowId={(r) => r.id}
            // selection
            selectable
            onSelectionChange={setSelected}
            // search
            enableSearch
            searchValue={query}
            onSearchChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            // sorting
            sortKey={sortKey}
            sortDirection={sortDir}
            onSortChange={(k, d) => {
              setSortKey(k);
              setSortDir(d);
              setPage(1);
            }}
            // pagination
            totalItems={total}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            // toolbar actions
            renderToolbarActions={({ selectedIds, clearSelection }) => (
              <div className="flex gap-2">
                <Button variant="outline" disabled={selectedIds.length === 0} onClick={clearSelection}>
                  Clear Selection ({selectedIds.length})
                </Button>
              </div>
            )}
            // per-row actions
            renderRowActions={(row) => (
              <Button size="sm" variant="outline" onClick={() => alert(`Edit ${row.name}`)}>
                Edit
              </Button>
            )}
          />
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}


