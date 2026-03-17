import { defineConfig } from 'sanity'
import project from './schemas/project'

export default defineConfig({
  name: 'default',
  title: 'EaseWorkflow',

  projectId: '1nesg9s4',
  dataset: 'production',

  schema: {
    types: [project],   // 👈 DIRECT IMPORT
  },
})