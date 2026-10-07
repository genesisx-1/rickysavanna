const paths: Record<string, React.ReactNode> = {
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /><circle cx="12" cy="12" r="2.6" /></>,
  ai: <><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="9.5" cy="10" r="1.2" /><circle cx="14.5" cy="10" r="1.2" /><path d="M9 15h6" /></>,
  code: <><path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" /></>,
  flow: <><circle cx="5" cy="6" r="2.4" /><circle cx="19" cy="12" r="2.4" /><circle cx="5" cy="18" r="2.4" /><path d="M7.4 6h4.6a2 2 0 0 1 2 2v2m2.6 2h-4.6a2 2 0 0 0-2 2v2H7.4" /></>,
  crm: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 6h5M16 10h5M16 14h5" /></>,
  mobile: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10.5 18h3" /></>,
  ops: <><circle cx="12" cy="12" r="3.2" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
  admin: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4M16 2v4M3 10h18M8 15h3M8 18h6" /></>,
  support: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2" y="13" width="4" height="6" rx="1.6" /><rect x="18" y="13" width="4" height="6" rx="1.6" /><path d="M20 19v1a3 3 0 0 1-3 3h-3" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M7 15l3.5-4 3 2.5L20 7" /></>,
  tools: <><path d="M14.5 5.5a4 4 0 0 0 5.2 5.2l-7.6 7.6a2.5 2.5 0 1 1-3.5-3.5l7.6-7.6a4 4 0 0 0-1.7-1.7Z" /><path d="M5 5l3 3" /></>,
}

export default function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const path = paths[name] ?? paths.spark
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}
