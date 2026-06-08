export default function FilterBar({ filters, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search files..."
          value={filters.search}
          onChange={e => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-body text-white placeholder-white/30 outline-none focus:ring-1 focus:ring-ford-accent/50 transition-all"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        />
      </div>
      {/* Sort */}
      <select
        value={filters.sort}
        onChange={e => onChange({ ...filters, sort: e.target.value })}
        className="px-4 py-2.5 rounded-xl text-sm font-body text-white outline-none focus:ring-1 focus:ring-ford-accent/50"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
        <option value="largest">Largest</option>
        <option value="smallest">Smallest</option>
      </select>
      {/* Type filter */}
      <select
        value={filters.type}
        onChange={e => onChange({ ...filters, type: e.target.value })}
        className="px-4 py-2.5 rounded-xl text-sm font-body text-white outline-none focus:ring-1 focus:ring-ford-accent/50"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <option value="all">All Types</option>
        <option value="CSV">CSV</option>
        <option value="XLSX">XLSX</option>
      </select>
    </div>
  )
}
