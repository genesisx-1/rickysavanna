import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export interface Project {
  slug: string
  title: string
  description: string
  year?: string
  date?: string
  url?: string
  github?: string
  image?: string
  technologies?: string[]
  content?: string
}

export function getProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjectsData = fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const slug = name.replace(/\.md$/, '')
      const fullPath = path.join(projectsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        year: data.year || data.date?.substring(0, 4) || 'Other',
        date: data.date,
        url: data.url,
        github: data.github,
        image: data.image,
        technologies: data.technologies || [],
        content,
      }
    })
  
  return allProjectsData.sort((a, b) => {
    // Sort by date (most recent first), fallback to year if no date
    const dateA = a.date ? new Date(a.date).getTime() : (a.year ? new Date(`${a.year}-01-01`).getTime() : 0)
    const dateB = b.date ? new Date(b.date).getTime() : (b.year ? new Date(`${b.year}-01-01`).getTime() : 0)
    return dateB - dateA // Most recent first
  })
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        year: data.year || data.date?.substring(0, 4) || 'Other',
        date: data.date,
        url: data.url,
        github: data.github,
        image: data.image,
        technologies: data.technologies || [],
        content,
      }
  } catch (error) {
    return null
  }
}

