export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-6 opacity-40">📂</div>
      <h3 className="font-condensed font-bold text-2xl tracking-widest text-white/60 uppercase mb-3">
        No Files Yet
      </h3>
      <p className="font-body text-white/40 max-w-xs">
        This category is empty. Upload your first file to get started.
      </p>
    </div>
  )
}
