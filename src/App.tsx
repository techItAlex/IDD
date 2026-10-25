import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Home as HomeIcon,
  Map,
  Users,
  User,
  Plus,
  Search,
  Bell,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  SlidersHorizontal,
  ChevronRight,
  Star,
  Clock,
  Footprints,
  Shuffle,
  Train,
  Bus,
  Car,
  Check,
  Heart,
  MessageCircle,
  Share2,
  Settings as SettingsIcon,
  LogIn,
  Lock,
  Camera,
  Send,
  Filter,
  Trash2,
  X,
  Trophy,
  HelpCircle,
  Compass,
  Menu,
} from "lucide-react";
import homeTransitImage from "./assets/images/illustrations/home-transit.png";
import { routes as seed, users, type Route, type Question } from "./data";
import { useApp } from "./store";
import { getImage } from "./lib/images";
const cx = (...a: (string | false | undefined)[]) =>
  a.filter(Boolean).join(" ");
const money = (n: number) => `₱${n}`;
const person = (id: string) => users.find((u) => u.id === id) || users[0];
function Status({ status }: { status: Route["status"] }) {
  const labels: any = {
    verified: "Verified",
    unverified: "Unverified",
    checking: "For checking",
    pending: "Pending",
  };
  return <span className={"status " + status}>{labels[status]}</span>;
}
function Mode({ mode }: { mode: string }) {
  const I: any = {
    jeepney: Bus,
    bus: Bus,
    mrt: Train,
    lrt: Train,
    uv: Car,
    taxi: Car,
    train: Train,
    walk: Footprints,
  };
  const Icon = I[mode] || Train;
  return (
    <span className="mode">
      <Icon size={15} />
      {mode === "mrt"
        ? "MRT-3"
        : mode === "lrt"
          ? "LRT-2"
          : mode === "uv"
            ? "UV Express"
            : mode === "taxi"
              ? "Taxi/Grab"
              : mode[0].toUpperCase() + mode.slice(1)}
    </span>
  );
}
function Avatar({ name = "Alex Santos" }: { name?: string }) {
  return (
    <span className="avatar">
      {name
        .split(" ")
        .map((x) => x[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}
function AppImage({ route, large = false }: { route: Route; large?: boolean }) {
  const image = getImage(`routes/${route.id}`);
  return (
    <div className={cx("route-image", large && "large")}>
      {image ? (
        <img src={image} loading="lazy" alt={route.title} />
      ) : (
        <>
          <div className="skyline">▥　▦　▥　▧　▥</div>
          <div className="mini-jeep">🚌</div>
          <span>
            {route.origin} → {route.destination}
          </span>
        </>
      )}
    </div>
  );
}
function Button({
  children,
  onClick,
  kind = "primary",
  disabled = false,
}: {
  children: any;
  onClick?: () => void;
  kind?: "primary" | "outline" | "ghost";
  disabled?: boolean;
}) {
  return (
    <button disabled={disabled} onClick={onClick} className={"btn " + kind}>
      {children}
    </button>
  );
}
function GoogleMark() {
  return (
    <span className="google-mark" aria-hidden="true">
      G
    </span>
  );
}
function SearchBox({ initial = "" }: { initial?: string }) {
  const [query, set] = useState(initial);
  const nav = useNavigate();
  return (
    <form
      className="searchbox"
      onSubmit={(e) => {
        e.preventDefault();
        nav("/search?q=" + encodeURIComponent(query || "Cubao to BGC"));
      }}
    >
      <Search size={19} />
      <input
        value={query}
        onChange={(e) => set(e.target.value)}
        placeholder="Where do you need to go?"
      />
      <button aria-label="Search">
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
function CommuteSearch() {
  const [from, setFrom] = useState(""),
    [to, setTo] = useState("");
  const nav = useNavigate();
  return (
    <form
      className="commute-search"
      onSubmit={(e) => {
        e.preventDefault();
        nav(
          "/search?q=" +
            encodeURIComponent(`${from || "Cubao"} to ${to || "BGC"}`),
        );
      }}
    >
      <input
        aria-label="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From: Origin or landmark"
      />
      <button
        type="button"
        aria-label="Swap origin and destination"
        onClick={() => {
          setFrom(to);
          setTo(from);
        }}
      >
        <ArrowUpDown size={17} />
      </button>
      <input
        aria-label="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To: Destination or landmark"
      />
      <button className="btn" aria-label="Find routes">
        <Search size={17} /> Find routes
      </button>
    </form>
  );
}
function RouteCard({ route, full = false }: { route: Route; full?: boolean }) {
  const save = useApp((s) => s.save),
    saved = useApp((s) => s.savedRouteIds.includes(route.id));
  return (
    <article className={"card route-card " + (full ? "full" : "")}>
      <Link to={"/route/" + route.id} className="route-card-main">
        <AppImage route={route} />
        <div className="route-copy">
          <div className="route-title">{route.title}</div>
          <div className="muted">
            {route.origin} <ArrowRight size={13} /> {route.destination}
          </div>
          <div className="mode-row">
            {route.modes.map((m) => (
              <Mode key={m} mode={m} />
            ))}
          </div>
          <div className="route-metrics">
            <b>{money(route.fare)}</b>
            <span>
              <Clock size={14} />
              {route.totalMinutes} min
            </span>
            <span>
              <Footprints size={14} />
              {route.walkingMinutes} min
            </span>
          </div>
          <div className="route-meta">
            <Status status={route.status} />
            <span>
              <Star size={14} fill="currentColor" className="star" />{" "}
              {route.rating} ({route.ratingCount})
            </span>
          </div>
        </div>
      </Link>
      <button
        className={cx("save-icon", saved && "saved")}
        aria-label="Save route"
        onClick={() => save(route.id)}
      >
        <Bookmark size={19} fill={saved ? "currentColor" : "none"} />
      </button>
    </article>
  );
}
function QuestionCard({ q }: { q: Question }) {
  const store = useApp();
  const aCount = q.answerIds.length;
  return (
    <article className="card q-card">
      <Link to={"/question/" + q.id} className="q-main">
        <div className="q-label">
          {q.type === "direction" ? "DIRECTION REQUEST" : "ABOUT A ROUTE"}
        </div>
        <h3>{q.title}</h3>
        <p className="muted">{q.body}</p>
        <div className="chips">
          {q.tags.map((t) => (
            <span className="tag" key={t}>
              #{t}
            </span>
          ))}
        </div>
        <div className="q-meta">
          <span>
            <MessageCircle size={15} />
            {aCount} answers
          </span>
          <span>{q.timeAgo}</span>
        </div>
      </Link>
      <button
        className={cx("upvote", store.upvoted.includes(q.id) && "active")}
        onClick={() => store.upvote(q.id)}
      >
        <span>▲</span>
        {q.upvotes}
      </button>
    </article>
  );
}
function Toast() {
  const toast = useApp((s) => s.toast);
  return toast ? (
    <div className="toast">
      <Check size={17} />
      {toast}
    </div>
  ) : null;
}
function LoginPrompt() {
  const open = useApp((s) => s.loginOpen),
    set = useApp.setState;
  const login = useApp((s) => s.login),
    [email, setEmail] = useState(false),
    [loading, setLoading] = useState(false);
  if (!open) return null;
  const signIn = () => {
    setLoading(true);
    window.setTimeout(() => {
      login();
      setLoading(false);
      setEmail(false);
    }, 1000);
  };
  return (
    <div
      className="overlay"
      onMouseDown={(e) =>
        e.target === e.currentTarget && set({ loginOpen: false, pending: null })
      }
    >
      <section className="dialog">
        <button
          className="dialog-close"
          onClick={() => set({ loginOpen: false, pending: null })}
        >
          <X />
        </button>
        <div className="round-icon">
          <Lock />
        </div>
        <h2>Join the commuter community</h2>
        <p className="muted">
          Sign in to save routes, ask questions, and earn points.
        </p>
        {email && (
          <form
            className="login-fields"
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <input
              placeholder="Email address"
              type="text"
              inputMode="email"
              required
            />
            <input placeholder="Password" type="password" required />
            <Button disabled={loading}>
              {loading ? "Signing you in…" : "Continue with email"}
            </Button>
          </form>
        )}
        <Button onClick={signIn} disabled={loading}>
          <GoogleMark />
          {loading ? "Signing you in…" : "Continue with Google"}
        </Button>
        {!email && (
          <Button kind="outline" onClick={() => setEmail(true)}>
            Continue with email
          </Button>
        )}
        <button
          className="text-btn"
          onClick={() => set({ loginOpen: false, pending: null })}
        >
          Maybe later
        </button>
      </section>
    </div>
  );
}
function Shell() {
  const loc = useLocation(),
    nav = useNavigate(),
    login = useApp((s) => s.login),
    logged = useApp((s) => s.isLoggedIn),
    hasEntered = useApp((s) => s.hasEntered),
    open = useApp((s) => s.requireLogin),
    unread = useApp((s) => s.notifications.some((n) => !n.read));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);
  return (
    <>
      <header className="topnav">
        <Link to="/" className="brand">
          <span className="brand-mark">idd</span>
          <span>
            <b>isang daang daan</b>
            <small>COMMUTE BETTER, TOGETHER.</small>
          </span>
        </Link>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/guides">Guides</NavLink>
          <NavLink to="/community">Community</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
        <div className="nav-search">
          <SearchBox />
        </div>
        <Button
          onClick={() =>
            logged ? nav("/contribute") : open(() => nav("/contribute"))
          }
        >
          <Plus size={18} /> Contribute
        </Button>
        <Link to="/notifications" className="bell">
          <Bell />
          {unread && <i />}
        </Link>
        {logged ? (
          <Link to="/profile">
            <Avatar />
          </Link>
        ) : (
          <Button
            kind="outline"
            onClick={() =>
              nav("/login", { state: { from: loc.pathname + loc.search } })
            }
          >
            <LogIn size={16} /> Log in
          </Button>
        )}
      </header>
      <main className="page">
        {!hasEntered && loc.pathname !== "/login" ? (
          <Login returnTo={loc.pathname + loc.search} />
        ) : (
          <Outlet />
        )}
      </main>
      <nav className="bottom-nav">
        <NavLink to="/" end>
          <HomeIcon />
          Home
        </NavLink>
        <NavLink to="/guides">
          <Map />
          Guides
        </NavLink>
        <Link
          className="plus-tab"
          to="/contribute"
          onClick={(event) => {
            if (!logged) {
              event.preventDefault();
              open(() => nav("/contribute"));
            }
          }}
        >
          <Plus />
        </Link>
        <NavLink to="/community">
          <Users />
          Community
        </NavLink>
        <NavLink to="/profile">
          <User />
          Profile
        </NavLink>
      </nav>
      <Toast />
      <LoginPrompt />
    </>
  );
}
function Header({
  title,
  back = true,
  right,
}: {
  title: string;
  back?: boolean;
  right?: any;
}) {
  const nav = useNavigate();
  return (
    <div className="page-header">
      {back && (
        <button className="back" onClick={() => nav(-1)}>
          <ArrowLeft />
        </button>
      )}
      <div>
        <small className="crumb">IDD / {title}</small>
        <h1>{title}</h1>
      </div>
      <div className="header-actions">{right}</div>
    </div>
  );
}
function Home() {
  const logged = useApp((s) => s.isLoggedIn),
    open = useApp((s) => s.requireLogin),
    nav = useNavigate(),
    questions = useApp((s) => s.questions);
  return (
    <>
      <div className="mobile-brand">
        <Link to="/" className="brand">
          <span className="brand-mark">idd</span>
          <span>
            <b>isang daang daan</b>
            <small>COMMUTE BETTER, TOGETHER.</small>
          </span>
        </Link>
        <Link className="bell" to="/notifications">
          <Bell />
          <i />
        </Link>
        {!logged && (
          <Link className="mobile-login" to="/login" state={{ from: "/" }}>
            Log in
          </Link>
        )}
      </div>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">COMMUTE BETTER, TOGETHER</p>
          <h1>Good morning, {logged ? "Alex" : "Commuter"}!</h1>
          <p className="hero-lead">Where do you need to go?</p>
          <CommuteSearch />
          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => nav("/search?q=Cubao%20to%20BGC")}>
              Cubao to BGC
            </button>
            <button onClick={() => nav("/search?q=SM%20North")}>
              SM North
            </button>
          </div>
        </div>
        <div className="hero-art">
          <img
            className="hero-art-image"
            src={homeTransitImage}
            alt="Illustration of a jeepney and train traveling between two stops"
          />
        </div>
      </section>
      <Section title="Trending routes" action="See all" to="/guides">
        <div className="trending-grid">
          {seed
            .filter((r) => r.trending)
            .map((r) => (
              <RouteCard key={r.id} route={r} />
            ))}
        </div>
      </Section>
      <Section title="Make your commute easier">
        <div className="quick-grid">
          <button className="quick" onClick={() => nav("/search/recent")}>
            <Search />
            <b>Search a route</b>
            <span>Find your best way there</span>
          </button>
          <button
            className="quick peach"
            onClick={() => open(() => nav("/contribute"))}
          >
            <Plus />
            <b>Share a route</b>
            <span>Help fellow commuters</span>
          </button>
          <button
            className="quick lavender"
            onClick={() => open(() => nav("/ask"))}
          >
            <MessageCircle />
            <b>Ask the community</b>
            <span>Get local advice</span>
          </button>
        </div>
      </Section>
      <Link to="/rewards" className="rewards-banner">
        <Trophy />
        <div>
          <b>Earn points. Unlock rewards.</b>
          <span>Every helpful contribution gets you closer.</span>
        </div>
        <ChevronRight />
      </Link>
      <Section title="From the community" action="See all" to="/community">
        <div className="community-preview">
          {questions.slice(0, 2).map((q) => (
            <QuestionCard key={q.id} q={q} />
          ))}
        </div>
      </Section>
    </>
  );
}
function Section({
  title,
  action,
  to,
  children,
}: {
  title: string;
  action?: string;
  to?: string;
  children: any;
}) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {action && (
          <Link to={to || "/"}>
            {action} <ArrowRight size={15} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
function FilterPanel({ mobile = false }: { mobile?: boolean }) {
  const state = useApp((s) => s.filter),
    set = useApp.setState;
  return (
    <div className={cx("filter-panel", mobile && "filter-mobile")}>
      <h3>Sort by</h3>
      {[
        "Recommended",
        "Cheapest",
        "Fastest",
        "Least Walking",
        "Fewest Transfers",
        "Weather-Friendly",
      ].map((x) => (
        <label className="radio-row" key={x}>
          <input
            type="radio"
            checked={state.sort === x}
            onChange={() => set({ filter: { ...state, sort: x } })}
          />
          {x}
        </label>
      ))}
      <h3>Time of day</h3>
      <select
        value={state.time}
        onChange={(e) => set({ filter: { ...state, time: e.target.value } })}
      >
        {["Any", "Morning", "Midday", "Evening", "Night"].map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
      <h3>Route type</h3>
      {[
        ["mrt", "With MRT/LRT"],
        ["bus", "With Bus"],
        ["jeepney", "With Jeepney/PUV"],
        ["uv", "With UV Express"],
      ].map(([key, label]) => (
        <label className="radio-row" key={key}>
          <input
            type="checkbox"
            checked={state.modes.includes(key)}
            onChange={(e) =>
              set({
                filter: {
                  ...state,
                  modes: e.target.checked
                    ? [...state.modes, key]
                    : state.modes.filter((x) => x !== key),
                },
              })
            }
          />
          {label}
        </label>
      ))}
      <button
        className="text-btn"
        onClick={() =>
          set({ filter: { sort: "Recommended", time: "Any", modes: [] } })
        }
      >
        Reset filters
      </button>
    </div>
  );
}
function Guides() {
  const f = useApp((s) => s.filter),
    set = useApp.setState,
    nav = useNavigate(),
    [show, setShow] = useState(false),
    [chip, setChip] = useState("All");
  let list = [...useApp.getState().routes];
  if (f.modes.length)
    list = list.filter((r) => f.modes.some((m) => r.modes.includes(m as any)));
  if (f.time !== "Any")
    list = list.filter((r) => r.timeOfDay?.includes(f.time.toLowerCase()));
  if (chip === "Cheapest" || f.sort === "Cheapest")
    list.sort((a, b) => a.fare - b.fare);
  if (chip === "Fastest" || f.sort === "Fastest")
    list.sort((a, b) => a.totalMinutes - b.totalMinutes);
  if (chip === "Least Walk" || f.sort === "Least Walking")
    list.sort((a, b) => a.walkingMinutes - b.walkingMinutes);
  if (f.sort === "Fewest Transfers")
    list.sort((a, b) => a.transfers - b.transfers);
  if (f.sort === "Weather-Friendly")
    list.sort(
      (a, b) =>
        ({ sheltered: 0, partial: 1, exposed: 2 })[a.exposure] -
        { sheltered: 0, partial: 1, exposed: 2 }[b.exposure],
    );
  return (
    <>
      <Header
        title="Route guides"
        right={
          <>
            <button className="icon-btn" onClick={() => nav("/compare")}>
              <Shuffle />
            </button>
            <button className="icon-btn" onClick={() => nav("/saved")}>
              <Bookmark />
            </button>
          </>
        }
      />
      <div className="guide-toolbar">
        <SearchBox />
        <div className="chips quick-chips">
          {["All", "Cheapest", "Fastest", "Least Walk"].map((x) => (
            <button
              className={chip === x ? "selected" : ""}
              onClick={() => {
                setChip(x);
                set({
                  filter: {
                    ...f,
                    sort:
                      x === "All"
                        ? "Recommended"
                        : x === "Least Walk"
                          ? "Least Walking"
                          : x,
                  },
                });
              }}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        <button
          className="btn outline mobile-filter"
          onClick={() => setShow(true)}
        >
          <SlidersHorizontal /> Filter
        </button>
      </div>
      <div className="guide-layout">
        <aside>
          <FilterPanel />
        </aside>
        <div className="guide-results">
          <div className="results-heading">
            <b>{list.length} route guides</b>
            <button
              className="icon-btn mobile-filter-icon"
              onClick={() => setShow(true)}
            >
              <Filter />
            </button>
          </div>
          {list.length ? (
            <div className="guide-grid">
              {list.map((r) => (
                <RouteCard key={r.id} route={r} full />
              ))}
            </div>
          ) : (
            <Empty
              title="No routes match these filters"
              detail="Try resetting your filters to see more routes."
              action="Reset filters"
              onClick={() =>
                set({ filter: { sort: "Recommended", time: "Any", modes: [] } })
              }
            />
          )}
        </div>
      </div>
      {show && (
        <Modal title="Filter & Sort" close={() => setShow(false)}>
          <FilterPanel mobile />
          <Button onClick={() => setShow(false)}>Apply filters</Button>
        </Modal>
      )}
    </>
  );
}
function Modal({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: any;
}) {
  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <section className="dialog">
        <button className="dialog-close" onClick={close}>
          <X />
        </button>
        <h2>{title}</h2>
        {children}
      </section>
    </div>
  );
}
function Empty({
  title,
  detail,
  action,
  onClick,
}: {
  title: string;
  detail: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="empty">
      <div className="empty-art">🚌</div>
      <h2>{title}</h2>
      <p>{detail}</p>
      <Button onClick={onClick}>{action}</Button>
    </div>
  );
}
function SearchPage() {
  const loc = useLocation(),
    nav = useNavigate(),
    store = useApp(),
    params = new URLSearchParams(loc.search),
    initial = params.get("q") || "",
    [q, setQ] = useState(initial),
    [tab, setTab] = useState("Guides"),
    [filter, setFilter] = useState(false);
  const results = store.routes.filter((r) =>
    (r.title + " " + r.origin + " " + r.destination + " " + r.tags.join(" "))
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  const qs = store.questions.filter((x) =>
    (x.title + " " + x.body + " " + x.tags.join(" "))
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  const submit = (e: any) => {
    e.preventDefault();
    const next = q.trim();
    if (!next) return;
    useApp.setState((s) => ({
      recent: [
        next,
        ...s.recent.filter((x) => x.toLowerCase() !== next.toLowerCase()),
      ].slice(0, 8),
    }));
    nav("/search?q=" + encodeURIComponent(next));
  };
  return (
    <>
      <Header title="Search routes & answers" />
      <form className="searchbox big-search" onSubmit={submit}>
        <Search />
        <input
          autoFocus
          placeholder="Search places, routes, or questions"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && (
          <button type="button" onClick={() => setQ("")}>
            <X />
          </button>
        )}
        <button>
          <ArrowRight />
        </button>
      </form>
      {!q || loc.pathname.endsWith("/recent") ? (
        <section className="section">
          <h2>Recent searches</h2>
          <div className="recent-list">
            {store.recent.map((x) => (
              <button
                key={x}
                onClick={() => {
                  setQ(x);
                  nav("/search?q=" + encodeURIComponent(x));
                }}
              >
                <Clock size={16} />
                {x}
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </section>
      ) : (
        <>
          <div className="search-tabs">
            {["Guides", "Questions"].map((x) => (
              <button
                className={tab === x ? "active" : ""}
                onClick={() => setTab(x)}
              >
                {x} ({x === "Guides" ? results.length : qs.length})
              </button>
            ))}
            <button className="icon-btn" onClick={() => setFilter(true)}>
              <Filter />
            </button>
          </div>
          {tab === "Guides" ? (
            results.length ? (
              <div className="guide-grid">
                {results.map((r) => (
                  <RouteCard key={r.id} route={r} />
                ))}
              </div>
            ) : (
              <Empty
                title="No results found"
                detail="Try another search, or ask the community for help."
                action="Ask a question"
                onClick={() => nav("/ask")}
              />
            )
          ) : qs.length ? (
            <div className="community-list">
              {qs.map((x) => (
                <QuestionCard key={x.id} q={x} />
              ))}
            </div>
          ) : (
            <Empty
              title="No results found"
              detail="Start a conversation or browse discussions."
              action="Browse all discussions"
              onClick={() => nav("/community")}
            />
          )}
        </>
      )}
      {filter && (
        <Modal title="Filter results" close={() => setFilter(false)}>
          <FilterPanel mobile />
          <Button onClick={() => setFilter(false)}>Apply filters</Button>
        </Modal>
      )}
    </>
  );
}
function RouteDetail() {
  const { id = "r1" } = useParams(),
    route = useApp((s) => s.routes.find((r) => r.id === id)),
    nav = useNavigate(),
    save = useApp((s) => s.save),
    compare = useApp((s) => s.compare),
    open = useApp((s) => s.requireLogin);
  if (!route)
    return (
      <Empty
        title="Route not found"
        detail="Browse the guides to find another route."
        action="Browse guides"
        onClick={() => nav("/guides")}
      />
    );
  const questions = useApp((s) => s.questions);
  const linked = questions.filter((q) => q.routeId === id);
  return (
    <>
      <Header
        title="Route details"
        right={
          <>
            <button
              className="icon-btn"
              onClick={() => {
                navigator.clipboard?.writeText(location.href);
                useApp.getState().addToast("Link copied");
              }}
            >
              <Share2 />
            </button>
            <button className="icon-btn" onClick={() => save(id)}>
              <Bookmark />
            </button>
          </>
        }
      />
      <div className="detail-layout">
        <div>
          <AppImage route={route} large />
          <div className="detail-title">
            <div>
              <h1>{route.title}</h1>
              <p>
                {route.origin} <ArrowRight size={15} /> {route.destination}
              </p>
              <div className="route-meta">
                <Status status={route.status} />
                <span>
                  <Star className="star" fill="currentColor" size={15} />{" "}
                  {route.rating} ({route.ratingCount} ratings)
                </span>
              </div>
            </div>
          </div>
          <div className="stats-grid">
            {[
              ["Fare", money(route.fare)],
              ["Total time", `${route.totalMinutes} min`],
              ["Transfers", String(route.transfers)],
              ["Walking", `${route.walkingMinutes} min`],
            ].map(([a, b]) => (
              <div className="stat card">
                <span>{a}</span>
                <b>{b}</b>
              </div>
            ))}
          </div>
          <Section title="Route overview">
            <div className="timeline">
              {route.steps.map((s, i) => (
                <div className="step" key={i}>
                  <span className="step-dot" />
                  <Mode mode={s.mode} />
                  <div>
                    <b>{s.text}</b>
                    <p className="muted">
                      {s.minutes} min {s.fare ? `· ${money(s.fare)}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <div className="card info-card">
            <h3>Weather exposure</h3>
            <p>
              {route.exposure === "sheltered"
                ? "Sheltered"
                : route.exposure === "partial"
                  ? "Partly exposed"
                  : "Exposed"}{" "}
              along part of this journey
            </p>
            <RouteLine />
          </div>
          <Section title="Experience & tips">
            <div className="chips">
              {route.tags.map((t) => (
                <span className="tag">{t}</span>
              ))}
            </div>
            <ul className="tips">
              {route.tips.map((t) => (
                <li>{t}</li>
              ))}
            </ul>
            <div className="verified-by">
              <Avatar name={person(route.authorId).name} />
              <span>
                Shared by <b>{person(route.authorId).name}</b>
              </span>
            </div>
          </Section>
          <Section title="Questions about this route">
            {linked.length ? (
              linked.map((q) => <QuestionCard key={q.id} q={q} />)
            ) : (
              <div className="card inline-empty">
                No questions yet. Be the first to ask about this route.
                <Button
                  kind="outline"
                  onClick={() => open(() => nav(`/route/${id}/ask`))}
                >
                  Ask about this route
                </Button>
              </div>
            )}
          </Section>
        </div>
        <aside className="summary-card card">
          <h3>Route summary</h3>
          <div className="summary-stats">
            <p>
              Fare <b>{money(route.fare)}</b>
            </p>
            <p>
              Total time <b>{route.totalMinutes} min</b>
            </p>
            <p>
              Transfers <b>{route.transfers}</b>
            </p>
            <p>
              Walking <b>{route.walkingMinutes} min</b>
            </p>
          </div>
          <Button onClick={() => save(id)}>
            <Bookmark size={16} /> Save route
          </Button>
          <Button
            kind="outline"
            onClick={() => open(() => nav(`/route/${id}/ask`))}
          >
            Ask about this route
          </Button>
          <Button kind="outline" onClick={() => compare(id)}>
            Add to compare
          </Button>
          <Button
            kind="ghost"
            onClick={() =>
              open(() => {
                useApp.setState((s) => ({
                  routes: s.routes.map((r) =>
                    r.id === id
                      ? { ...r, helpfulCount: r.helpfulCount + 1 }
                      : r,
                  ),
                }));
                useApp.getState().addToast("Thanks for your feedback!");
              })
            }
          >
            Helpful 👍 ({route.helpfulCount})
          </Button>
        </aside>
      </div>
      <div className="sticky-actions">
        <Button kind="outline" onClick={() => save(id)}>
          <Bookmark /> Save
        </Button>
        <Button onClick={() => open(() => nav(`/route/${id}/ask`))}>
          <MessageCircle /> Ask
        </Button>
      </div>
    </>
  );
}
function RouteLine() {
  return (
    <svg viewBox="0 0 500 70" className="route-line">
      <path
        d="M30 38 C90 38 90 18 155 18 S235 52 300 52 390 24 470 24"
        fill="none"
        stroke="#1f5a3f"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="30" cy="38" r="8" fill="#f2b531" />
      <circle
        cx="155"
        cy="18"
        r="7"
        fill="white"
        stroke="#1f5a3f"
        strokeWidth="4"
      />
      <circle
        cx="300"
        cy="52"
        r="7"
        fill="white"
        stroke="#1f5a3f"
        strokeWidth="4"
      />
      <circle cx="470" cy="24" r="8" fill="#1f5a3f" />
    </svg>
  );
}
function AskForm({ routeId }: { routeId?: string }) {
  const nav = useNavigate(),
    store = useApp(),
    [title, setTitle] = useState(""),
    [body, setBody] = useState(""),
    [tags, setTags] = useState<string[]>([]),
    [photo, setPhoto] = useState(""),
    [type, setType] = useState<"direction" | "route">(
      routeId ? "route" : "direction",
    );
  const submit = (e: any) => {
    e.preventDefault();
    if (!title.trim()) return;
    store.requireLogin(() => {
      const id = "q" + Date.now();
      store.postQuestion({
        id,
        type,
        title,
        body,
        tags,
        askerId: "u-alex",
        timeAgo: "Just now",
        upvotes: 0,
        routeId,
        answerIds: [],
      });
      nav("/question/" + id);
    });
  };
  return (
    <form className="card form-card" onSubmit={submit}>
      {!routeId && (
        <>
          <div className="segmented">
            <button
              type="button"
              className={type === "direction" ? "active" : ""}
              onClick={() => setType("direction")}
            >
              Direction request
            </button>
            <button
              type="button"
              className={type === "route" ? "active" : ""}
              onClick={() => setType("route")}
            >
              About a route
            </button>
          </div>
          {type === "route" && (
            <select onChange={(e) => {}}>
              <option>Select a route...</option>
              {useApp.getState().routes.map((r) => (
                <option value={r.id}>{r.title}</option>
              ))}
            </select>
          )}
        </>
      )}
      <label>Your question *</label>
      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. How do I get from Cubao to BGC?"
      />
      <label>Optional details</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add context to help the community answer..."
      />
      <label>Tags</label>
      <div className="chips">
        {[
          "buses",
          "safety",
          "fare",
          "crowding",
          "jeepney",
          "lrt",
          "makati",
        ].map((t) => (
          <button
            type="button"
            className={"tag " + (tags.includes(t) ? "selected" : "")}
            onClick={() =>
              setTags(
                tags.includes(t) ? tags.filter((x) => x !== t) : [...tags, t],
              )
            }
          >
            #{t}
          </button>
        ))}
      </div>
      <label className="upload">
        {" "}
        <Camera size={17} /> Add photo
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] &&
            setPhoto(URL.createObjectURL(e.target.files[0]))
          }
        />
      </label>
      {photo && <img className="photo-preview" src={photo} />}
      <Button disabled={!title.trim()}>
        <Send size={16} /> Post question
      </Button>
    </form>
  );
}
function Ask() {
  return (
    <>
      <Header title="Ask the community" />
      <p className="page-lead">
        Get helpful, local advice from fellow commuters.
      </p>
      <AskForm />
    </>
  );
}
function AskRoute() {
  const { id = "r1" } = useParams(),
    r = useApp((s) => s.routes.find((x) => x.id === id));
  return (
    <>
      <Header title="Ask about this route" />
      <p className="page-lead">
        Your question will be linked to <b>{r?.title}</b>.
      </p>
      <AskForm routeId={id} />
    </>
  );
}
function Community() {
  const store = useApp(),
    [kind, setKind] = useState("All"),
    [tag, setTag] = useState(""),
    [query, setQuery] = useState("");
  const list = store.questions.filter(
    (q) =>
      (kind === "All" ||
        (kind === "Direction Requests"
          ? q.type === "direction"
          : q.type === "route")) &&
      (!tag || q.tags.includes(tag)) &&
      (q.title + " " + q.body + " " + q.tags.join(" "))
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const nav = useNavigate();
  return (
    <>
      <Header
        title="Community"
        right={
          <Button onClick={() => store.requireLogin(() => nav("/ask"))}>
            <Plus /> Ask a question
          </Button>
        }
      />
      <div className="community-layout">
        <div>
          <div className="searchbox">
            <Search />
            <input
              placeholder="Search questions or #tag"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => setQuery("")}>
              <X />
            </button>
          </div>
          <div className="segmented community-segments">
            {["All", "Direction Requests", "Route Questions"].map((x) => (
              <button
                className={kind === x ? "active" : ""}
                onClick={() => setKind(x)}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="chips trending-tags">
            {["jeepney", "lrt", "safety", "fare", "makati"].map((t) => (
              <button
                className={"tag " + (tag === t ? "selected" : "")}
                onClick={() => setTag(tag === t ? "" : t)}
              >
                #{t}
              </button>
            ))}
          </div>
          <div className="community-list">
            {list.length ? (
              list.map((q) => <QuestionCard key={q.id} q={q} />)
            ) : (
              <Empty
                title="No questions found"
                detail="Try another tag or ask the community."
                action="Ask a question"
                onClick={() => nav("/ask")}
              />
            )}
          </div>
        </div>
        <aside className="community-sidebar card">
          <h2>Have a commute question?</h2>
          <p>Our community is happy to help you find your way.</p>
          <Button onClick={() => store.requireLogin(() => nav("/ask"))}>
            Ask a question
          </Button>
          <h3>Trending tags</h3>
          {["#jeepney", "#lrt", "#safety", "#fare", "#makati"].map((t) => (
            <button className="trend-row" onClick={() => setTag(t.slice(1))}>
              {t}
              <ChevronRight size={15} />
            </button>
          ))}
          <h3>Top contributors</h3>
          {users.slice(1, 4).map((u, i) => (
            <div className="contributor">
              <Avatar name={u.name} />
              <span>
                <b>{u.name}</b>
                <small>{[540, 420, 380][i]} pts</small>
              </span>
              <Star className="star" size={15} />
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
function Thread() {
  const { id = "" } = useParams(),
    nav = useNavigate(),
    store = useApp(),
    q = store.questions.find((x) => x.id === id),
    [reply, setReply] = useState(""),
    [answer, setAnswer] = useState(false),
    [text, setText] = useState("");
  if (!q)
    return (
      <Empty
        title="Question not found"
        detail="Browse community discussions."
        action="Community"
        onClick={() => nav("/community")}
      />
    );
  const answers = q.answerIds
    .map((a) => store.answers[a])
    .filter(Boolean)
    .sort((a, b) =>
      a.id === q.acceptedAnswerId ? -1 : b.id === q.acceptedAnswerId ? 1 : 0,
    );
  const me = store.isLoggedIn && q.askerId === "u-alex";
  return (
    <>
      <Header title="Community question" />
      <div className="thread-layout">
        <div>
          <div className="card thread-card">
            <div className="q-label">
              {q.type === "direction" ? "DIRECTION REQUEST" : "ABOUT A ROUTE"}
            </div>
            <h1>{q.title}</h1>
            <p>{q.body}</p>
            <div className="chips">
              {q.tags.map((t) => (
                <span className="tag">#{t}</span>
              ))}
            </div>
            <div className="thread-author">
              <Avatar name={person(q.askerId).name} />
              <b>{person(q.askerId).name}</b>
              <span>{q.timeAgo}</span>
            </div>
            <div className="thread-actions">
              <button className="upvote" onClick={() => store.upvote(q.id)}>
                ▲ {q.upvotes} Helpful
              </button>
              <span>
                <MessageCircle size={16} /> {q.answerIds.length} answers
              </span>
              <Button onClick={() => store.requireLogin(() => setAnswer(true))}>
                Answer
              </Button>
            </div>
          </div>
          {q.routeId && (
            <Link to={"/route/" + q.routeId} className="card linked-route">
              <b>About this route</b>
              <span>
                {store.routes.find((r) => r.id === q.routeId)?.title}{" "}
                <ArrowRight />
              </span>
            </Link>
          )}
          <div className="section-head">
            <h2>{answers.length} Answers</h2>
          </div>
          {answers.length ? (
            answers.map((a) => (
              <article
                className={cx(
                  "card answer-card",
                  q.acceptedAnswerId === a.id && "accepted",
                )}
              >
                <div className="answer-author">
                  <Avatar name={person(a.authorId).name} />
                  <div>
                    <b>{person(a.authorId).name}</b>
                    <span>
                      {a.timeAgo}
                      {person(a.authorId).verified && " · Verified contributor"}
                    </span>
                  </div>
                  {q.acceptedAnswerId === a.id && (
                    <span className="accepted-label">
                      <Check /> Accepted answer
                    </span>
                  )}
                </div>
                <p>{a.text}</p>
                <div className="answer-controls">
                  <button onClick={() => store.upvote(a.id)}>
                    ▲ {a.upvotes}
                  </button>
                  <button onClick={() => setReply(reply === a.id ? "" : a.id)}>
                    Reply
                  </button>
                  {me && q.acceptedAnswerId !== a.id && (
                    <button onClick={() => store.accept(q.id, a.id)}>
                      Mark as accepted
                    </button>
                  )}
                </div>
                {a.replies?.map((rep) => (
                  <div className="reply">
                    ↳ <b>{person(rep.authorId).name}:</b> {rep.text}
                  </div>
                ))}
                {reply === a.id && (
                  <div className="reply-form">
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Write a reply..."
                    />
                    <Button
                      onClick={() => {
                        if (text) {
                          useApp.setState((s) => ({
                            answers: {
                              ...s.answers,
                              [a.id]: {
                                ...a,
                                replies: [
                                  ...a.replies,
                                  {
                                    id: "rep" + Date.now(),
                                    text,
                                    authorId: "u-alex",
                                  },
                                ],
                              },
                            },
                          }));
                          setText("");
                          setReply("");
                          store.addToast("Reply posted");
                        }
                      }}
                    >
                      Post
                    </Button>
                  </div>
                )}
              </article>
            ))
          ) : (
            <Empty
              title="Be the first to answer"
              detail="Share what you know with this commuter."
              action="Answer question"
              onClick={() => store.requireLogin(() => setAnswer(true))}
            />
          )}
        </div>
        <aside className="community-sidebar card">
          <h3>Related questions</h3>
          {store.questions
            .filter((x) => x.id !== q.id)
            .slice(0, 4)
            .map((x) => (
              <Link to={"/question/" + x.id} className="related">
                {x.title}
                <ChevronRight size={14} />
              </Link>
            ))}
        </aside>
      </div>
      {answer && (
        <Modal title="Write an answer" close={() => setAnswer(false)}>
          <textarea
            className="modal-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share helpful details..."
          />
          <Button
            disabled={!text.trim()}
            onClick={() => {
              store.postAnswer(q.id, text);
              setText("");
              setAnswer(false);
            }}
          >
            Post answer
          </Button>
        </Modal>
      )}
    </>
  );
}
function Compare() {
  const ids = useApp((s) => s.compareIds),
    store = useApp(),
    nav = useNavigate(),
    [pick, setPick] = useState(false),
    selected = ids
      .map((id) => store.routes.find((r) => r.id === id))
      .filter(Boolean) as Route[];
  const add = (id: string) => {
    store.compare(id);
    setPick(false);
  };
  const rows: [string, (r: Route) => any][] = [
    ["Fare", (r) => money(r.fare)],
    ["Total time", (r) => `${r.totalMinutes} min`],
    ["Walking", (r) => `${r.walkingMinutes} min`],
    ["Transfers", (r) => r.transfers],
    ["Weather exposure", (r) => r.exposure],
    ["Rating", (r) => `★ ${r.rating} (${r.ratingCount})`],
    ["Modes", (r) => r.modes.map((m) => m.toUpperCase()).join(" · ")],
  ];
  const best = (row: number) => {
    if (!selected.length) return undefined;
    if (row === 5)
      return selected.reduce((a, b) => (a.rating >= b.rating ? a : b));
    if (row === 4) {
      const rank = (r: Route) =>
        r.exposure === "sheltered" ? 0 : r.exposure === "partial" ? 1 : 2;
      return selected.reduce((a, b) => (rank(a) <= rank(b) ? a : b));
    }
    if (row === 6) return undefined;
    const value = (r: Route) =>
      row === 0
        ? r.fare
        : row === 1
          ? r.totalMinutes
          : row === 2
            ? r.walkingMinutes
            : r.transfers;
    return selected.reduce((a, b) => (value(a) <= value(b) ? a : b));
  };
  return (
    <>
      <Header
        title="Compare routes"
        right={
          <Button kind="outline" onClick={() => setPick(true)}>
            <Plus /> Add route
          </Button>
        }
      />
      {selected.length < 2 && (
        <div className="inline-empty card">
          Add at least two routes to compare.{" "}
          <Button onClick={() => setPick(true)}>Choose routes</Button>
        </div>
      )}
      <div className="compare-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Compare</th>
              {selected.map((r) => (
                <th>
                  <button
                    className="route-col"
                    onClick={() => nav("/route/" + r.id)}
                  >
                    {r.title}
                  </button>
                  <button
                    className="remove"
                    onClick={() => store.compare(r.id)}
                  >
                    <X size={15} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, fn], i) => (
              <tr>
                <th>{label}</th>
                {selected.map((r) => (
                  <td className={best(i)?.id === r.id ? "best" : ""}>
                    {fn(r)}
                    {best(i)?.id === r.id && i < 3 && (
                      <small>
                        {["Cheapest", "Fastest", "Least walking"][i]}
                      </small>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pick && (
        <Modal title="Add a route to compare" close={() => setPick(false)}>
          {store.routes
            .filter((r) => !ids.includes(r.id))
            .map((r) => (
              <button className="pick-route" onClick={() => add(r.id)}>
                <span>
                  {r.title}
                  <small>
                    {r.origin} → {r.destination}
                  </small>
                </span>
                <b>
                  {money(r.fare)} · {r.totalMinutes} min
                </b>
              </button>
            ))}
        </Modal>
      )}
    </>
  );
}
function Saved() {
  const ids = useApp((s) => s.savedRouteIds),
    store = useApp();
  return (
    <>
      <Header title="Saved routes" />
      {ids.length ? (
        <div className="guide-grid">
          {store.routes
            .filter((r) => ids.includes(r.id))
            .map((r) => (
              <RouteCard key={r.id} route={r} full />
            ))}
        </div>
      ) : (
        <Empty
          title="No saved routes yet"
          detail="Tap the bookmark on any guide to save it here."
          action="Browse guides"
          onClick={() => location.assign("/guides")}
        />
      )}
    </>
  );
}
function Contribute() {
  const nav = useNavigate(),
    store = useApp();
  return (
    <>
      <Header title="Contribute" />
      <div className="contrib-intro">
        <div className="round-icon">
          <Heart />
        </div>
        <h1>Your experience matters!</h1>
        <p>Help make every commute a little easier.</p>
      </div>
      <div className="chooser-grid">
        <button
          className="chooser card"
          onClick={() => store.requireLogin(() => nav("/contribute/basic"))}
        >
          <span className="round-icon">
            <Map />
          </span>
          <h2>Share a route</h2>
          <p>Help others find their way with your local know-how.</p>
          <ArrowRight />
        </button>
        <button
          className="chooser card"
          onClick={() => store.requireLogin(() => nav("/ask"))}
        >
          <span className="round-icon peach-icon">
            <MessageCircle />
          </span>
          <h2>Ask a question</h2>
          <p>Get advice from commuters who know the way.</p>
          <ArrowRight />
        </button>
      </div>
    </>
  );
}
const steps = [
  "Basic Info",
  "Route Details",
  "Experience & Tips",
  "Review & Submit",
];
function Wizard() {
  const loc = useLocation(),
    nav = useNavigate(),
    store = useApp(),
    idx = loc.pathname.endsWith("details")
      ? 1
      : loc.pathname.endsWith("experience")
        ? 2
        : loc.pathname.endsWith("review")
          ? 3
          : 0,
    d = store.wizard;
  const update = (key: string, v: any) => store.setWizard({ ...d, [key]: v });
  const go = (n: number) =>
    nav("/contribute/" + ["basic", "details", "experience", "review"][n]);
  const valid =
    idx === 0
      ? !!d.origin && !!d.destination
      : idx === 1
        ? Number(d.fare) >= 0 && Number(d.totalMinutes) > 0
        : idx === 2
          ? !!d.modes?.length
          : true;
  const submit = () => {
    const route: Route = {
      id: "u" + Date.now(),
      title: `${d.origin} → ${d.destination}`,
      origin: d.origin,
      destination: d.destination,
      modes: d.modes || ["jeepney"],
      fare: +d.fare,
      totalMinutes: +d.totalMinutes,
      walkingMinutes: +(d.walkingMinutes || 0),
      walkingMeters: +(d.walkingMinutes || 0) * 70,
      transfers: +(d.transfers || 0),
      exposure: d.exposed ? "exposed" : "partial",
      steps: [
        {
          mode: (d.modes || ["jeepney"])[0],
          text: `Travel from ${d.origin} to ${d.destination}`,
          minutes: +d.totalMinutes,
          fare: +d.fare,
        },
      ],
      tags: d.tags || [],
      tips: d.tips ? [d.tips] : [],
      rating: 0,
      ratingCount: 0,
      status: "pending",
      authorId: "u-alex",
      helpfulCount: 0,
    };
    useApp.setState((s) => ({
      routes: [route, ...s.routes],
      points: s.points + 20,
      wizard: {},
    }));
    nav("/contribute/success?id=" + route.id);
  };
  if (loc.pathname.endsWith("success")) return <Success />;
  if (
    loc.pathname.includes("/contribute/") &&
    !["basic", "details", "experience", "review", "success"].some((x) =>
      loc.pathname.endsWith(x),
    )
  )
    return <Contribute />;
  return (
    <>
      <Header title="Share a route" />
      <div className="wizard-layout">
        <div className="card wizard-card">
          <div className="step-indicator">
            {steps.map((s, i) => (
              <div className={i === idx ? "current" : i < idx ? "done" : ""}>
                <span>{i < idx ? "✓" : i + 1}</span>
                <small>{s}</small>
              </div>
            ))}
          </div>
          <h2>{steps[idx]}</h2>
          {idx === 0 && (
            <>
              <label>From</label>
              <input
                value={d.origin || ""}
                onChange={(e) => update("origin", e.target.value)}
                placeholder="Origin or landmark"
              />
              <label>To</label>
              <input
                value={d.destination || ""}
                onChange={(e) => update("destination", e.target.value)}
                placeholder="Destination or landmark"
              />
              <p className="muted">
                You can add more details in the next step.
              </p>
            </>
          )}
          {idx === 1 && (
            <div className="field-grid">
              <label>
                Fare (₱)
                <input
                  type="number"
                  value={d.fare || ""}
                  onChange={(e) => update("fare", e.target.value)}
                />
              </label>
              <label>
                Total estimated time (min)
                <input
                  type="number"
                  value={d.totalMinutes || ""}
                  onChange={(e) => update("totalMinutes", e.target.value)}
                />
              </label>
              <label>
                Walking time (min)
                <input
                  type="number"
                  value={d.walkingMinutes || ""}
                  onChange={(e) => update("walkingMinutes", e.target.value)}
                />
              </label>
              <label>
                Transfers
                <input
                  type="number"
                  value={d.transfers || 0}
                  onChange={(e) => update("transfers", e.target.value)}
                />
              </label>
              <label>
                Weather exposure
                <select
                  value={d.exposed ? "Yes" : "No"}
                  onChange={(e) => update("exposed", e.target.value === "Yes")}
                >
                  <option>No · mostly sheltered</option>
                  <option>Yes · partly exposed</option>
                </select>
              </label>
            </div>
          )}
          {idx === 2 && (
            <>
              <label>Modes used</label>
              <div className="chips">
                {[
                  "Jeepney",
                  "Bus",
                  "LRT/MRT",
                  "UV Express",
                  "Taxi/Grab",
                  "Other",
                ].map((x) => (
                  <button
                    className={
                      "tag " +
                      (d.modes?.includes(x.toLowerCase()) ? "selected" : "")
                    }
                    onClick={() =>
                      update(
                        "modes",
                        d.modes?.includes(x.toLowerCase())
                          ? d.modes.filter((m: string) => m !== x.toLowerCase())
                          : [...(d.modes || []), x.toLowerCase()],
                      )
                    }
                  >
                    {x}
                  </button>
                ))}
              </div>
              <label>Experience tags</label>
              <div className="chips">
                {[
                  "Crowded",
                  "Safe",
                  "Transfer difficulty",
                  "Fast",
                  "Beginner friendly",
                ].map((x) => (
                  <button
                    className={"tag " + (d.tags?.includes(x) ? "selected" : "")}
                    onClick={() =>
                      update(
                        "tags",
                        d.tags?.includes(x)
                          ? d.tags.filter((m: string) => m !== x)
                          : [...(d.tags || []), x],
                      )
                    }
                  >
                    {x}
                  </button>
                ))}
              </div>
              <label>Tips</label>
              <textarea
                value={d.tips || ""}
                onChange={(e) => update("tips", e.target.value)}
                placeholder="Share tips for fellow commuters"
              />
              <label>
                Description{" "}
                <span className="muted">
                  {(d.description || "").length}/500
                </span>
              </label>
              <textarea
                maxLength={500}
                value={d.description || ""}
                onChange={(e) => update("description", e.target.value)}
              />
            </>
          )}
          {idx === 3 && (
            <div className="review-summary">
              <h3>
                {d.origin} → {d.destination}
              </h3>
              <p>
                Fare <b>{money(+d.fare || 0)}</b> · {d.totalMinutes} min ·{" "}
                {d.transfers || 0} transfers
              </p>
              <p>Modes: {(d.modes || []).join(", ")}</p>
              <p>{d.description}</p>
              <p>Tips: {d.tips}</p>
            </div>
          )}
          <div className="wizard-controls">
            <Button
              kind="outline"
              onClick={() => (idx === 0 ? nav("/contribute") : go(idx - 1))}
            >
              Back
            </Button>
            {idx < 3 ? (
              <Button disabled={!valid} onClick={() => go(idx + 1)}>
                Next <ArrowRight />
              </Button>
            ) : (
              <Button onClick={submit}>Submit route</Button>
            )}
          </div>
        </div>
        <aside className="wizard-preview">
          <h3>Live preview</h3>
          <RouteCard
            route={{
              id: "draft",
              title:
                d.origin && d.destination
                  ? `${d.origin} → ${d.destination}`
                  : "Your route preview",
              origin: d.origin || "Origin",
              destination: d.destination || "Destination",
              modes: d.modes || [],
              fare: +d.fare || 0,
              totalMinutes: +d.totalMinutes || 0,
              walkingMinutes: +d.walkingMinutes || 0,
              walkingMeters: 0,
              transfers: +d.transfers || 0,
              exposure: "partial",
              steps: [],
              tags: d.tags || [],
              tips: [],
              rating: 0,
              ratingCount: 0,
              status: "pending",
              authorId: "u-alex",
              helpfulCount: 0,
            }}
            full
          />
        </aside>
      </div>
    </>
  );
}
function Success() {
  const nav = useNavigate(),
    id = new URLSearchParams(location.search).get("id") || "";
  return (
    <div className="success card">
      <div className="success-check">
        <Check size={36} />
      </div>
      <p className="eyebrow">THANK YOU FOR SHARING</p>
      <h1>Route submitted!</h1>
      <p>
        Thank you for sharing your experience. It will be reviewed by the
        community and may appear in the guides soon.
      </p>
      <Button onClick={() => nav("/my-guide/" + id)}>View my guide</Button>
      <Button kind="outline" onClick={() => nav("/")}>
        Back to Home
      </Button>
    </div>
  );
}
function MyGuide() {
  const { id = "" } = useParams(),
    r = useApp((s) => s.routes.find((x) => x.id === id));
  return (
    <>
      <Header title="My submitted guide" />
      {r ? (
        <>
          <div className="card info-card">
            <h2>{r.title}</h2>
            <Status status="pending" />
            <p>
              {r.origin} → {r.destination}
            </p>
            <div className="stats-grid">
              <b>{money(r.fare)}</b>
              <b>{r.totalMinutes} min</b>
              <b>{r.transfers} transfers</b>
              <b>{r.walkingMinutes} min walk</b>
            </div>
            <div className="mode-row">
              {r.modes.map((m) => (
                <Mode mode={m} />
              ))}
            </div>
            <h3>Tips</h3>
            {r.tips.map((t) => (
              <p>{t}</p>
            ))}
            <p>{r.description}</p>
          </div>
          <Link to="/profile" className="text-link">
            View profile activity →
          </Link>
        </>
      ) : (
        <Empty
          title="Guide not found"
          detail="Your submitted route may have been reset."
          action="Back to profile"
          onClick={() => location.assign("/profile")}
        />
      )}
    </>
  );
}
function Login({ returnTo }: { returnTo?: string }) {
  const store = useApp(),
    nav = useNavigate(),
    location = useLocation(),
    [showEmail, setShowEmail] = useState(false),
    [mode, setMode] = useState<"login" | "signup">("login"),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  const destination =
    (location.state as { from?: string } | null)?.from || returnTo || "/";
  const loginPhoto = getImage("illustrations/login");
  const finishSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      store.login();
      setLoading(false);
      nav(destination, { replace: true });
    }, 1000);
  };
  const submitEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    if (mode === "signup" && password !== confirm) {
      setError("Passwords don’t match. Please try again.");
      return;
    }
    finishSignIn();
  };
  return (
    <div className="login-layout">
      <div className={`login-illustration ${loginPhoto ? "has-photo" : ""}`}>
        {loginPhoto ? (
          <>
            <img
              className="login-photo"
              src={loginPhoto}
              alt="A jeepney on a city commute"
            />
            <div className="login-photo-shade" />
          </>
        ) : (
          <>
            <div className="sun" />
            <div className="city">▥　▦　▥　▧　▥</div>
            <div className="jeep">🚌</div>
            <div className="road" />
          </>
        )}
      </div>
      <div className="login-card">
        <div className="brand">
          <span className="brand-mark">idd</span>
          <b>isang daang daan</b>
        </div>
        <p className="eyebrow">WELCOME TO THE COMMUNITY</p>
        <h1>Join the commuter community</h1>
        <p className="muted">
          Ask questions, share routes, earn points, and unlock more features.
        </p>
        <div
          className="login-mode segmented"
          role="tablist"
          aria-label="Account type"
        >
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Log in
          </button>
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setShowEmail(true);
              setError("");
            }}
          >
            Sign up
          </button>
        </div>
        <Button onClick={finishSignIn} disabled={loading}>
          <GoogleMark />
          {loading ? "Signing you in…" : "Continue with Google"}
        </Button>
        {!showEmail && (
          <Button kind="outline" onClick={() => setShowEmail(true)}>
            Continue with email
          </Button>
        )}
        {showEmail && (
          <form className="login-fields" onSubmit={submitEmail}>
            {mode === "signup" && (
              <input
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            )}
            <input
              name="email"
              type="text"
              inputMode="email"
              placeholder="Email address"
              autoComplete="email"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              required
            />
            {mode === "signup" && (
              <input
                name="confirm"
                type="password"
                placeholder="Confirm password"
                autoComplete="new-password"
                required
              />
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <Button disabled={loading}>
              {loading
                ? "Signing you in…"
                : mode === "signup"
                  ? "Create account"
                  : "Log in with email"}
            </Button>
          </form>
        )}
        <button
          className="text-btn mode-link"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setShowEmail(true);
            setError("");
          }}
        >
          {mode === "login" ? "Create an account" : "I already have an account"}
        </button>
        <button
          className="text-btn guest-link"
          onClick={() => {
            useApp.setState({ hasEntered: true, isLoggedIn: false });
            nav(destination, { replace: true });
          }}
        >
          Continue as guest
        </button>
        <small className="prototype-note">
          Prototype: no real account is created.
        </small>
      </div>
    </div>
  );
}
function Profile() {
  const store = useApp(),
    [tab, setTab] = useState("Contributions"),
    nav = useNavigate();
  if (!store.isLoggedIn)
    return (
      <div className="guest-profile card">
        <div className="empty-art">👋</div>
        <h1>Your commute community awaits</h1>
        <p>Sign in to see your points and contributions.</p>
        <Button onClick={() => nav("/login", { state: { from: "/profile" } })}>
          Log in or sign up
        </Button>
      </div>
    );
  const submitted = store.routes.filter(
    (r) => r.authorId === "u-alex" && r.status === "pending",
  );
  return (
    <>
      <Header
        title="Profile"
        right={
          <button className="icon-btn" onClick={() => nav("/settings")}>
            <SettingsIcon />
          </button>
        }
      />
      <div className="profile-layout">
        <aside className="profile-sidebar card">
          <Avatar name="Alex Santos" />
          <h2>Alex Santos</h2>
          <Status status="unverified" />
          <p>Level 2 Contributor</p>
          <div className="points-card">
            <div>
              <Star className="star" fill="currentColor" />
              <b>{store.points} pts</b>
            </div>
            <div className="progress">
              <i
                style={{ width: `${Math.min((store.points % 500) / 5, 100)}%` }}
              />
            </div>
            <small>{500 - (store.points % 500)} to next level</small>
          </div>
          <Button
            kind="outline"
            onClick={() => {
              store.requireLogin(() =>
                store.addToast("Verification requirements submitted"),
              );
            }}
          >
            Request verification
          </Button>
        </aside>
        <section>
          <div className="segmented">
            <button
              className={tab === "Contributions" ? "active" : ""}
              onClick={() => setTab("Contributions")}
            >
              Contributions
            </button>
            <button
              className={tab === "Rewards" ? "active" : ""}
              onClick={() => setTab("Rewards")}
            >
              Rewards
            </button>
          </div>
          {tab === "Contributions" ? (
            <>
              <div className="stats-grid profile-stats">
                {[
                  ["Route guides posted", submitted.length + 1],
                  [
                    "Questions answered",
                    store.questions.filter((q) =>
                      q.answerIds.some(
                        (id) => store.answers[id]?.authorId === "u-alex",
                      ),
                    ).length,
                  ],
                  ["Upvotes received", 18],
                  ["Verified contributor", "No"],
                ].map(([a, b]) => (
                  <div className="stat card">
                    <span>{a}</span>
                    <b>{b}</b>
                  </div>
                ))}
              </div>
              <Section title="Recent activity">
                {submitted.length ? (
                  submitted.map((r) => (
                    <Link to={"/my-guide/" + r.id} className="activity card">
                      <Map />
                      <span>
                        <b>{r.title}</b>
                        <small>Route guide · submitted just now</small>
                      </span>
                      <Status status="pending" />
                    </Link>
                  ))
                ) : (
                  <p className="muted">
                    Your recent contributions will show here.
                  </p>
                )}
              </Section>
              <div className="profile-links">
                <Link to="/saved">
                  Saved routes <ChevronRight />
                </Link>
                <Link to="/notifications">
                  Notifications <ChevronRight />
                </Link>
              </div>
            </>
          ) : (
            <>
              <RewardsContents points={store.points} />
              <Link to="/rewards" className="text-link">
                See all rewards →
              </Link>
            </>
          )}
        </section>
      </div>
    </>
  );
}
const tiers = [
  ["Newcomer", 0],
  ["Contributor", 100],
  ["Level 2 Contributor", 250],
  ["Trusted Guide", 500],
  ["Community Champion", 1000],
  ["IDD Influencer", 2000],
] as const;
const perks = [
  ["Transit card load discount", "Contributor"],
  ["Partner coffee shop freebie", "Level 2 Contributor"],
  ["Mall voucher", "Trusted Guide"],
  ["Free ride credit", "Community Champion"],
  ["Creator spotlight", "IDD Influencer"],
];
function RewardsContents({ points }: { points: number }) {
  const [perk, setPerk] = useState("");
  const current =
    [...tiers].reverse().find(([, n]) => points >= n)?.[0] || "Newcomer";
  return (
    <>
      <div className="points-card wide">
        <div>
          <Trophy />
          <span>
            <b>{points} points</b>
            <small>{current}</small>
          </span>
        </div>
        <div className="progress">
          <i style={{ width: `${Math.min(points / 20, 100)}%` }} />
        </div>
        <small>
          {Math.max(
            0,
            (tiers.find(([, n]) => n > points)?.[1] || points) - points,
          )}{" "}
          points to next tier
        </small>
      </div>
      <div className="rewards-grid">
        <section className="card">
          <h2>Contributor tiers</h2>
          {tiers.map(([name, n]) => (
            <div className={cx("tier-row", current === name && "current")}>
              <span className="tier-icon">{current === name ? "★" : "✦"}</span>
              <b>{name}</b>
              <span>{n} pts</span>
              {current === name && <small>YOU ARE HERE</small>}
            </div>
          ))}
        </section>
        <section className="card">
          <h2>Partner perks</h2>
          {perks.map(([name, tier], i) => {
            const unlocked =
              tiers.findIndex((x) => x[0] === current) >=
              tiers.findIndex((x) => x[0] === tier);
            return (
              <button
                className="perk-row"
                onClick={() =>
                  unlocked
                    ? setPerk(name)
                    : useApp
                        .getState()
                        .addToast("Reach Trusted Guide to unlock")
                }
              >
                <span className="perk-emoji">
                  {["💳", "☕", "🎟️", "🚕", "✨"][i]}
                </span>
                <span>
                  <b>{name}</b>
                  <small>{tier} tier</small>
                </span>
                {unlocked ? (
                  <Check className="success-icon" />
                ) : (
                  <Lock className="muted" />
                )}
              </button>
            );
          })}
        </section>
      </div>
      <div className="card earn-card">
        <h2>Ways to earn</h2>
        <p>
          Share a route <b>+20</b>
        </p>
        <p>
          Route verified <b>+50</b>
        </p>
        <p>
          Answer a question <b>+10</b>
        </p>
        <p>
          Accepted answer <b>+25</b>
        </p>
        <p>
          Upvote received <b>+2</b>
        </p>
      </div>
      {perk && (
        <Modal title={perk} close={() => setPerk("")}>
          <p>Your partner reward code:</p>
          <div className="code">IDD-ALEX-2026</div>
          <Button
            onClick={() => {
              navigator.clipboard?.writeText("IDD-ALEX-2026");
              setPerk("");
              useApp.getState().addToast("Code copied");
            }}
          >
            Copy code
          </Button>
        </Modal>
      )}
    </>
  );
}
function Rewards() {
  const p = useApp((s) => s.points);
  return (
    <>
      <Header title="Rewards" />
      <RewardsContents points={p} />
    </>
  );
}
function Notifications() {
  const store = useApp(),
    nav = useNavigate();
  const notes = store.notifications;
  return (
    <>
      <Header
        title="Notifications"
        right={
          <button
            className="text-btn"
            onClick={() =>
              useApp.setState((s) => ({
                notifications: s.notifications.map((n) => ({
                  ...n,
                  read: true,
                })),
              }))
            }
          >
            Mark all as read
          </button>
        }
      />
      <div className="notification-list">
        {notes.map((n, i) => (
          <button
            className={cx("notification card", !n.read && "unread")}
            onClick={() => {
              useApp.setState((s) => ({
                notifications: s.notifications.map((x, j) =>
                  j === i ? { ...x, read: true } : x,
                ),
              }));
              nav(n.to);
            }}
          >
            <span className="notification-dot" />
            <span>
              {n.title}
              <small>
                {["Just now", "1 hour ago", "Yesterday", "2 days ago"][i]}
              </small>
            </span>
            <ChevronRight />
          </button>
        ))}
      </div>
    </>
  );
}
function Settings() {
  const store = useApp(),
    nav = useNavigate(),
    [notify, setNotify] = useState(true);
  return (
    <>
      <Header title="Settings" />
      <div className="settings-list card">
        <div className="settings-account">
          <Avatar name={store.isLoggedIn ? "Alex Santos" : "Guest"} />
          <span>
            <b>{store.isLoggedIn ? "Alex Santos" : "Guest"}</b>
            <small>
              {store.isLoggedIn ? "alex@email.com" : "Not signed in"}
            </small>
          </span>
          <button
            onClick={() =>
              nav(store.isLoggedIn ? "/profile" : "/login", {
                state: { from: "/settings" },
              })
            }
          >
            {store.isLoggedIn ? "Edit" : "Log in"} <ChevronRight />
          </button>
        </div>
        <label className="setting-row">
          Notifications{" "}
          <input
            type="checkbox"
            checked={notify}
            onChange={() => setNotify(!notify)}
          />
        </label>
        <button
          className="setting-row"
          onClick={() => store.addToast("Language: English")}
        >
          Language{" "}
          <span>
            English <ChevronRight />
          </span>
        </button>
        <div className="setting-row">
          About IDD <small>Prototype. All data is sample data.</small>
        </div>
        <button
          className="setting-row danger-text"
          onClick={() => store.reset()}
        >
          Reset demo data <Trash2 />
        </button>
        <button
          className="setting-row"
          onClick={() => {
            store.logout();
            nav("/");
          }}
        >
          Log out <LogIn />
        </button>
      </div>
    </>
  );
}
function NotFound() {
  const nav = useNavigate();
  return (
    <Empty
      title="We can’t find that page"
      detail="Looks like this route took a wrong turn."
      action="Back to Home"
      onClick={() => nav("/")}
    />
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      { index: true, element: <Home /> },
      { path: "guides", element: <Guides /> },
      { path: "search", element: <SearchPage /> },
      { path: "search/recent", element: <SearchPage /> },
      { path: "route/:id", element: <RouteDetail /> },
      { path: "route/:id/ask", element: <AskRoute /> },
      { path: "compare", element: <Compare /> },
      { path: "saved", element: <Saved /> },
      { path: "community", element: <Community /> },
      { path: "question/:id", element: <Thread /> },
      { path: "ask", element: <Ask /> },
      { path: "contribute", element: <Contribute /> },
      { path: "contribute/:step", element: <Wizard /> },
      { path: "my-guide/:id", element: <MyGuide /> },
      { path: "profile", element: <Profile /> },
      { path: "rewards", element: <Rewards /> },
      { path: "notifications", element: <Notifications /> },
      { path: "settings", element: <Settings /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
