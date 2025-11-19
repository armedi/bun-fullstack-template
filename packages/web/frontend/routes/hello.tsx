import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { apiClient } from "../lib/apiClient";

export const Route = createFileRoute("/hello")({
  component: HelloPage,
});

function HelloPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const result = await apiClient.api.hello.get();
      return result?.data;
    },
  });

  if (isLoading) {
    return <p className="text-slate-600">Loading...</p>;
  }

  if (isError) {
    return <p className="text-slate-600">Failed to fetch hello</p>;
  }

  return <p className="text-slate-600">{data?.message ?? "No message returned"}</p>;
}
