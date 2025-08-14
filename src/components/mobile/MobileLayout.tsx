import { Outlet } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';

const MobileLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pb-24">
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
};

export default MobileLayout;