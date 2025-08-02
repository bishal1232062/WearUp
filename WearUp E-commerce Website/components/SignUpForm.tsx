import { useState } from 'react';
import svgPaths from "../imports/svg-hk8er0jmxr";
import imgRectangle from "figma:asset/964f41113852af6d716c768a16d0b817b9aabd44.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface SignUpFormProps {
  onSignUp: (email: string, password: string, fullName: string) => Promise<void>;
  onSwitchToSignIn: () => void;
  loading: boolean;
}

function Group2() {
  return (
    <div className="absolute bottom-[90.78%] contents left-[4.24%] right-[91.81%] top-[4.11%]">
      <div
        className="absolute bottom-[90.78%] left-[5%] right-[91.81%] top-[4.11%]"
        data-name="Ellipse"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 46 46"
        >
          <ellipse
            cx="23"
            cy="23"
            fill="var(--fill-0, black)"
            id="Ellipse"
            rx="23"
            ry="23"
          />
        </svg>
      </div>
      <div className="absolute bottom-[92.11%] font-['Questrial:Regular',_sans-serif] leading-[0] left-[4.24%] not-italic right-[92.43%] text-[#ffffff] text-[24px] text-nowrap text-right top-[5.11%] tracking-[-2px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          Logo
        </p>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div
      className="absolute bottom-[90.78%] contents left-[4.24%] right-[83.19%] top-[4.11%]"
      data-name="Logo"
    >
      <div className="absolute bottom-[91.28%] font-['Zen_Kaku_Gothic_Antique:Regular',_sans-serif] leading-[0] left-[8.68%] not-italic right-[83.19%] text-[#000000] text-[20px] text-left text-nowrap top-[4.72%]">
        <p className="block leading-[35.2px] whitespace-pre">WearUp</p>
      </div>
      <Group2 />
    </div>
  );
}

function ExIconEye({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-[26px] right-[26px] cursor-pointer size-4"
      data-name="ex-icon/eye"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="eye">
          <mask
            height="16"
            id="mask0_2_118"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "luminance" }}
            width="16"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, white)"
              height="16"
              id="Background"
              width="16"
            />
          </mask>
          <g mask="url(#mask0_2_118)">
            <path
              clipRule="evenodd"
              d={svgPaths.p23df5180}
              fill="var(--fill-0, #BEBEBE)"
              fillRule="evenodd"
              id="Shape"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.pa9fc280}
              fill="var(--fill-0, #BEBEBE)"
              fillRule="evenodd"
              id="Shape_2"
            />
          </g>
        </g>
      </svg>
    </button>
  );
}

function Icons8Google() {
  return (
    <div className="w-7 h-7">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="icons8-google">
          <mask
            height="28"
            id="mask0_2_129"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "luminance" }}
            width="28"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, white)"
              height="28"
              id="Background"
              width="28"
            />
          </mask>
          <g mask="url(#mask0_2_129)">
            <path
              clipRule="evenodd"
              d={svgPaths.p39b9bd80}
              fill="var(--fill-0, #FFC107)"
              fillRule="evenodd"
              id="Shape"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p11d52580}
              fill="var(--fill-0, #FF3D00)"
              fillRule="evenodd"
              id="Shape_2"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p13c98200}
              fill="var(--fill-0, #4CAF50)"
              fillRule="evenodd"
              id="Shape_3"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p2e17dc00}
              fill="var(--fill-0, #1976D2)"
              fillRule="evenodd"
              id="Shape_4"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icons8Facebook() {
  return (
    <div className="w-8 h-8">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="icons8-facebook">
          <mask
            height="32"
            id="mask0_2_107"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "luminance" }}
            width="32"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, white)"
              height="32"
              id="Background"
              width="32"
            />
          </mask>
          <g mask="url(#mask0_2_107)">
            <path
              clipRule="evenodd"
              d={svgPaths.p31ae93d0}
              fill="var(--fill-0, #039BE5)"
              fillRule="evenodd"
              id="Shape"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p2a757440}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Shape_2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function SignUpForm({ onSignUp, onSwitchToSignIn, loading }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      await onSignUp(formData.email, formData.password, formData.fullName);
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    }
  };

  return (
    <div className="bg-[#ffffff] relative size-full min-h-screen" data-name="WearUp Sign Up">
      {/* Background gradient */}
      <div className="absolute bottom-1/2 left-0 right-0 top-0" data-name="Rectangle">
        <img
          className="block max-w-none size-full"
          height="450"
          src={imgRectangle}
          width="1440"
        />
      </div>
      
      {/* Logo */}
      <Logo />
      
      {/* Sign In Button */}
      <div className="absolute bottom-[90.89%] contents left-[86.39%] right-[4.17%] top-[3.78%]">
        <button
          onClick={onSwitchToSignIn}
          className="absolute bottom-[90.89%] left-[86.39%] right-[4.17%] top-[3.78%] border-[#212121] border-[1.5px] border-solid hover:bg-gray-50 transition-colors"
        />
        <div className="absolute bottom-[92.22%] font-['Zen_Kaku_Gothic_Antique:Black',_sans-serif] leading-[0] left-[89.17%] not-italic right-[7.36%] text-[#212121] text-[12.8px] text-nowrap text-right top-[5.22%] tracking-[0.7px] pointer-events-none">
          <p className="adjustLetterSpacing block leading-[22.53px] whitespace-pre">SIGN IN</p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="absolute bg-[#ffffff] bottom-[20%] left-[30.07%] right-[30.21%] top-[14.67%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#e0e0e0] border-solid inset-[-0.5px] pointer-events-none shadow-[0px_82px_40px_-14px_rgba(100,100,100,0.08)]"
        />
      </div>

      {/* Form Content */}
      <div className="absolute left-[36.88%] right-[36.74%] top-[18.28%] bottom-[20%] z-10">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-[31.25px] font-bold text-center text-[#212121] mb-2 tracking-[-0.5px]">
            Sign up to WearUp
          </h2>
          <p className="text-[12.8px] text-[#757575] text-center">
            Quick & Simple way to Automate your payment
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name Field */}
          <div className="relative">
            <div className="bg-[#ffffff] border border-[#212121] h-[68px]">
              <div className="p-4">
                <label className="block text-[10.29px] font-medium text-[#212121] mb-1">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-[16px] text-[#616161] bg-transparent border-none outline-none"
                  placeholder="John"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <div className="bg-[#ffffff] border border-[#e0e0e0] h-[68px]">
              <div className="p-4">
                <label className="block text-[10.29px] font-medium text-[#616161] mb-1">
                  EMAIL ADRRESS
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-[16px] text-[#757575] bg-transparent border-none outline-none"
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="bg-[#ffffff] border border-[#e0e0e0] h-[68px]">
              <div className="p-4 relative">
                <label className="block text-[10.29px] font-medium text-[#616161] mb-1">
                  PASSWORD
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full text-[16px] text-[#757575] bg-transparent border-none outline-none pr-10"
                  placeholder="**********"
                  required
                />
                <ExIconEye onClick={() => setShowPassword(!showPassword)} />
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2 py-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: !!checked })}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-[10.24px] text-[#616161] underline cursor-pointer leading-[22.53px]">
              I agree to the Terms of Service and Privacy Policy.
            </Label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#212121] text-white py-4 rounded-[10px] hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE AN ACCOUNT'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center">
          <span className="text-[12.8px] text-black">OR</span>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-2">
          <button className="w-12 h-12 bg-neutral-50 border border-[#eeeeee] hover:bg-gray-100 transition-colors flex items-center justify-center">
            <Icons8Google />
          </button>
          <button className="w-12 h-12 bg-neutral-50 border border-[#eeeeee] hover:bg-gray-100 transition-colors flex items-center justify-center">
            {/* Apple Icon */}
            <svg width="16" height="20" viewBox="0 0 21 28" fill="none">
              <path
                clipRule="evenodd"
                d={svgPaths.p3df11bf0}
                fill="black"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <button className="w-12 h-12 bg-neutral-50 border border-[#eeeeee] hover:bg-gray-100 transition-colors flex items-center justify-center">
            <Icons8Facebook />
          </button>
        </div>

        {/* Switch to Sign In */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-black font-medium hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}