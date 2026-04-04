"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import { updateUserName } from "@/lib/actions/user-account";
import { useTransition } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export default function ChangeNameDialog({ originalName }: { originalName: string }) {
  const [name, setName] = useState(originalName);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm<{ newName: string }>({
    resolver: zodResolver(z.object({
      newName: z.string().trim().min(1, "Tên không được để trống").max(50, "Tên quá dài"),
    })),
    defaultValues: { newName: originalName },
  });

  const onSubmit = ({ newName }: { newName: string }) => {
    const previousName = name;

    // Optimistically update UI
    setName(newName);
    setOpen(false);

    startTransition(async () => {
      try {
        const res = await updateUserName(newName);
        if (!res.success) {
          // rollback on failure
          setName(previousName);
          toast.error(res.error);
          return;
        }

        toast.success("Cập nhật tên thành công");
      } catch {
        // rollback on network/unexpected errors
        setName(previousName);
        toast.error("Cập nhật tên thất bại. Vui lòng thử lại.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <li>
          <div
           className="group flex items-center justify-between w-full rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent/5 cursor-pointer"
           role="group"
           >
            <div className="flex flex-col">
              <span className="text-sm font-medium">Họ và tên người dùng</span>
              <span className="text-sm text-muted-foreground">{name}</span>
            </div>
            <PencilIcon className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1" />
          </div>
        </li>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thay đổi tên người dùng</DialogTitle>
          <DialogDescription>Cập nhật tên của bạn ở dưới đây.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("newName", { required: true })}
            placeholder="Nhập tên mới"
          />
          {errors.newName && (
            <p className="text-sm text-red-500">{errors.newName.message}</p>
          )}

          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)} disabled={isPending}>
              Huỷ
            </Button>
            <Button type="submit" variant="default" size="sm" disabled={isPending}>
              {isPending ? "Đang lưu..." : "Lưu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}