"use client";

import { toast } from "sonner";
import { ActionStatus } from "../definitions";

export default function useToastAction(state: ActionStatus) {
  switch (state.type) {
    case "success":
      toast.success(state.message);
      break;
    case "error":
      toast.error(state.message);
      break;
    case "info":
      toast.info(state.message);
      break;
  }
}
