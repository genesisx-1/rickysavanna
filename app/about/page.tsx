import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-6">About 👤</h1>
      
      <div className="mb-8">
        <div className="mb-6">
          <Image
            src="/images/profile.jpg"
            alt="Ricky Savanna"
            width={192}
            height={192}
            className="rounded-full mb-6"
            priority
          />
        </div>
        
        <div className="space-y-4 mb-8">
          <p>
            I've built my career around connecting systems, people, and technology. My background spans operations, analytics, and AI-driven automation — from managing campaigns and data workflows to building and scaling custom software platforms.
          </p>
          
          <p>
            I got into development by necessity, automating business bottlenecks and optimizing backend systems. That evolved into Astrid Genesis, my AI software company that helps small and medium businesses integrate intelligent tools into their daily operations. I specialize in full-stack systems and practical automation — designing solutions that scale.
          </p>
          
          <p>
            I'm driven by building infrastructure that lasts: software that automates, systems that grow, and teams that compound value. My focus is on AI productization, backend operations, and automation pipelines — creating efficiency, leverage, and measurable business impact.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Current Role</h2>
          <p className="mb-2">
            <strong>Technical Operations Manager & Lead Developer</strong> at <strong>NTX Limo</strong>
          </p>
          <p className="text-gray-600">Location: Dallas, TX</p>
          <p className="mt-2">January 2025 - Present</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <ul className="list-disc pl-6">
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Python</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Django</li>
            <li>SQL</li>
            <li>PostgreSQL</li>
            <li>Supabase</li>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <p className="mb-2">
            <strong>Associate of Applied Science in Cybersecurity</strong>
          </p>
          <p className="text-gray-600">Tarrant County College at Fort Worth, TX</p>
          <p className="text-gray-600">August 2022 - May 2024</p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Resume</h2>
          <p>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Download my resume →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

