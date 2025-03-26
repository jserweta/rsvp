"use client";

import { Button } from "@/components/ui/button";
import { MdAutoFixHigh } from "react-icons/md";
import { FiZap } from "react-icons/fi";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import generateQrCodes from "@/lib/actions/generateQrCodes";
import assignQrCodeToInvitation from "@/lib/actions/assignQrCodeToInvitation";
import { useTransition } from "react";
import { toast } from "sonner";
import addSingleQrCode from "@/lib/actions/addSingleQrCode";
import { toastActionStatus } from "@/lib/utils/toastActionStatus";

export default function QRCodesTableActions() {
  const [, startTransition] = useTransition();

  const handleAutoAssign = () => {
    startTransition(async () => {
      toast.promise(assignQrCodeToInvitation(), {
        loading: "Assigning QR codes, please wait...",
        success: (data) => data.message,
        error: (data) => data.message,
      });
    });
  };

  const handleQrCodeGeneration = () => {
    startTransition(async () => {
      toast.promise(generateQrCodes(), {
        loading: "Generating QR codes, please wait...",
        success: (data) => data.message,
        error: (message) => message,
      });
    });
  };

  const handleSingleQrCodeAdd = async () => {
    const actionStatus = await addSingleQrCode();
    toastActionStatus(actionStatus);
  };

  return (
    <DropdownMenu>
      <Button asChild variant="outline" size="icon">
        <DropdownMenuTrigger>
          <HiOutlineDotsVertical />
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={handleSingleQrCodeAdd}
        >
          <HiOutlinePlusCircle />
          Add token
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            Bulk actions
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onSelect={handleQrCodeGeneration}
            >
              <FiZap />
              Generate codes
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onSelect={handleAutoAssign}
            >
              <MdAutoFixHigh />
              Auto assign
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
