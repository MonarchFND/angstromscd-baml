import { b } from '../../baml_client'

export interface MedicalAnalysisRequest {
  patient_data: string
  symptoms: string
  medical_history: string
}

export interface LiteratureSearchRequest {
  research_query: string
  domain: string
  time_period: string
}

export interface RiskModelingRequest {
  risk_factors: string
  patient_profile: string
  outcome_type: string
}

export interface InsightRequest {
  type: 'medical-analysis' | 'literature-search' | 'risk-modeling'
  data: MedicalAnalysisRequest | LiteratureSearchRequest | RiskModelingRequest
}

export interface InsightResponse {
  type: string
  result: string
  timestamp: string
  processing_time_ms: number
}

export class BAMLService {
  async generateInsight(request: InsightRequest): Promise<InsightResponse> {
    const startTime = Date.now()
    
    try {
      let result: string
      
      switch (request.type) {
        case 'medical-analysis':
          result = await this.analyzeMedicalCase(request.data as MedicalAnalysisRequest)
          break
        case 'literature-search':
          result = await this.generateLiteratureSearch(request.data as LiteratureSearchRequest)
          break
        case 'risk-modeling':
          result = await this.assessRiskModel(request.data as RiskModelingRequest)
          break
        default:
          throw new Error(`Unsupported insight type: ${request.type}`)
      }
      
      const processingTime = Date.now() - startTime
      
      return {
        type: request.type,
        result,
        timestamp: new Date().toISOString(),
        processing_time_ms: processingTime
      }
    } catch (error) {
      throw new Error(`Failed to generate insight: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async analyzeMedicalCase(data: MedicalAnalysisRequest): Promise<string> {
    try {
      const result = await b.AnalyzeMedicalCase(
        data.patient_data,
        data.symptoms,
        data.medical_history
      )
      return result
    } catch (error) {
      throw new Error(`Medical analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async generateLiteratureSearch(data: LiteratureSearchRequest): Promise<string> {
    try {
      const result = await b.GenerateLiteratureSearch(
        data.research_query,
        data.domain,
        data.time_period
      )
      return result
    } catch (error) {
      throw new Error(`Literature search failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async assessRiskModel(data: RiskModelingRequest): Promise<string> {
    try {
      const result = await b.AssessRiskModel(
        data.risk_factors,
        data.patient_profile,
        data.outcome_type
      )
      return result
    } catch (error) {
      throw new Error(`Risk modeling failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async healthCheck(): Promise<{ status: string; ollama_connected: boolean }> {
    try {
      // Simple test to check if Ollama is responding
      const testResult = await b.AnalyzeMedicalCase(
        "Test patient",
        "No symptoms - health check",
        "No history - health check"
      )
      
      return {
        status: 'healthy',
        ollama_connected: true
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        ollama_connected: false
      }
    }
  }
}
