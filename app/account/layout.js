import SideNaVigation from "../_components/SideNavigation";
export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
      
       <SideNaVigation />
      

     <div> {children}</div>
    </div>
  );
}
