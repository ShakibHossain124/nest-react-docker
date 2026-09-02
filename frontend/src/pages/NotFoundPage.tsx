export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="soft-card max-w-md px-8 py-12 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          Page not found
        </h1>
        <p className="mt-3 text-slate-600">
          The page you’re looking for doesn’t exist or has moved.
        </p>
      </div>
    </div>
  );
}