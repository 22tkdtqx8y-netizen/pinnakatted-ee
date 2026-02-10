export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" aria-hidden>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand" />
    </div>
  );
}
