import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import project from './schemas/project'
import caseStudy from './schemas/caseStudy'
import blog from './schemas/blog'
import CaseStudySyncTool from './src/sanity/CaseStudySyncTool'

export default defineConfig({
  name: 'default',
  title: 'EaseWorkflow',
  basePath: '/studio',

  projectId: '1nesg9s4',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  tools: process.env.NODE_ENV === 'development'
    ? [
        {
          name: 'case-study-sync',
          title: 'Case Study Sync',
          component: CaseStudySyncTool,
        },
      ]
    : [],

  schema: {
    types: [project, caseStudy, blog],
  },
})
