// Medical Analysis Template
template_string MedicalAnalysisPrompt(patient_data: string, symptoms: string, medical_history: string) #"
You are an expert medical AI assistant specializing in clinical analysis and diagnosis support.

**Patient Data:**
{{ patient_data }}

**Current Symptoms:**
{{ symptoms }}

**Medical History:**
{{ medical_history }}

**Instructions:**
1. Analyze the provided patient information comprehensively
2. Identify potential diagnoses based on symptoms and medical history
3. Suggest relevant diagnostic tests or procedures
4. Provide risk assessment and recommendations
5. Include differential diagnoses with probability estimates

**Important:** This analysis is for educational and research purposes only. Always consult with qualified healthcare professionals for actual medical decisions.

Please provide a structured medical analysis with the following sections:
- Primary Assessment
- Differential Diagnoses (with probability estimates)
- Recommended Diagnostic Tests
- Risk Factors
- Treatment Considerations
- Follow-up Recommendations
"#

function AnalyzeMedicalCase(
  patient_data: string,
  symptoms: string,
  medical_history: string
) -> string {
  client LocalOllama
  prompt #"
    {{ _.role("system") }}
    {{ MedicalAnalysisPrompt(patient_data, symptoms, medical_history) }}
  "#
} 