import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

const navigationItems = [
  {
    label: "Home",
    to: "/",
    exact: true,
  },
  {
    label: "Hello",
    to: "/hello",
  },
];

const baseNavLinkClasses =
  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900/30";

const activeNavLinkClasses =
  "underline decoration-2 decoration-slate-400 text-slate-900 font-semibold";

export const Route = createRootRoute({
  component: AppShell,
});

function AppShell() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-4 sm:px-8">
          <nav className="ml-6 flex items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${baseNavLinkClasses} inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-slate-600`}
                activeProps={{
                  className: `${baseNavLinkClasses} ${activeNavLinkClasses}`,
                }}
                {...(item.exact ? { activeOptions: { exact: true } } : {})}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex min-h-screen flex-col bg-slate-50 px-4 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>

      <TanStackDevtools
        config={{ position: "bottom-right" }}
        plugins={[
          { name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> },
        ]}
      />
    </>
  );
}
