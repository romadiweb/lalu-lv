"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ImageUploadFieldsProps = {
  id: string;
  urlName: string;
  fileName: string;
  initialUrl: string;
  altName?: string;
  initialAlt?: string;
  required?: boolean;
};

export function ImageUploadFields({ id, urlName, fileName, initialUrl, altName, initialAlt = "", required }: ImageUploadFieldsProps) {
  const [url, setUrl] = useState(initialUrl);
  const [fileUrl, setFileUrl] = useState("");
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const objectUrl = useRef("");
  useEffect(() => () => { if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); }, []);
  const source = fileUrl || url.trim();
  const canPreview = /^(https?:\/\/|\/(?!\/)|blob:)/i.test(source);

  return (
    <div className="admin-image-editor">
      <div className="admin-image-editor-fields">
        <label htmlFor={id}>Attēla URL</label>
        <input id={id} name={urlName} type="text" value={url} required={required && !fileUrl} onChange={(event) => setUrl(event.target.value)} />
        <div className="admin-upload">
          <label htmlFor={`${id}_file`}>Augšupielādēt failu</label>
          <input id={`${id}_file`} name={fileName} type="file" accept="image/*" onChange={(event) => {
            if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
            objectUrl.current = event.target.files?.[0] ? URL.createObjectURL(event.target.files[0]) : "";
            setFileUrl(objectUrl.current);
            setFailedUrl(null);
          }} />
          <small>JPEG, PNG vai WebP, ne vairāk kā 3 MB.</small>
        </div>
        {altName ? <>
          <label htmlFor={`${id}_alt`}>Alt teksts</label>
          <input id={`${id}_alt`} name={altName} type="text" defaultValue={initialAlt} />
        </> : null}
      </div>
      <div className="admin-image-preview" aria-label="Attēla priekšskatījums">
        {source && canPreview && source !== failedUrl ? (
          <Image key={source} src={source} alt="Izvēlētā attēla priekšskatījums" width={144} height={144} unoptimized onError={() => setFailedUrl(source)} />
        ) : <span>{source ? "Attēlu nevar parādīt" : "Nav izvēlēta attēla"}</span>}
      </div>
    </div>
  );
}
