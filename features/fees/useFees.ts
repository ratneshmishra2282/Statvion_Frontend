import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collectFee, getReceipt } from "./fee.api";
import toast from "react-hot-toast";

export function useCollectFee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collectFee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Fee collected successfully! Receipt generated.");
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "Failed to collect fee. Please try again."
      );
    },
  });
}

export function useReceipt(id: string) {
  return useQuery({
    queryKey: ["receipts", id],
    queryFn: () => getReceipt(id),
    enabled: !!id,
  });
}
