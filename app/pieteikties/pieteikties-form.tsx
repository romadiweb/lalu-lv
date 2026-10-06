"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type RequestType = "" | "ekskursija" | "meistarklase" | "pasakums";

const requestLabels: Record<Exclude<RequestType, "">, string> = {
  ekskursija: "Ekskursija vai ciemošanās",
  meistarklase: "Meistarklase",
  pasakums: "Svētki, nometne vai īpašs pasākums",
};

const requestOptions: Array<{ value: RequestType; label: string }> = [
  { value: "", label: "Izvēlies pieteikuma veidu" },
  { value: "ekskursija", label: requestLabels.ekskursija },
  { value: "meistarklase", label: requestLabels.meistarklase },
  { value: "pasakums", label: requestLabels.pasakums },
];

export function PieteiktiesForm() {
  const [requestType, setRequestType] = useState<RequestType>("");
  const [isRequestMenuOpen, setIsRequestMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    if (!requestType) {
      return "mailto:laila@lalu.lv";
    }

    const subject = `Pieteikums: ${requestLabels[requestType]}`;
    const body = [
      `Pieteikuma veids: ${requestLabels[requestType]}`,
      `Vārds: ${name}`,
      `E-pasts: ${email}`,
      `Tālrunis: ${phone}`,
      `Vēlamais datums/laiks: ${date}`,
      `Cilvēku skaits un vecums: ${groupSize}`,
      "",
      "Papildu informācija:",
      message,
    ].join("\n");

    return `mailto:laila@lalu.lv?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [date, email, groupSize, message, name, phone, requestType]);

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <label className={styles.field}>
        <span>Ko vēlies pieteikt?</span>
        <div className={styles.requestPicker}>
          <select
            className={styles.nativeSelect}
            value={requestType}
            onChange={(event) =>
              setRequestType(event.target.value as RequestType)
            }
          >
            {requestOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className={styles.desktopSelect}>
            <button
              aria-expanded={isRequestMenuOpen}
              aria-haspopup="listbox"
              className={styles.selectButton}
              type="button"
              onClick={() => setIsRequestMenuOpen((isOpen) => !isOpen)}
            >
              <span>
                {
                  requestOptions.find((option) => option.value === requestType)
                    ?.label
                }
              </span>
              <span aria-hidden="true" className={styles.chevron} />
            </button>

            {isRequestMenuOpen ? (
              <div className={styles.selectMenu} role="listbox">
                {requestOptions.slice(1).map((option) => (
                  <button
                    aria-selected={requestType === option.value}
                    className={styles.selectOption}
                    key={option.value}
                    role="option"
                    type="button"
                    onClick={() => {
                      setRequestType(option.value);
                      setIsRequestMenuOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </label>

      {requestType ? (
        <div className={styles.expandedFields}>
          <div className={styles.twoColumn}>
            <label className={styles.field}>
              <span>Vārds *</span>
              <input
                required
                autoComplete="name"
                placeholder="Tavs vārds"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>Tālrunis *</span>
              <input
                required
                autoComplete="tel"
                placeholder="+371 ..."
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
          </div>

          <label className={styles.field}>
            <span>E-pasts</span>
            <input
              autoComplete="email"
              placeholder="epasts@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <div className={styles.twoColumn}>
            <label className={styles.field}>
              <span>Vēlamais datums vai laiks</span>
              <input
                placeholder="Piemēram, aprīļa otrā puse"
                type="text"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>Cilvēku skaits un vecums</span>
              <input
                placeholder="Piemēram, 18 skolēni, 4. klase"
                type="text"
                value={groupSize}
                onChange={(event) => setGroupSize(event.target.value)}
              />
            </label>
          </div>

          <label className={styles.field}>
            <span>Pastāsti par ieceri *</span>
            <textarea
              required
              placeholder={
                requestType === "meistarklase"
                  ? "Kura meistarklase interesē? Vai tā būs darbnīcā vai izbraukumā?"
                  : "Ko vēlaties piedzīvot, cik ilga varētu būt ciemošanās un kas jāņem vērā?"
              }
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>

          <a className={styles.submitButton} href={mailtoHref}>
            Nosūtīt pieteikumu
          </a>
        </div>
      ) : (
        <div className={styles.closedPanel}>
          <p>
            Izvēlies pieteikuma veidu, un forma atvērs jautājumus, kas vajadzīgi
            tieši ekskursijai, meistarklasei vai īpašam notikumam.
          </p>
        </div>
      )}
    </form>
  );
}
