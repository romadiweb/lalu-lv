"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "./page.module.css";

type RequestType = "" | "ekskursija" | "meistarklase" | "pasakums" | "individuals-pasutijums";

type WorkshopOption = {
  id: string;
  title: string;
};

const requestLabels: Record<Exclude<RequestType, "">, string> = {
  ekskursija: "Ekskursija vai ciemošanās",
  meistarklase: "Meistarklase",
  pasakums: "Svētki, nometne vai īpašs pasākums",
  "individuals-pasutijums": "Individuāls pasūtījums",
};

const requestOptions: Array<{ value: RequestType; label: string }> = [
  { value: "", label: "Izvēlies pieteikuma veidu" },
  { value: "ekskursija", label: requestLabels.ekskursija },
  { value: "meistarklase", label: requestLabels.meistarklase },
  { value: "pasakums", label: requestLabels.pasakums },
  { value: "individuals-pasutijums", label: requestLabels["individuals-pasutijums"] },
];

export function PieteiktiesForm({
  workshopOptions,
  initialRequestType = "",
}: {
  workshopOptions: WorkshopOption[];
  initialRequestType?: RequestType;
}) {
  const [requestType, setRequestType] = useState<RequestType>(initialRequestType);
  const [isRequestMenuOpen, setIsRequestMenuOpen] = useState(false);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !requestType) return;

    const selectedWorkshop = workshopOptions.find(
      (workshop) => workshop.id === selectedWorkshopId,
    );
    const payload = new FormData();
    payload.set("subject", `LaLu pieteikums: ${requestLabels[requestType]}`);
    payload.set("Pieteikuma veids", requestLabels[requestType]);
    payload.set("Vārds", name.trim());
    payload.set("Tālrunis", phone.trim());
    if (email.trim()) {
      // Formspree uses this special field for the email's Reply-To address.
      payload.set("email", email.trim());
      payload.set("E-pasts", email.trim());
    }
    if (requestType === "meistarklase") {
      payload.set("Meistarklase", selectedWorkshop?.title ?? "Nav izvēlēta");
    }
    payload.set(
      requestType === "individuals-pasutijums" ? "Vēlamais izpildes termiņš" : "Vēlamais datums vai laiks",
      date.trim() || "Nav norādīts",
    );
    if (requestType !== "individuals-pasutijums") {
      payload.set("Dalībnieku skaits un vecums", groupSize.trim() || "Nav norādīts");
    }
    payload.set("Papildu informācija", message.trim());

    submitting.current = true;
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xwlvjywq", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onInvalidCapture={(event) => {
        const field = event.target as HTMLInputElement;
        field.setCustomValidity(
          field.validity.typeMismatch
            ? "Ievadi derīgu e-pasta adresi, piemēram, vards@epasts.lv."
            : "Lūdzu, aizpildi šo lauku.",
        );
      }}
      onInputCapture={(event) => {
        const field = event.target;
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
          field.setCustomValidity("");
        }
      }}
    >
      {status === "success" ? (
        <div className={styles.closedPanel} role="status">
          <p>Paldies! Tavs pieteikums ir nosūtīts. Sazināsimies ar tevi pa norādīto tālruni vai e-pastu, lai vienotos par detaļām.</p>
        </div>
      ) : (
      <fieldset className={styles.formFields} disabled={status === "sending"}>
      <label className={styles.field}>
        <span>Ko vēlies pieteikt?</span>
        <div className={styles.requestPicker}>
          <select
            className={styles.nativeSelect}
            value={requestType}
            onChange={(event) => {
              const nextRequestType = event.target.value as RequestType;
              setRequestType(nextRequestType);

              if (nextRequestType !== "meistarklase") {
                setSelectedWorkshopId("");
              }
            }}
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
                      if (option.value !== "meistarklase") {
                        setSelectedWorkshopId("");
                      }
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
          <p className={styles.formNote}>Ar * atzīmētie lauki ir obligāti.</p>
          {requestType === "meistarklase" ? (
            <label className={styles.field}>
              <span>Meistarklase</span>
              <select
                value={selectedWorkshopId}
                onChange={(event) => setSelectedWorkshopId(event.target.value)}
              >
                <option value="">
                  {workshopOptions.length
                    ? "Izvēlies meistarklasi"
                    : "Nav publicētu meistarklašu"}
                </option>
                {workshopOptions.map((workshop) => (
                  <option key={workshop.id} value={workshop.id}>
                    {workshop.title}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

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
            <span>E-pasts (nav obligāts)</span>
            <input
              autoComplete="email"
              placeholder="vards@epasts.lv"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <div className={styles.twoColumn}>
            <label className={styles.field}>
              <span>{requestType === "individuals-pasutijums" ? "Vēlamais izpildes termiņš" : "Vēlamais datums vai laiks"}</span>
              <input
                placeholder="Piemēram, aprīļa otrā puse"
                type="text"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>

            {requestType !== "individuals-pasutijums" ? <label className={styles.field}>
              <span>Dalībnieku skaits un vecums</span>
              <input
                placeholder="Piemēram, 18 skolēni, 4. klase"
                type="text"
                value={groupSize}
                onChange={(event) => setGroupSize(event.target.value)}
              />
            </label> : null}
          </div>

          <label className={styles.field}>
            <span>Pastāsti par ieceri *</span>
            <textarea
              required
              placeholder={
                requestType === "individuals-pasutijums"
                  ? "Kādu izstrādājumu vēlies? Pastāsti par krāsām, dizainu, izmēru un citām vēlmēm."
                  : requestType === "meistarklase"
                  ? "Vai vēlies meistarklasi LaLu darbnīcā vai izbraukumā? Pastāsti par savām vēlmēm."
                  : "Ko vēlies piedzīvot? Pastāsti par plānoto apmeklējumu un īpašām vēlmēm."
              }
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>

          {status === "error" ? (
            <p className={styles.formNote} role="alert">
              Pieteikumu neizdevās nosūtīt. Mēģini vēlreiz vai raksti uz <a href="mailto:laila@lalu.lv">laila@lalu.lv</a>. Tava ievadītā informācija ir saglabāta šajā formā.
            </p>
          ) : null}
          <button className={styles.submitButton} type="submit">
            {status === "sending" ? "Nosūta pieteikumu…" : "Nosūtīt pieteikumu"}
          </button>
        </div>
      ) : (
        <div className={styles.closedPanel}>
          <p>
            Izvēlies pieteikuma veidu, un forma atvērs jautājumus, kas vajadzīgi
            tavam apmeklējumam, meistarklasei, pasākumam vai individuālam pasūtījumam.
          </p>
        </div>
      )}
      </fieldset>
      )}
    </form>
  );
}
