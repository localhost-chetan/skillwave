import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { sendPasswordResetOtp } from "@/redux/slices/authSlice";

const resetPasswordSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

const ResetPasswordDialog = ({ open, setOpen, setPhoneNumber, setShowOTPDialog }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = async (data) => {
    try {
    //   await dispatch(sendPasswordResetOtp(data.phoneNumber)).unwrap();
      setPhoneNumber(data.phoneNumber);
      setOpen(false);
      setShowOTPDialog(true);
      toast.success("Success", { description: "OTP sent to your phone!" });
    } catch (error) {
      toast.error("Error", { description: error || "Failed to send OTP" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] max-w-2xl no-scrollbar">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 10-digit phone number" className="h-8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-8">
              Send OTP
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordDialog;