import SideNav from "../ui/alumno/sidenav";

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      <SideNav />
    </div>
  );
}