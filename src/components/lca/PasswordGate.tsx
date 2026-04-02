import { useState, type ReactNode } from "react";
import { isAuthenticated, authenticate } from "@/lib/passwordUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, ShieldCheck } from "lucide-react";

const DISCLAIMER_KEY = "tex2tex_disclaimer_accepted";

interface PasswordGateProps {
  children: ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [unlocked, setUnlocked] = useState(isAuthenticated());
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(
    () => sessionStorage.getItem(DISCLAIMER_KEY) === "true"
  );
  const [agreed, setAgreed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (authenticate(password)) {
        setUnlocked(true);
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
      setLoading(false);
    }, 300);
  };

  const handleAcceptDisclaimer = () => {
    sessionStorage.setItem(DISCLAIMER_KEY, "true");
    setDisclaimerAccepted(true);
  };

  if (unlocked && disclaimerAccepted) return <>{children}</>;

  if (unlocked && !disclaimerAccepted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground font-['Space_Grotesk']">
              Confidentiality Agreement
            </h1>
          </div>

          {/* English */}
          <div className="text-left text-sm text-muted-foreground leading-relaxed space-y-4 bg-secondary/50 rounded-lg p-6 border border-border">
            <p>
              All content available on this platform is the exclusive property of{" "}
              <span className="font-semibold text-foreground">Tex2Tex® / Earth Protex</span> and is strictly{" "}
              <span className="font-semibold text-foreground">confidential</span>.
            </p>
            <p>
              The information presented herein — including data, analyses, charts, and reports — is intended
              solely for authorized individuals and must not be shared, copied, reproduced, or distributed
              to third parties without prior express authorization.
            </p>
            <p>
              Misuse of this information may result in applicable legal action.
            </p>
          </div>

          {/* Chinese & Hindi translations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-left text-xs text-muted-foreground leading-relaxed space-y-2 bg-secondary/30 rounded-lg p-4 border border-border/50">
              <p className="font-semibold text-foreground/70 text-[11px] uppercase tracking-wider mb-2">中文</p>
              <p>
                本平台所有内容均为 <span className="font-semibold">Tex2Tex® / Earth Protex</span> 的专有财产，属于严格<span className="font-semibold">机密</span>信息。
              </p>
              <p>
                此处展示的信息——包括数据、分析、图表和报告——仅供授权人员使用，未经事先明确授权，不得与第三方分享、复制、转载或分发。
              </p>
              <p>滥用本信息可能导致相应的法律追究。</p>
            </div>

            <div className="text-left text-xs text-muted-foreground leading-relaxed space-y-2 bg-secondary/30 rounded-lg p-4 border border-border/50">
              <p className="font-semibold text-foreground/70 text-[11px] uppercase tracking-wider mb-2">हिन्दी</p>
              <p>
                इस प्लेटफ़ॉर्म पर उपलब्ध सभी सामग्री <span className="font-semibold">Tex2Tex® / Earth Protex</span> की विशेष संपत्ति है और पूर्णतः <span className="font-semibold">गोपनीय</span> है।
              </p>
              <p>
                यहाँ प्रस्तुत जानकारी — जिसमें डेटा, विश्लेषण, चार्ट और रिपोर्ट शामिल हैं — केवल अधिकृत व्यक्तियों के लिए है और बिना पूर्व स्पष्ट अनुमति के इसे तीसरे पक्ष के साथ साझा, कॉपी, पुनरुत्पादित या वितरित नहीं किया जा सकता।
              </p>
              <p>इस जानकारी का दुरुपयोग कानूनी कार्रवाई का कारण बन सकता है।</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <Checkbox
              id="disclaimer-agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-0.5"
            />
            <label htmlFor="disclaimer-agree" className="text-sm text-foreground cursor-pointer leading-snug space-y-1">
              <span className="block">I acknowledge and commit not to share this content with unauthorized persons.</span>
              <span className="block text-xs text-muted-foreground">我确认并承诺不会与未授权人员分享此内容。 · मैं स्वीकार करता/करती हूँ और इस सामग्री को अनधिकृत व्यक्तियों के साथ साझा न करने की प्रतिबद्धता व्यक्त करता/करती हूँ।</span>
            </label>
          </div>

          <Button
            onClick={handleAcceptDisclaimer}
            className="w-full"
            disabled={!agreed}
          >
            I Agree & Proceed · 同意并继续 · सहमत और आगे बढ़ें
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <Lock className="w-7 h-7 text-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground font-['Space_Grotesk']">
              Restricted Access
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Enter password to access · 输入密码访问 · पासवर्ड दर्ज करें
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Access password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "border-destructive" : ""}
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive">Incorrect password · 密码错误 · गलत पासवर्ड</p>
          )}
          <Button type="submit" className="w-full" disabled={loading || !password}>
            {loading ? "Verifying..." : "Access · 访问 · प्रवेश करें"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          Confidential content. Authorized access only.
        </p>
      </div>
    </div>
  );
};

export default PasswordGate;