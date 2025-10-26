import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { verifyOtp } from "@/redux/slices/authSlice";

export const OTPDialog = ({ open, onOpenChange, phoneNumber }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Invalid OTP", { description: "Please enter a 6-digit code" });
      return;
    }

    try {
      await dispatch(verifyOtp({ phone: phoneNumber, otp })).unwrap();
      toast.success("Success!", { description: "Your account has been verified" });
      onOpenChange(false);
      setOtp("");
    } catch (error) {
      toast.error("Error", { description: error || "OTP verification failed" });
    }
  };

  return (
   <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Verify Your Phone</DialogTitle>
          <DialogDescription className="text-base">
            We've sent a verification code to <span className="font-medium text-foreground">{phoneNumber}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-8 py-6">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="h-14 w-14 text-lg" />
              <InputOTPSlot index={1} className="h-14 w-14 text-lg" />
              <InputOTPSlot index={2} className="h-14 w-14 text-lg" />
              <InputOTPSlot index={3} className="h-14 w-14 text-lg" />
              <InputOTPSlot index={4} className="h-14 w-14 text-lg" />
              <InputOTPSlot index={5} className="h-14 w-14 text-lg" />
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={handleVerify} className="w-full h-12 text-base font-medium" size="lg">
            Verify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};