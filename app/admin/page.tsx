import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { adminQuery } from "@/lib/admin/db";
import { adminResources, type AdminResource } from "@/lib/admin/resources";
import { ResourceIcon } from "./resource-icon";

function quoteIdent(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

async function getResourceCount(resource: AdminResource) {
  try {
    const [row] = await adminQuery<{ count: number | string }>(
      `select count(*)::int as count from public.${quoteIdent(resource.table)}`,
    );

    return Number(row?.count ?? 0);
  } catch (error) {
    console.error(`Could not load dashboard count for ${resource.table}.`, error);
    return 0;
  }
}

function findResourceByIcon(icon: AdminResource["icon"]) {
  return adminResources.find((resource) => resource.icon === icon);
}

export default async function AdminDashboardPage() {
  await requireAdmin();

  const counts = await Promise.all(
    adminResources.map(async (resource) => ({
      resource,
      count: await getResourceCount(resource),
    })),
  );

  const countMap = new Map(
    counts.map(({ resource, count }) => [resource.section, count]),
  );

  const articleResource = findResourceByIcon("article");
  const workshopResource = findResourceByIcon("workshop");
  const productResource = findResourceByIcon("product");
  const galleryResource = findResourceByIcon("gallery");

  const articleCount = articleResource ? countMap.get(articleResource.section) ?? 0 : 0;
  const workshopCount = workshopResource ? countMap.get(workshopResource.section) ?? 0 : 0;
  const productCount = productResource ? countMap.get(productResource.section) ?? 0 : 0;
  const totalCount = counts.reduce((sum, item) => sum + item.count, 0);

  const overview = [
    {
      label: "Raksti",
      value: articleCount,
      resource: articleResource,
      note: "Publicētie un sagatavotie ieraksti",
      className: "is-lavender",
    },
    {
      label: "Meistarklases",
      value: workshopCount,
      resource: workshopResource,
      note: "Meistarklašu saturs mājaslapā",
      className: "is-cream",
    },
    {
      label: "Produkti",
      value: productCount,
      resource: productResource,
      note: "Veikala produktu katalogā",
      className: "is-green",
    },
    {
      label: "Kopā",
      value: totalCount,
      resource: null,
      note: "Ieraksti visās CMS sadaļās",
      className: "is-dark",
    },
  ];

  const quickResources = [
    articleResource,
    productResource,
    workshopResource,
    galleryResource,
  ].filter(Boolean) as AdminResource[];

  return (
    <main className="lalu-dashboard">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="dashboard-eyebrow">LaLu CMS</span>
          <h1>Labdien!</h1>
          <p>
            Īss pārskats par LaLu mājaslapas saturu. No šejienes vari ātri
            pārbaudīt apjomu un doties pie biežāk izmantotajām sadaļām.
          </p>
        </div>

        <div className="dashboard-hero-mark" aria-hidden="true">
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="overview-title">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-kicker">Pārskats</span>
            <h2 id="overview-title">Saturs šobrīd</h2>
          </div>
          <span className="dashboard-muted">Dati atspoguļo esošo datubāzes saturu</span>
        </div>

        <div className="dashboard-stats">
          {overview.map((item) => {
            const content = (
              <>
                <div className="dashboard-stat-top">
                  <span>{item.label}</span>
                  {item.resource ? (
                    <span className="dashboard-stat-icon">
                      <ResourceIcon icon={item.resource.icon} />
                    </span>
                  ) : (
                    <span className="dashboard-stat-icon dashboard-stat-dot">•</span>
                  )}
                </div>

                <strong>{item.value}</strong>
                <p>{item.note}</p>

                {item.resource && (
                  <span className="dashboard-stat-link">
                    Atvērt sadaļu <span aria-hidden="true">↗</span>
                  </span>
                )}
              </>
            );

            return item.resource ? (
              <Link
                className={`dashboard-stat ${item.className}`}
                href={`/admin/${item.resource.section}/`}
                key={item.label}
              >
                {content}
              </Link>
            ) : (
              <div className={`dashboard-stat ${item.className}`} key={item.label}>
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-kicker">Ātrā piekļuve</span>
              <h2>Biežākās darbības</h2>
            </div>
          </div>

          <div className="dashboard-quick-list">
            {quickResources.map((resource) => (
              <Link
                className="dashboard-quick-item"
                href={`/admin/${resource.section}/`}
                key={resource.section}
              >
                <span className="dashboard-quick-icon">
                  <ResourceIcon icon={resource.icon} />
                </span>

                <span className="dashboard-quick-copy">
                  <strong>{resource.label}</strong>
                  <small>{resource.description}</small>
                </span>

                <span className="dashboard-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-kicker">CMS</span>
              <h2>Satura sadalījums</h2>
            </div>
            <span className="dashboard-total-pill">{totalCount} kopā</span>
          </div>

          <div className="dashboard-breakdown-list">
            {counts.map(({ resource, count }) => {
              const percentage =
                totalCount > 0
                  ? Math.max(4, Math.round((count / totalCount) * 100))
                  : 0;

              return (
                <div className="dashboard-breakdown-row" key={resource.section}>
                  <div className="dashboard-breakdown-meta">
                    <span className="dashboard-breakdown-name">
                      <ResourceIcon icon={resource.icon} />
                      {resource.label}
                    </span>
                    <strong>{count}</strong>
                  </div>

                  <div className="dashboard-progress" aria-hidden="true">
                    <span style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="dashboard-site-card">
        <div>
          <span className="dashboard-kicker">Mājaslapa</span>
          <h2>Apskati saturu publiskajā lapā</h2>
          <p>
            Pēc izmaiņu saglabāšanas vari uzreiz pārbaudīt, kā tās izskatās
            LaLu mājaslapā.
          </p>
        </div>

        <Link className="dashboard-site-button" href="/" target="_blank">
          Atvērt mājaslapu <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <style>{`
        .lalu-dashboard {
          display: grid;
          gap: 34px;
          padding-bottom: 48px;
        }

        .dashboard-hero {
          position: relative;
          overflow: hidden;
          display: flex;
          min-height: 248px;
          align-items: flex-end;
          justify-content: space-between;
          padding: clamp(28px, 5vw, 54px);
          border: 1px solid rgba(35, 31, 32, 0.08);
          border-radius: 30px;
          background:
            radial-gradient(circle at 84% 20%, rgba(200, 187, 251, 0.95), transparent 29%),
            linear-gradient(135deg, #f9f8f6 0%, #f2eefb 52%, #c8bbfb 145%);
          box-shadow: 0 18px 50px rgba(56, 46, 76, 0.07);
        }

        .dashboard-hero-copy {
          position: relative;
          z-index: 2;
          max-width: 650px;
        }

        .dashboard-eyebrow,
        .dashboard-kicker {
          display: inline-block;
          margin-bottom: 10px;
          color: rgba(35, 31, 32, 0.54);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .dashboard-hero h1 {
          margin: 0;
          color: #231f20;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 600;
          letter-spacing: -0.055em;
          line-height: 0.95;
        }

        .dashboard-hero p {
          max-width: 560px;
          margin: 22px 0 0;
          color: rgba(35, 31, 32, 0.66);
          font-size: 15px;
          line-height: 1.65;
        }

        .dashboard-hero-mark {
          position: absolute;
          top: 50%;
          right: clamp(20px, 7vw, 90px);
          width: 180px;
          height: 180px;
          transform: translateY(-50%);
        }

        .dashboard-section {
          display: grid;
          gap: 18px;
        }

        .dashboard-section-heading,
        .dashboard-panel-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }

        .dashboard-section-heading h2,
        .dashboard-panel-heading h2,
        .dashboard-site-card h2 {
          margin: 0;
          color: #231f20;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.035em;
        }

        .dashboard-muted {
          color: rgba(35, 31, 32, 0.46);
          font-size: 12px;
        }

        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .dashboard-stat {
          min-height: 190px;
          padding: 22px;
          border: 1px solid rgba(35, 31, 32, 0.08);
          border-radius: 22px;
          color: #231f20;
          text-decoration: none;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        a.dashboard-stat:hover {
          transform: translateY(-3px);
          border-color: rgba(35, 31, 32, 0.14);
          box-shadow: 0 18px 34px rgba(35, 31, 32, 0.07);
        }

        .dashboard-stat.is-lavender { background: #e8e0ff; }
        .dashboard-stat.is-cream { background: #f3eadf; }
        .dashboard-stat.is-green { background: #e6eee6; }
        .dashboard-stat.is-dark {
          background: #231f20;
          color: #f9f8f6;
        }

        .dashboard-stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          font-size: 13px;
          font-weight: 600;
        }

        .dashboard-stat-icon {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.55);
        }

        .dashboard-stat-icon .admin-resource-icon,
        .dashboard-quick-icon .admin-resource-icon,
        .dashboard-breakdown-name .admin-resource-icon {
          width: 18px;
          height: 18px;
        }

        .dashboard-stat-dot { font-size: 20px; }

        .dashboard-stat strong {
          display: block;
          margin-top: 28px;
          font-size: clamp(34px, 4vw, 48px);
          font-weight: 600;
          letter-spacing: -0.055em;
          line-height: 1;
        }

        .dashboard-stat p {
          min-height: 36px;
          margin: 9px 0 0;
          color: currentColor;
          font-size: 12px;
          line-height: 1.45;
          opacity: 0.58;
        }

        .dashboard-stat-link {
          display: inline-flex;
          gap: 6px;
          margin-top: 14px;
          font-size: 11px;
          font-weight: 700;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
          gap: 18px;
        }

        .dashboard-panel {
          padding: 26px;
          border: 1px solid rgba(35, 31, 32, 0.08);
          border-radius: 26px;
          background: #fff;
          box-shadow: 0 14px 42px rgba(35, 31, 32, 0.04);
        }

        .dashboard-quick-list {
          display: grid;
          gap: 8px;
          margin-top: 22px;
        }

        .dashboard-quick-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 14px;
          align-items: center;
          padding: 14px;
          border-radius: 17px;
          color: #231f20;
          text-decoration: none;
          transition: background 160ms ease, transform 160ms ease;
        }

        .dashboard-quick-item:hover {
          background: #f7f5fb;
          transform: translateX(3px);
        }

        .dashboard-quick-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 13px;
          background: #eee8ff;
        }

        .dashboard-quick-copy {
          display: grid;
          gap: 4px;
        }

        .dashboard-quick-copy strong {
          font-size: 14px;
          font-weight: 600;
        }

        .dashboard-quick-copy small {
          overflow: hidden;
          max-width: 520px;
          color: rgba(35, 31, 32, 0.5);
          font-size: 11px;
          line-height: 1.4;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dashboard-arrow {
          color: rgba(35, 31, 32, 0.42);
          font-size: 16px;
        }

        .dashboard-total-pill {
          padding: 7px 10px;
          border-radius: 999px;
          background: #f0ebff;
          color: #61577b;
          font-size: 11px;
          font-weight: 700;
        }

        .dashboard-breakdown-list {
          display: grid;
          gap: 18px;
          margin-top: 26px;
        }

        .dashboard-breakdown-row {
          display: grid;
          gap: 8px;
        }

        .dashboard-breakdown-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #231f20;
          font-size: 12px;
        }

        .dashboard-breakdown-name {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          color: rgba(35, 31, 32, 0.68);
        }

        .dashboard-breakdown-meta strong {
          font-size: 12px;
          font-weight: 700;
        }

        .dashboard-progress {
          overflow: hidden;
          height: 7px;
          border-radius: 999px;
          background: #f1efed;
        }

        .dashboard-progress span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: #c8bbfb;
        }

        .dashboard-site-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          padding: 28px 30px;
          border: 1px solid rgba(35, 31, 32, 0.08);
          border-radius: 26px;
          background: #f9f8f6;
        }

        .dashboard-site-card p {
          max-width: 620px;
          margin: 10px 0 0;
          color: rgba(35, 31, 32, 0.56);
          font-size: 13px;
          line-height: 1.55;
        }

        .dashboard-site-button {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 8px;
          padding: 13px 17px;
          border-radius: 999px;
          background: #231f20;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .dashboard-site-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(35, 31, 32, 0.16);
        }

        @media (max-width: 1100px) {
          .dashboard-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .dashboard-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 760px) {
          .lalu-dashboard { gap: 24px; }

          .dashboard-hero {
            min-height: 260px;
            padding: 28px 22px;
            border-radius: 24px;
          }

          .dashboard-hero-mark {
            top: 24px;
            right: 12px;
            width: 110px;
            height: 110px;
            transform: none;
            opacity: 0.46;
          }

          .dashboard-orbit-one { width: 80px; height: 80px; }
          .dashboard-orbit-two { width: 108px; height: 108px; }

          .dashboard-flower {
            width: 54px;
            height: 54px;
            font-size: 30px;
          }

          .dashboard-section-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 4px;
          }

          .dashboard-stats {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .dashboard-stat {
            min-height: 170px;
            padding: 17px;
            border-radius: 19px;
          }

          .dashboard-panel {
            padding: 20px;
            border-radius: 22px;
          }

          .dashboard-quick-copy small { max-width: 190px; }

          .dashboard-site-card {
            align-items: flex-start;
            flex-direction: column;
            padding: 22px;
            border-radius: 22px;
          }

          .dashboard-site-button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 460px) {
          .dashboard-stats { grid-template-columns: 1fr; }
          .dashboard-stat { min-height: 158px; }
          .dashboard-stat p { min-height: auto; }
        }
      `}</style>
    </main>
  );
}
