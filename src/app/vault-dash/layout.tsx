import SideNav from '@/app/ui/dashboard/sidenav';
import '@/scss/vault-dash.scss';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="app">
        <img src="/assets/logo.png" />
        <div id="nav">
            <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}