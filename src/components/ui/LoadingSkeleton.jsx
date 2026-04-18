export default function LoadingSkeleton({ type = 'card', count = 1 }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === 'card') {
    return (
      <>
        {skeletons.map((i) => (
          <div key={i} className="card overflow-hidden">
            <div className="skeleton h-64 w-full" />
            <div className="p-5 space-y-3">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="flex justify-between items-center mt-4">
                <div className="skeleton h-6 w-20" />
                <div className="skeleton h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'detail') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        <div className="skeleton h-96 w-full rounded-2xl" />
        <div className="space-y-4">
          <div className="skeleton h-8 w-3/4" />
          <div className="skeleton h-4 w-1/4" />
          <div className="skeleton h-6 w-1/3 mt-4" />
          <div className="skeleton h-20 w-full mt-4" />
          <div className="skeleton h-12 w-40 mt-6 rounded-xl" />
        </div>
      </div>
    );
  }

  if (type === 'line') {
    return (
      <div className="space-y-3">
        {skeletons.map((i) => (
          <div key={i} className="skeleton h-4 w-full" />
        ))}
      </div>
    );
  }

  return null;
}
