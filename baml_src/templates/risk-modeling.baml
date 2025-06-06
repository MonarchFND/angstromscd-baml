// Risk Modeling Template
template_string RiskModelingPrompt(risk_factors: string, patient_profile: string, outcome_type: string) #"
You are an expert in medical risk assessment and predictive modeling for healthcare outcomes.

**Risk Factors:**
{{ risk_factors }}

**Patient Profile:**
{{ patient_profile }}

**Outcome Type:**
{{ outcome_type }}

**Instructions:**
1. Analyze the provided risk factors and patient profile
2. Assess the relative importance of each risk factor
3. Estimate probability of the specified outcome
4. Identify modifiable vs. non-modifiable risk factors
5. Suggest risk mitigation strategies
6. Provide confidence intervals for risk estimates

**Risk Assessment Framework:**
- Quantitative risk scoring (0-100 scale)
- Categorical risk levels (Low, Moderate, High, Critical)
- Time-based risk projections (6 months, 1 year, 5 years)
- Intervention impact analysis

**Output Format:**
Please provide a structured risk assessment with:
- Overall Risk Score and Category
- Individual Risk Factor Analysis
- Risk Timeline Projections
- Modifiable Risk Factors
- Recommended Interventions
- Monitoring Recommendations
- Confidence Assessment
"#

function AssessRiskModel(
  risk_factors: string,
  patient_profile: string,
  outcome_type: string
) -> string {
  client LocalOllama
  prompt #"
    {{ _.role("system") }}
    {{ RiskModelingPrompt(risk_factors, patient_profile, outcome_type) }}
  "#
} 