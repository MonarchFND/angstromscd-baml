# BAML Service with Local Ollama

This implementation provides a BAML-powered service that connects to a local Ollama instance for medical analysis, literature search, and risk modeling capabilities.

## 🚀 Quick Start

### Prerequisites

1. **Install Ollama**
   ```bash
   # macOS
   brew install ollama
   
   # Or download from https://ollama.ai
   ```

2. **Start Ollama and pull a model**
   ```bash
   # Start Ollama server
   ollama serve
   
   # In another terminal, pull the model
   ollama pull llama3.2:latest
   ```

3. **Install dependencies**
   ```bash
   bun install
   ```

### Running the Service

1. **Generate BAML client** (if not already done)
   ```bash
   bun run generate-baml.js
   ```

2. **Start the service**
   ```bash
   bun run --bun src/index.ts
   ```

3. **Test the service**
   ```bash
   node examples/test-insights.js
   ```

## 📋 API Endpoints

### Health Check
```http
GET /health
```

Response:
```json
{
  "status": "healthy|unhealthy",
  "ollama_connected": true|false
}
```

### Generate Insight
```http
POST /generate-insight
```

## 🏥 Medical Analysis

Analyzes patient data and provides diagnostic insights.

**Request:**
```json
{
  "type": "medical-analysis",
  "data": {
    "patient_data": "Male, 45 years old, BMI 28, smoker",
    "symptoms": "Chest pain, shortness of breath, fatigue for 2 weeks",
    "medical_history": "Hypertension, family history of heart disease"
  }
}
```

**Response:**
```json
{
  "type": "medical-analysis",
  "result": "Detailed medical analysis with differential diagnoses...",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "processing_time_ms": 1500
}
```

## 📚 Literature Search

Generates research strategies and identifies relevant literature.

**Request:**
```json
{
  "type": "literature-search",
  "data": {
    "research_query": "Machine learning applications in cardiovascular disease prediction",
    "domain": "Cardiology and AI",
    "time_period": "2020-2024"
  }
}
```

**Response:**
```json
{
  "type": "literature-search",
  "result": "Comprehensive literature search strategy...",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "processing_time_ms": 1200
}
```

## ⚠️ Risk Modeling

Assesses patient risk factors and provides risk estimates.

**Request:**
```json
{
  "type": "risk-modeling",
  "data": {
    "risk_factors": "Age 65, diabetes, smoking, high cholesterol",
    "patient_profile": "Female, postmenopausal, overweight",
    "outcome_type": "Cardiovascular event within 5 years"
  }
}
```

**Response:**
```json
{
  "type": "risk-modeling",
  "result": "Detailed risk assessment with scores and recommendations...",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "processing_time_ms": 1800
}
```

## 🏗️ Architecture

### BAML Configuration

- **Client Configuration**: `baml_src/clients.baml`
  - LocalOllama client pointing to `localhost:11434`
  - Uses OpenAI-compatible API format

- **Templates**: `baml_src/templates/`
  - `medical-analysis.baml`: Medical diagnostic analysis
  - `literature-search.baml`: Research literature strategies
  - `risk-modeling.baml`: Risk assessment and modeling

### Service Structure

- **BAML Service**: `src/services/baml-service.ts`
  - Handles all three insight types
  - Provides error handling and validation
  - Includes health check functionality

- **API Server**: `src/index.ts`
  - Hono-based REST API
  - Input validation and error handling
  - Health monitoring endpoint

## 🔧 Configuration

### Ollama Model Configuration

The service is configured to use `llama3.2:latest` by default. To use a different model:

1. Update `baml_src/clients.baml`:
   ```baml
   client<llm> LocalOllama {
     provider openai
     options {
       base_url "http://localhost:11434/v1"
       model "your-preferred-model"
       api_key "ollama"
     }
   }
   ```

2. Regenerate the BAML client:
   ```bash
   bun run generate-baml.js
   ```

### Available Models

Popular models that work well with this service:
- `llama3.2:latest` (recommended)
- `llama3.1:8b`
- `mistral:latest`
- `codellama:latest`

## 🧪 Testing

Run the example test script:
```bash
node examples/test-insights.js
```

This will test all three insight types and provide sample outputs.

## 🚨 Important Notes

- **Medical Disclaimer**: This service is for educational and research purposes only. Always consult qualified healthcare professionals for actual medical decisions.

- **Local Processing**: All data is processed locally through Ollama, ensuring privacy and data security.

- **Performance**: Response times depend on your hardware and the selected Ollama model.

## 🛠️ Development

### Adding New Templates

1. Create a new template in `baml_src/templates/`
2. Add the function to your template
3. Regenerate the client: `bun run generate-baml.js`
4. Update the service to handle the new template

### Debugging

- Check Ollama logs: `ollama logs`
- Monitor service health: `curl http://localhost:3002/health`
- Enable verbose logging in the BAML service

## 📝 License

This implementation is part of the AngstromSCD BAML project. 