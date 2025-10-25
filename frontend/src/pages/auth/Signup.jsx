import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, sendOtp, verifyOtp } from "@/redux/slices/authSlice";
import { searchSchoolService } from "@/services/schoolService";
import { validateForm } from "../../hooks/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageUpload from "@/components/common/ImageUpload";
import useDebounce from "@/hooks/useDebounce";
import ThemeToggle from "@/components/ui/theme-toggle";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    schoolName: "",
    schoolLogo: null,
  });
  const [errors, setErrors] = useState({});
  const [schoolSuggestions, setSchoolSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const dispatch = useDispatch();
  const { loading, error, otpSent } = useSelector((state) => state.auth);

  // Fetch school suggestions
  useEffect(() => {
    if (debouncedSearch.length >= 3) {
      setSearchError("");
      searchSchoolService(debouncedSearch).then((res) => {
        if (res.success) {
          setSchoolSuggestions(res.data);
        } else {
          setSchoolSuggestions([]);
          setSearchError(res.error);
        }
      });
    } else {
      setSchoolSuggestions([]);
      setSearchError(debouncedSearch ? "Please enter at least 3 characters" : "");
    }
  }, [debouncedSearch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSchoolSelect = (value) => {
    setForm({ ...form, schoolName: value });
    setSearchQuery(value);
    setSchoolSuggestions([]);
    setSearchError("");
  };

  const handleImageChange = (file) => {
    setForm({ ...form, schoolLogo: file });
    setErrors({ ...errors, schoolLogo: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(signup(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(sendOtp(form.phoneNumber)).then((otpRes) => {
          if (otpRes.meta.requestStatus === "fulfilled") {
            setOtpDialogOpen(true);
          }
        });
      }
    });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ phone: form.phoneNumber, otp })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setOtpDialogOpen(false);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <ThemeToggle />
      <div className="w-full max-w-md p-8 space-y-6 bg-background border rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-foreground">Create School Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div>
            <Input
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>
          <div>
            <Select onValueChange={handleSchoolSelect} value={form.schoolName}>
              <SelectTrigger>
                <SelectValue placeholder="Search and select school" />
              </SelectTrigger>
              <SelectContent>
                <Input
                  placeholder="Search school..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2"
                />
                {searchError && <p className="text-red-500 text-sm px-2">{searchError}</p>}
                {schoolSuggestions.map((school) => (
                  <SelectItem key={school.schoolId} value={school.schoolName}>
                    {school.schoolName} ({school.address})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.schoolName && <p className="text-red-500 text-sm">{errors.schoolName}</p>}
          </div>
          <div>
            <ImageUpload onChange={handleImageChange} />
            {errors.schoolLogo && <p className="text-red-500 text-sm">{errors.schoolLogo}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Signup"}
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>

      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-background text-foreground"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Signup;