import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { BAMLService, type InsightRequest } from './services/baml-service'

const app = new Hono()
const bamlService = new BAMLService()

app.get('/', (c) => {
  return c.json({ message: 'AngstromSCD BAML Service' })
})

// Health check endpoint
app.get('/health', async (c) => {
  try {
    const health = await bamlService.healthCheck()
    return c.json(health)
  } catch (error) {
    return c.json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, 500)
  }
})

// Legacy endpoint (keeping for backward compatibility)
app.post('/prompt', async (c) => {
  const body = await c.req.json()
  // BAML prompt processing logic here
  return c.json({ result: 'processed' })
})

// New insight generation endpoint
app.post('/generate-insight', async (c) => {
  try {
    const request: InsightRequest = await c.req.json()
    
    // Validate request structure
    if (!request.type || !request.data) {
      return c.json({ 
        error: 'Invalid request format. Expected: { type: string, data: object }' 
      }, 400)
    }

    // Validate insight type
    const validTypes = ['medical-analysis', 'literature-search', 'risk-modeling']
    if (!validTypes.includes(request.type)) {
      return c.json({ 
        error: `Invalid insight type. Must be one of: ${validTypes.join(', ')}` 
      }, 400)
    }

    const result = await bamlService.generateInsight(request)
    return c.json(result)
  } catch (error) {
    console.error('Error generating insight:', error)
    return c.json({ 
      error: 'Failed to generate insight',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

const port = 3002
console.log(`BAML service running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
