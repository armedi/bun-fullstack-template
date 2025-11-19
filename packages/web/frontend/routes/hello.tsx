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

  let message = "";
  if (isLoading) {
    message = "Loading...";
  } else if (isError) {
    message = "Failed to fetch hello";
  } else {
    message = data?.message ?? "No message returned";
  }

  return <p className="text-slate-600">{message}</p>;
}
