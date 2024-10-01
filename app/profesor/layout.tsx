import SideNav from "../ui/profesor/sidenav";
export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      <SideNav />
    </div>
  );
}