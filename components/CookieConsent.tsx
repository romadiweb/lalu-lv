"use client";

import { useEffect, useState } from "react";

type ConsentState = {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
  saleOfInfo: boolean;
};

const STORAGE_KEY = "lalu-cookie-consent";

const initialConsent: ConsentState = {
  essential: true,
  functional: false,
  analytics: false,
  advertising: false,
  saleOfInfo: false,
};

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"simple" | "preferences">("simple");
  const [consent, setConsent] = useState<ConsentState>(initialConsent);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      if (parsed?.consent) {
        requestAnimationFrame(() => {
          setConsent({
            ...initialConsent,
            ...parsed.consent,
            essential: true,
          });
        });

        return;
      }

      requestAnimationFrame(() => setVisible(true));
    } catch {
      requestAnimationFrame(() => setVisible(true));
    }
  }, []);

  const persist = (nextConsent: ConsentState) => {
    const normalized = {
      ...nextConsent,
      essential: true,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        consent: normalized,
        timestamp: Date.now(),
      }),
    );

    setConsent(normalized);

    setVisible(false);
  };

  const acceptAll = () => {
    persist({
      essential: true,
      functional: true,
      analytics: true,
      advertising: true,
      saleOfInfo: true,
    });
  };

  const confirmChoices = () => {
    persist(consent);
  };

  const updateConsent = (
    key: keyof Omit<ConsentState, "essential">,
    value: boolean,
  ) => {
    setConsent((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div
      className={`cookie-consent-root ${
        visible ? "cookie-consent-root--visible" : ""
      }`}
      aria-hidden={!visible}
    >
      <div className="cookie-consent-backdrop" />

      <section
        className={`cookie-consent-panel ${
          mode === "preferences"
            ? "cookie-consent-panel--preferences"
            : "cookie-consent-panel--simple"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={
          mode === "simple"
            ? "cookie-consent-title"
            : "cookie-preferences-title"
        }
      >
        <div className="cookie-consent-glow" aria-hidden="true" />

        {mode === "simple" ? (
          <>
            <div className="cookie-consent-main">
              <div className="cookie-consent-copy">
                <h2 id="cookie-consent-title">Mēs izmantojam sīkdatnes</h2>

                <p>
                  Noklikšķinot uz “Pieņemt visus”, jūs piekrītat sīkdatņu glabāšanai
                  jūsu ierīcē funkcionalitātes, analītikas un reklāmas
                  mērķiem.
                </p>
              </div>

              <div className="cookie-consent-actions">
                <button
                  type="button"
                  className="cookie-consent-button"
                  onClick={acceptAll}
                >
                  Pieņemt visus
                </button>

                <button
                  type="button"
                  className="cookie-consent-button"
                  onClick={() => setMode("preferences")}
                >
                  Vairāk izvēles
                </button>
              </div>
            </div>

            <CookieFooter
              onSimplerChoices={() => setMode("simple")}
              showSimplerChoices={false}
            />
          </>
        ) : (
          <>
            <div className="cookie-preferences">
              <h2 id="cookie-preferences-title">
                Kam mēs varam izmantot datus?
              </h2>

              <div className="cookie-preferences-options">
                <CookieCheckbox
                  label="Nepieciešamās"
                  checked
                  disabled
                  onChange={() => {}}
                />

                <CookieCheckbox
                  label="Funkcionalitāte"
                  checked={consent.functional}
                  onChange={(checked) =>
                    updateConsent("functional", checked)
                  }
                />

                <CookieCheckbox
                  label="Analītika"
                  checked={consent.analytics}
                  onChange={(checked) =>
                    updateConsent("analytics", checked)
                  }
                />

                <CookieCheckbox
                  label="Reklāma"
                  checked={consent.advertising}
                  onChange={(checked) =>
                    updateConsent("advertising", checked)
                  }
                />

                <CookieCheckbox
                  label="Pārdošana"
                  checked={consent.saleOfInfo}
                  onChange={(checked) =>
                    updateConsent("saleOfInfo", checked)
                  }
                />
              </div>

              <button
                type="button"
                className="cookie-consent-button cookie-consent-button--confirm"
                onClick={confirmChoices}
              >
                Apstiprināt
              </button>
            </div>

            <CookieFooter
              onSimplerChoices={() => setMode("simple")}
              showSimplerChoices
            />
          </>
        )}
      </section>
    </div>
  );
}

type CookieCheckboxProps = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

function CookieCheckbox({
  label,
  checked,
  disabled = false,
  onChange,
}: CookieCheckboxProps) {
  return (
    <label
      className={`cookie-checkbox ${
        disabled ? "cookie-checkbox--disabled" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />

      <span className="cookie-checkbox-box" aria-hidden="true">
        <svg viewBox="0 0 12 12">
          <path d="M2.25 6.1 4.8 8.5 9.75 3.65" />
        </svg>
      </span>

      <span>{label}</span>
    </label>
  );
}

type CookieFooterProps = {
  showSimplerChoices: boolean;
  onSimplerChoices: () => void;
};

function CookieFooter({
  showSimplerChoices,
  onSimplerChoices,
}: CookieFooterProps) {
  return (
    <div
      className={`cookie-consent-footer ${
        showSimplerChoices ? "cookie-consent-footer--preferences" : ""
      }`}
    >
      <span className="cookie-footer-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </svg>
      </span>

      {showSimplerChoices && (
        <button
          type="button"
          className="cookie-footer-action"
          onClick={onSimplerChoices}
        >
          Vairāk izvēles
        </button>
      )}

      <a href="/sikdatnu-politika/" className="cookie-footer-link">
        Skatīt mūsu privātuma politiku
      </a>

      <span className="cookie-footer-language" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="11" height="9" rx="1.5" />
          <path d="M6 8h5M8.5 6v4M5.5 11.5 9 7.5l3.5 4" />
          <rect x="10" y="11" width="11" height="9" rx="1.5" />
          <path d="M13 17h5M15.5 14v6" />
        </svg>
      </span>
    </div>
  );
}
