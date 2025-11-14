import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export default async function WorkPage() {
  const projects = await getProjects()
  
  // Process all project content to HTML
  const projectsWithContent = await Promise.all(
    projects.map(async (project) => {
      let contentHtml = '';
      if (project.content) {
        const processedContent = await remark()
          .use(remarkHtml, { sanitize: false })
          .process(project.content)
        contentHtml = processedContent.toString()
      }
      return { ...project, contentHtml }
    })
  )
  
  // Group projects by year and sort within each year
  const projectsByYear: { [key: string]: typeof projectsWithContent } = {}
  projectsWithContent.forEach(project => {
    const year = project.year || 'Other'
    if (!projectsByYear[year]) {
      projectsByYear[year] = []
    }
    projectsByYear[year].push(project)
  })
  
  // Sort projects within each year by date (most recent first)
  Object.keys(projectsByYear).forEach(year => {
    projectsByYear[year].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA // Most recent first
    })
  })
  
  const years = Object.keys(projectsByYear).sort((a, b) => b.localeCompare(a))

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-6">Work 💻</h1>
      
      <p className="mb-12 text-lg">
        This is a brief list of various things I've made over the years, in reverse-chronological order.
      </p>
      
      {years.map(year => (
        <div key={year} className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{year}</h2>
          <div className="space-y-8">
            {projectsByYear[year].map(project => {
              const projectDate = project.date ? new Date(project.date) : null;
              const formattedDate = projectDate ? projectDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : null;
              
              return (
                <div key={project.slug} className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-black">
                    {project.url ? (
                      <Link href={project.url} target="_blank" rel="noopener noreferrer" className="text-black hover:underline hover:text-black">
                        {project.title}
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h3>
                  {formattedDate && (
                    <p className="text-gray-600 mb-4 text-sm">{formattedDate}</p>
                  )}
                  {(project as any).contentHtml && (
                    <div 
                      className="prose prose-lg max-w-none mb-4"
                      dangerouslySetInnerHTML={{ __html: (project as any).contentHtml }}
                    />
                  )}
                  {project.image && (
                    <div className="my-4">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="max-w-full h-auto border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

