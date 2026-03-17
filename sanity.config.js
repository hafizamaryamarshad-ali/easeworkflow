import { defineConfig } from 'sanity'
import project from './schemas/project'
import caseStudy from './schemas/caseStudy'
import blog from './schemas/blog'

export default defineConfig({
  name: 'default',
  title: 'EaseWorkflow',

  projectId: '1nesg9s4',
  dataset: 'production',

  schema: {
    types: [project, caseStudy, blog],
  },
})