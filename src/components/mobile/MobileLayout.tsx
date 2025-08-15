import { Outlet } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';
import { Suspense } from 'react';
import SkeletonCard from '@/components/SkeletonCard';

const MobileLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pb-24">
        <Suspense fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default MobileLayout;