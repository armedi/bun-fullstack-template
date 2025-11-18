import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="space-y-4">
      <p className="text-slate-600">
        This is a template for fullstack app with Bun.
      </p>
    </div>
  );
}
