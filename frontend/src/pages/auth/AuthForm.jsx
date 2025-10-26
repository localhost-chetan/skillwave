import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, Phone, User } from "lucide-react";
import { SchoolCombobox } from "@/components/common/SchoolCombobox";
import { OTPDialog } from "@/components/common/OTPDialog";
import { ValidationErrorDialog } from "@/components/common/ValidationErrorDialog";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import ImageUpload from "@/components/common/ImageUpload";
import { loginSchema, signupSchema, registerSchoolSchema } from "@/hooks/validators";
import { signup, sendOtp } from "@/redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import ErrorBoundaryWithToast from "@/components/common/ErrorBoundaryWithToast";

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "", phoneNumber: "", school: "", profilePhoto: null },
  });

  const registerSchoolForm = useForm({
    resolver: zodResolver(registerSchoolSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "", phoneNumber: "", school: "", profilePhoto: null, schoolLogo: null },
  });

  const showErrors = (errors) => {
    const errorMessages = Object.values(errors)
      .map((error) => error.message)
      .filter(Boolean);
    
    if (errorMessages.length > 0) {
      setValidationErrors(errorMessages);
      setShowErrorDialog(true);
    }
  };

  const handleLogin = async (data) => {
    try {
      // Simulate login success (replace with actual API call)
      toast.success("Login successful", { description: "Welcome back!" });
    } catch (error) {
      toast.error("Error", { description: "Login failed" });
    }
  };

  const handleSignup = async (data) => {
    try {
    //   await dispatch(signup(data)).unwrap();
    //   await dispatch(sendOtp(data.phoneNumber)).unwrap();
      setPhoneNumber(data.phoneNumber);
      setShowOTPDialog(true);
      toast.success("Success", { description: "OTP sent to your phone!" });
    } catch (error) {
      toast.error("Error", { description: error || "Signup failed" });
    }
  };

  const handleRegisterSchool = async (data) => {
    try {
    //   await dispatch(signup(data)).unwrap();
    //   await dispatch(sendOtp(data.phoneNumber)).unwrap();
      setPhoneNumber(data.phoneNumber);
      setShowOTPDialog(true);
      toast.success("Success", { description: "OTP sent for school registration!" });
    } catch (error) {
      toast.error("Error", { description: error || "School registration failed" });
    }
  };

  const onLoginError = (errors) => showErrors(errors);
  const onSignupError = (errors) => showErrors(errors);
  const onRegisterSchoolError = (errors) => showErrors(errors);

  return (
    <>
      <ErrorBoundaryWithToast>
        <ThemeToggle />
      </ErrorBoundaryWithToast>
       <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-2xl border-border/50 shadow-2xl">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-3xl font-bold tracking-tight">
              School Portal
            </CardTitle>
            <CardDescription className="text-base">Manage your school community</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 h-11">
                <TabsTrigger value="login" className="text-sm">Login</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
                <TabsTrigger value="register" className="text-sm">Register School</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={loginForm.handleSubmit(handleLogin, onLoginError)} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...loginForm.register("email")}
                        type="email"
                        placeholder="Email address"
                        className="pl-11 h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...loginForm.register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pl-11 pr-11 h-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-11 font-medium mt-6">
                    Login
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={signupForm.handleSubmit(handleSignup, onSignupError)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative col-span-2">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...signupForm.register("fullName")}
                        placeholder="Full name"
                        className="pl-11 h-11"
                      />
                    </div>
                    <div className="relative col-span-2">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...signupForm.register("email")}
                        type="email"
                        placeholder="Email address"
                        className="pl-11 h-11"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...signupForm.register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pl-11 pr-11 h-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...signupForm.register("confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className="pl-11 pr-11 h-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="relative col-span-2">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...signupForm.register("phoneNumber")}
                        type="tel"
                        placeholder="Phone number"
                        className="pl-11 h-11"
                      />
                    </div>
                    <div className="col-span-2">
                      <SchoolCombobox
                        value={signupForm.watch("school")}
                        onChange={(value) => signupForm.setValue("school", value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <ImageUpload
                        label="Upload profile photo"
                        onChange={(file) => signupForm.setValue("profilePhoto", file)}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-11 font-medium">
                    Sign Up
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={registerSchoolForm.handleSubmit(handleRegisterSchool, onRegisterSchoolError)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative col-span-2">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...registerSchoolForm.register("fullName")}
                        placeholder="Full name"
                        className="pl-11 h-11"
                      />
                    </div>
                    <div className="relative col-span-2">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...registerSchoolForm.register("email")}
                        type="email"
                        placeholder="Email address"
                        className="pl-11 h-11"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...registerSchoolForm.register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pl-11 pr-11 h-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...registerSchoolForm.register("confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className="pl-11 pr-11 h-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="relative col-span-2">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...registerSchoolForm.register("phoneNumber")}
                        type="tel"
                        placeholder="Phone number"
                        className="pl-11 h-11"
                      />
                    </div>
                    <div className="col-span-2">
                      <SchoolCombobox
                        value={registerSchoolForm.watch("school")}
                        onChange={(value) => registerSchoolForm.setValue("school", value)}
                      />
                    </div>
                    <div>
                      <ImageUpload
                        label="Upload profile photo"
                        onChange={(file) => registerSchoolForm.setValue("profilePhoto", file)}
                      />
                    </div>
                    <div>
                      <ImageUpload
                        label="Upload school logo"
                        onChange={(file) => registerSchoolForm.setValue("schoolLogo", file)}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-11 font-medium">
                    Register School
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <OTPDialog open={showOTPDialog} onOpenChange={setShowOTPDialog} phoneNumber={phoneNumber} />
      <ValidationErrorDialog open={showErrorDialog} onOpenChange={setShowErrorDialog} errors={validationErrors} />
    </>
  );
};

export default AuthForm;