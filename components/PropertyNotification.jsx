"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const PropertyNotification = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("success");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "true") {
        toast.success("Property added successfully!");
      } else if (status === "false") {
        toast.error("Failed to add property!");
      }
    }, 100); // 100ms gecikme ekleyerek çift çalışmasını engelliyoruz

    return () => clearTimeout(timer); // Cleanup
  }, [status]);

  return null;
};

export default PropertyNotification;
