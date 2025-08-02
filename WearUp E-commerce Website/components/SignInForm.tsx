import { useState } from 'react';
import svgPaths from "../imports/svg-8wd7jyfhl2";
import imgRectangle from "figma:asset/c518daf45c989c1710558afd8f9125901ac26985.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface SignInFormProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSwitchToSignUp: () => void;
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
      className="absolute bottom-[59.03%] left-[61.46%] right-[37.43%] top-[39.19%] cursor-pointer"
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
    <div
      className="absolute bottom-[27.98%] left-[44.38%] right-[53.68%] top-[68.91%]"
      data-name="icons8-google"
    >
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
    <div
      className="absolute bottom-[27.76%] left-[53.26%] right-[44.51%] top-[68.69%]"
      data-name="icons8-facebook"
    >
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

export default function SignInForm({ onSignIn, onSwitchToSignUp, loading }: SignInFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await onSignIn(formData.email, formData.password);
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    }
  };

  return (
    <div className="bg-[#ffffff] relative size-full min-h-screen" data-name="WearUp Sign In">
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
      
      {/* Sign Up Button */}
      <div className="absolute bottom-[90.89%] contents left-[86.39%] right-[4.17%] top-[3.78%]">
        <button
          onClick={onSwitchToSignUp}
          className="absolute bottom-[90.89%] left-[86.39%] right-[4.17%] top-[3.78%] border-[#212121] border-[1.5px] border-solid hover:bg-gray-50 transition-colors"
        />
        <div className="absolute bottom-[92.33%] font-['Zen_Kaku_Gothic_Antique:Black',_sans-serif] leading-[0] left-[89.17%] not-italic right-[7.08%] text-[#212121] text-[12.8px] text-nowrap text-right top-[5.11%] tracking-[0.7px] pointer-events-none">
          <p className="adjustLetterSpacing block leading-[22.53px] whitespace-pre">SIGN UP</p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="absolute bg-[#ffffff] bottom-[20%] left-[30.14%] right-[30.14%] top-[14.67%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#e0e0e0] border-solid inset-[-0.5px] pointer-events-none shadow-[0px_82px_40px_-14px_rgba(100,100,100,0.08)]"
        />
      </div>

      {/* Form Content */}
      <div className="absolute left-[36.88%] right-[36.74%] top-[18.67%] bottom-[20%] z-10">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-[31.25px] font-bold text-center text-black mb-2">
            Log In to WearUp
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <div className="bg-[#ffffff] border border-[#212121]">
              <div className="p-4">
                <label className="block text-[10.29px] font-medium text-[#424242] mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-[16px] text-[#616161] bg-transparent border-none outline-none"
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="bg-[#ffffff] border border-[#e0e0e0]">
              <div className="p-4">
                <label className="block text-[10.29px] font-medium text-[#616161] mb-2">
                  PASSWORD
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="flex-1 text-[16px] text-[#757575] bg-transparent border-none outline-none"
                    placeholder="**********"
                    required
                  />
                  <ExIconEye onClick={() => setShowPassword(!showPassword)} />
                </div>
              </div>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: !!checked })}
              />
              <Label htmlFor="remember" className="text-[11px] text-[#616161] underline cursor-pointer">
                Remember Me
              </Label>
            </div>
            <button type="button" className="text-[11px] text-[#616161] underline hover:text-black">
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#212121] text-white py-4 rounded-[10px] hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'SIGNING IN...' : 'PROCEED'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 text-center">
          <span className="text-[12.8px] text-black">OR USE</span>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-2">
          <button className="w-12 h-12 bg-neutral-50 border border-[#eeeeee] hover:bg-gray-100 transition-colors relative">
            <Icons8Google />
          </button>
          <button className="w-12 h-12 bg-neutral-50 border border-[#eeeeee] hover:bg-gray-100 transition-colors relative">
            {/* Apple Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="16" height="20" viewBox="0 0 21 28" fill="none">
                <path
                  clipRule="evenodd"
                  d={svgPaths.p3df11bf0}
                  fill="black"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </button>
          <button className="w-12 h-12 bg-neutral-50 border border-[#eeeeee] hover:bg-gray-100 transition-colors relative">
            <Icons8Facebook />
          </button>
        </div>

        {/* Switch to Sign Up */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-black font-medium hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}