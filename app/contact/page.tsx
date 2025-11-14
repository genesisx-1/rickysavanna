export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-6">Contact 📧</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className="mb-2">
            <a href="mailto:rsvna@proton.me" className="hover:underline">
              rsvna@proton.me
            </a>
          </p>
          <p>
            <a href="tel:2144224939" className="hover:underline">
              (214) 422-4939
            </a>
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Social Media</h2>
          <ul className="list-none pl-0 space-y-2">
            <li>
              <a href="https://github.com/genesisx-1" target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub →
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/rsavanna/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn →
              </a>
            </li>
            <li>
              <a href="https://x.com/rickysvna" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Twitter →
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

