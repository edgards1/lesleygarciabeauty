"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LightboxDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: "image" | "video";
  src: string;
}

export function LightboxDialog({
  isOpen,
  onOpenChange,
  title,
  type,
  src,
}: LightboxDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
        <div className="relative w-full overflow-hidden rounded-3xl bg-black">
          {type === "image" ? (
            <img
              src={src}
              alt={title}
              className="h-full w-full object-contain"
            />
          ) : (
            <video
              src={src}
              controls
              className="h-full w-full object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
