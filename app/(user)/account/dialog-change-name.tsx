// TODO: read check log
'use client';
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

export default function ChangeNameDialog({ originalName }: { originalName: string }) {
  const [name, setName] = useState(originalName);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm<{ name: string }>({
    defaultValues: { name: originalName },
  });

  const onSubmit = (data: { name: string }) => {
    const newName = data.name.trim();
    if (!newName) {
      toast.error("Name cannot be empty");
      return;
    }

    const previousName = name;
    // Optimistically update UI
    setName(newName);
    setOpen(false);

    // Perform async update in a transition
    startTransition(async () => {
      try {
        const res = await updateUserName(newName);
        if (!res.success) {
          setName(previousName);
          toast.error(res.error);
          return;
        }

        toast.success("Name updated");
      } catch (err) { // Network/unexpected errors
        setName(previousName);
        toast.error("Failed to update name");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <li>
          <div
           className="group flex items-center justify-between w-full rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent/5"
           role="group"
           >
            <div className="flex flex-col">
              <span className="text-sm font-medium">Full name</span>
              <span className="text-sm text-muted-foreground">{name}</span>
            </div>
            <PencilIcon className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1" />
          </div>
        </li>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Full Name</DialogTitle>
          <DialogDescription>Update your full name below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("name", { required: true })}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-sm text-red-500">Name is required</p>
          )}

          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}