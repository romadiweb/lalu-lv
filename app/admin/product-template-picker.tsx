"use client";

type ProductTemplate = {
  id: string;
  title: string;
  categoryName: string | null;
  templateText: string;
};

export function ProductTemplatePicker({
  templates,
}: {
  templates: ProductTemplate[];
}) {
  const applyTemplate = (templateId: string) => {
    const template = templates.find((item) => item.id === templateId);
    const target = document.querySelector<HTMLTextAreaElement>("#short_description");

    if (!template || !target) {
      return;
    }

    target.value = template.templateText;
    target.dispatchEvent(new Event("input", { bubbles: true }));
    target.focus();
  };

  return (
    <section className="admin-template-picker" aria-labelledby="product-template-title">
      <div>
        <h2 id="product-template-title">Produkta sagatave</h2>
        <p>Izvēlies sagatavotu tekstu, ko ielikt produkta īsajā aprakstā.</p>
      </div>

      <label>
        <span>Gatavais teksts</span>
        <select
          defaultValue=""
          onChange={(event) => {
            applyTemplate(event.target.value);
            event.currentTarget.value = "";
          }}
        >
          <option value="" disabled>
            Izvēlēties sagatavi
          </option>
          {templates.map((template) => (
            <option value={template.id} key={template.id}>
              {template.categoryName ? `${template.categoryName} - ${template.title}` : template.title}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
