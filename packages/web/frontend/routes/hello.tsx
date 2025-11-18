import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";

export const Route = createFileRoute("/hello")({
  component: HelloPage,
});

function HelloPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchHello() {
      try {
        const result = await apiClient.api.hello.get();
        setMessage(result?.data?.message ?? "No message returned");
      } catch {
        setMessage("Failed to fetch hello");
      }
    }
    fetchHello();
  }, []);

  return <p className="text-slate-600">{message ?? ""}</p>;
}
