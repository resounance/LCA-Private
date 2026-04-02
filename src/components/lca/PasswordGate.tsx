import { useState, type ReactNode } from "react";
import { isAuthenticated, authenticate } from "@/lib/passwordUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, ShieldCheck } from "lucide-react";

const DISCLAIMER_KEY = "tex2tex_disclaimer_accepted";

type Lang = "en" | "zh" | "hi";

const translations = {
  en: {
    restrictedAccess: "Restricted Access",
    enterPassword: "Enter password to access",
    placeholder: "Access password",
    incorrect: "Incorrect password",
    accessBtn: "Access",
    verifying: "Verifying...",
    confidentialNote: "Confidential content. Authorized access only.",
    disclaimerTitle: "Confidentiality Agreement",
    disclaimerP1: (
      <>All content available on this platform is the exclusive property of{" "}
        <span className="font-semibold text-foreground">Tex2Tex® / Earth Protex</span> and is strictly{" "}
        <span className="font-semibold text-foreground">confidential</span>.</>
    ),
    disclaimerP2:
      "The information presented herein, including data, analyses, charts, and reports, is intended solely for authorized individuals and must not be shared, copied, reproduced, or distributed to third parties without prior express authorization.",
    disclaimerP3: "Misuse of this information may result in applicable legal action.",
    checkboxLabel: "I acknowledge and commit not to share this content with unauthorized persons.",
    agreeBtn: "I Agree & Proceed",
  },
  zh: {
    restrictedAccess: "限制访问",
    enterPassword: "输入密码以访问",
    placeholder: "访问密码",
    incorrect: "密码错误",
    accessBtn: "访问",
    verifying: "验证中...",
    confidentialNote: "机密内容，仅限授权访问。",
    disclaimerTitle: "保密协议",
    disclaimerP1: (
      <>本平台所有内容均为{" "}
        <span className="font-semibold text-foreground">Tex2Tex® / Earth Protex</span>{" "}
        的专有财产，属于严格<span className="font-semibold text-foreground">机密</span>信息。</>
    ),
    disclaimerP2:
      "此处展示的信息，包括数据、分析、图表和报告，仅供授权人员使用，未经事先明确授权，不得与第三方分享、复制、转载或分发。",
    disclaimerP3: "滥用本信息可能导致相应的法律追究。",
    checkboxLabel: "我确认并承诺不会与未授权人员分享此内容。",
    agreeBtn: "同意并继续",
  },
  hi: {
    restrictedAccess: "प्रतिबंधित पहुँच",
    enterPassword: "एक्सेस के लिए पासवर्ड दर्ज करें",
    placeholder: "एक्सेस पासवर्ड",
    incorrect: "गलत पासवर्ड",
    accessBtn: "प्रवेश करें",
    verifying: "सत्यापित हो रहा है...",
    confidentialNote: "गोपनीय सामग्री। केवल अधिकृत पहुँच।",
    disclaimerTitle: "गोपनीयता समझौता",
    disclaimerP1: (
      <>इस प्लेटफ़ॉर्म पर उपलब्ध सभी सामग्री{" "}
        <span className="font-semibold text-foreground">Tex2Tex® / Earth Protex</span>{" "}
        की विशेष संपत्ति है और पूर्णतः <span className="font-semibold text-foreground">गोपनीय</span> है।</>
    ),
    disclaimerP2:
      "यहाँ प्रस्तुत जानकारी, जिसमें डेटा, विश्लेषण, चार्ट और रिपोर्ट शामिल हैं, केवल अधिकृत व्यक्तियों के लिए है और बिना पूर्व स्पष्ट अनुमति के इसे तीसरे पक्ष के साथ साझा, कॉपी, पुनरुत्पादित या वितरित नहीं किया जा सकता।",
    disclaimerP3: "इस जानकारी का दुरुपयोग कानूनी कार्रवाई का कारण बन सकता है।",
    checkboxLabel: "मैं स्वीकार करता/करती हूँ और इस सामग्री को अनधिकृत व्यक्तियों के साथ साझा न करने की प्रतिबद्धता व्यक्त करता/करती हूँ।",
    agreeBtn: "सहमत और आगे बढ़ें",
  },
} as const;

const langLabels: { key: Lang; label: string }[] = [
  { key: "en", label: "EN" },
  { key: "zh", label: "中文" },
  { key: "hi", label: "हिन्दी" },
];

interface PasswordGateProps {
  children: ReactNode;
}

const LangSelector = ({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) => (
  <div className="flex gap-1.5 justify-center">
    {langLabels.map(({ key, label }) => (
      <Button
        key={key}
        size="sm"
        variant={lang === key ? "default" : "outline"}
        onClick={() => setLang(key)}
        className="text-xs px-3 font-['Nexa']"
      >
        <span className="translate-y-[2px]">{label}</span>
      </Button>
    ))}
  </div>
);

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [unlocked, setUnlocked] = useState(isAuthenticated());
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(
    () => sessionStorage.getItem(DISCLAIMER_KEY) === "true"
  );
  const [agreed, setAgreed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  const t = translations[lang];

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
          <LangSelector lang={lang} setLang={setLang} />

          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground font-['Nexa']">
              <span className="translate-y-[2px] inline-block">{t.disclaimerTitle}</span>
            </h1>
          </div>

          <div className="text-left text-sm text-muted-foreground leading-relaxed space-y-4 bg-secondary/50 rounded-lg p-6 border border-border font-['Nexa']">
            <p>{t.disclaimerP1}</p>
            <p>{t.disclaimerP2}</p>
            <p>{t.disclaimerP3}</p>
          </div>

          <div className="flex items-start gap-3 text-left">
            <Checkbox
              id="disclaimer-agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-0.5"
            />
            <label htmlFor="disclaimer-agree" className="text-sm text-foreground cursor-pointer leading-snug font-['Nexa']">
              <span className="translate-y-[1px] inline-block">{t.checkboxLabel}</span>
            </label>
          </div>

          <Button onClick={handleAcceptDisclaimer} className="w-full font-['Nexa']" disabled={!agreed}>
            <span className="translate-y-[2px]">{t.agreeBtn}</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        <LangSelector lang={lang} setLang={setLang} />

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <Lock className="w-7 h-7 text-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground font-['Nexa']">
              <span className="translate-y-[2px] inline-block">{t.restrictedAccess}</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-['Nexa']">
              <span className="translate-y-[1px] inline-block">{t.enterPassword}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder={t.placeholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "border-destructive" : ""}
            autoFocus
          />
          {error && <p className="text-sm text-destructive">{t.incorrect}</p>}
          <Button type="submit" className="w-full font-['Nexa']" disabled={loading || !password}>
            <span className="translate-y-[2px]">{loading ? t.verifying : t.accessBtn}</span>
          </Button>
        </form>

        <p className="text-xs text-muted-foreground font-['Nexa']">
          <span className="translate-y-[1px] inline-block">{t.confidentialNote}</span>
        </p>
      </div>
    </div>
  );
};

export default PasswordGate;
