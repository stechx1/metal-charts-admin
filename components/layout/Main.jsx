import Sidebar from "../Sidebar";

export default function Main({ children }) {
  return (
    <section className="flex flex-row items-start min-h-screen">
      <Sidebar />
      {children}
    </section>
  );
}
