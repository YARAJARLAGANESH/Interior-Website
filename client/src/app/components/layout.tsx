import { Outlet } from 'react-router';
import { Navigation } from './navigation';
import { PageFooter } from './page-footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <PageFooter />
    </div>
  );
}
