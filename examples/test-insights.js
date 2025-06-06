// Example usage of the BAML Service endpoints
// Make sure to start Ollama first: ollama serve
// And pull a model: ollama pull llama3.2:latest

const BASE_URL = 'http://localhost:3002';

async function testHealthCheck() {
  console.log('🔍 Testing health check...');
  try {
    const response = await fetch(`${BASE_URL}/health`);
    const result = await response.json();
    console.log('Health check result:', result);
    return result.ollama_connected;
  } catch (error) {
    console.error('Health check failed:', error.message);
    return false;
  }
}

async function testMedicalAnalysis() {
  console.log('\n🏥 Testing medical analysis...');
  
  const request = {
    type: 'medical-analysis',
    data: {
      patient_data: 'Male, 45 years old, BMI 28, smoker',
      symptoms: 'Chest pain, shortness of breath, fatigue for 2 weeks',
      medical_history: 'Hypertension, family history of heart disease'
    }
  };

  try {
    const response = await fetch(`${BASE_URL}/generate-insight`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Medical analysis completed');
      console.log(`Processing time: ${result.processing_time_ms}ms`);
      console.log('Analysis result:', result.result.substring(0, 200) + '...');
    } else {
      console.log('❌ Medical analysis failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

async function testLiteratureSearch() {
  console.log('\n📚 Testing literature search...');
  
  const request = {
    type: 'literature-search',
    data: {
      research_query: 'Machine learning applications in cardiovascular disease prediction',
      domain: 'Cardiology and AI',
      time_period: '2020-2024'
    }
  };

  try {
    const response = await fetch(`${BASE_URL}/generate-insight`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Literature search completed');
      console.log(`Processing time: ${result.processing_time_ms}ms`);
      console.log('Search strategy:', result.result.substring(0, 200) + '...');
    } else {
      console.log('❌ Literature search failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

async function testRiskModeling() {
  console.log('\n⚠️ Testing risk modeling...');
  
  const request = {
    type: 'risk-modeling',
    data: {
      risk_factors: 'Age 65, diabetes, smoking, high cholesterol, sedentary lifestyle',
      patient_profile: 'Female, postmenopausal, overweight, family history of stroke',
      outcome_type: 'Cardiovascular event within 5 years'
    }
  };

  try {
    const response = await fetch(`${BASE_URL}/generate-insight`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Risk modeling completed');
      console.log(`Processing time: ${result.processing_time_ms}ms`);
      console.log('Risk assessment:', result.result.substring(0, 200) + '...');
    } else {
      console.log('❌ Risk modeling failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting BAML Service Tests\n');
  
  // Check if service is healthy
  const isHealthy = await testHealthCheck();
  
  if (!isHealthy) {
    console.log('\n⚠️  Ollama is not connected. Make sure to:');
    console.log('1. Install Ollama: https://ollama.ai');
    console.log('2. Start Ollama: ollama serve');
    console.log('3. Pull a model: ollama pull llama3.2:latest');
    console.log('\nContinuing with tests (they will fail without Ollama)...');
  }

  // Run all tests
  await testMedicalAnalysis();
  await testLiteratureSearch();
  await testRiskModeling();
  
  console.log('\n✨ Tests completed!');
}

// Run the tests
runTests().catch(console.error); 